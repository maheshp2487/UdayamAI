import { ChannelPartner, PartnerMatchResult, PartnerSuitabilityScore } from '../types/schema';

export class PartnerSuitabilityEngine {
  
  // Haversine formula to calculate distance between two coordinates in km
  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  static rankPartners(partners: ChannelPartner[], userLat: number, userLon: number, schemeId?: string): PartnerMatchResult[] {
    const results: PartnerMatchResult[] = [];

    for (const partner of partners) {
      // 1. Scheme Support (30%) - Fake implementation for demo, assuming all support if no mapping table available
      const schemeSupportScore = 100; // In real app, check PartnerSchemeMapping

      // 2. Fund Availability (25%)
      const fundAvailabilityScore = partner.fund_availability_pct;

      // 3. Distance (20%) - Closer is better. Score drops to 0 at 100km+
      const distance = this.calculateDistance(userLat, userLon, partner.latitude, partner.longitude);
      let distanceScore = 100 - distance;
      if (distanceScore < 0) distanceScore = 0;

      // 4. Operational Status (15%)
      let operationalStatusScore = 0;
      switch (partner.status) {
        case 'Available': operationalStatusScore = 100; break;
        case 'Limited Capacity': operationalStatusScore = 50; break;
        case 'Temporarily Unavailable': operationalStatusScore = 0; break;
        case 'High Overdue Flag': operationalStatusScore = 10; break;
        case 'Under Review': operationalStatusScore = 0; break;
      }

      // 5. Processing Capacity (10%)
      const processingCapacityScore = partner.processing_capacity_pct;

      const totalScore = 
        (schemeSupportScore * 0.30) + 
        (fundAvailabilityScore * 0.25) + 
        (distanceScore * 0.20) + 
        (operationalStatusScore * 0.15) + 
        (processingCapacityScore * 0.10);

      let recommendationReason = '';
      if (totalScore > 80) {
        recommendationReason = 'Highly recommended due to proximity, excellent fund availability, and operational status.';
      } else if (totalScore > 50) {
        recommendationReason = 'Suitable partner, but may have limited capacity or be further away.';
      } else {
        recommendationReason = 'Not currently recommended due to lack of funds or operational issues.';
      }

      results.push({
        partner,
        distance_km: Math.round(distance * 10) / 10,
        total_score: Math.round(totalScore),
        score_breakdown: {
          scheme_support: schemeSupportScore,
          fund_availability: fundAvailabilityScore,
          distance: Math.round(distanceScore),
          operational_status: operationalStatusScore,
          processing_capacity: processingCapacityScore
        },
        recommendation_reason: recommendationReason
      });
    }

    return results.sort((a, b) => b.total_score - a.total_score);
  }
}
