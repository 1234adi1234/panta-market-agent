/**
 * Mathematical Expected Value (EV) & Kelly Criterion Sizing Engine
 * Optimizes trade sizing on binary prediction markets (Panta API)
 */

export class KellyOracle {
  /**
   * Calculate Expected Value: EV = (P_model * net_payout) - ((1 - P_model) * stake)
   */
  static calculateEV({ modelProbability, marketPriceYes }) {
    if (marketPriceYes <= 0 || marketPriceYes >= 1) {
      throw new Error('Market price must be between 0 and 1');
    }

    const netPayout = 1.0 - marketPriceYes;
    const stake = marketPriceYes;
    const ev = (modelProbability * netPayout) - ((1 - modelProbability) * stake);

    return parseFloat(ev.toFixed(4));
  }

  /**
   * Kelly Criterion Fraction: f* = (b*p - q) / b
   * b = net odds = (1 - price) / price
   * p = model probability
   * q = 1 - p
   */
  static calculateKellyFraction({ modelProbability, marketPriceYes, fractionalMultiplier = 0.5 }) {
    const b = (1.0 - marketPriceYes) / marketPriceYes;
    const p = modelProbability;
    const q = 1.0 - p;

    const fullKelly = (b * p - q) / b;

    // Apply half-Kelly or quarter-Kelly for bankroll preservation
    const safeKelly = Math.max(0, fullKelly * fractionalMultiplier);

    return {
      edge: parseFloat((p - marketPriceYes).toFixed(4)),
      fullKelly: parseFloat(Math.max(0, fullKelly).toFixed(4)),
      recommendedFraction: parseFloat(safeKelly.toFixed(4)),
      shouldTrade: fullKelly > 0.02 // Minimum 2% edge requirement
    };
  }
}
