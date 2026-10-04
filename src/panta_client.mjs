/**
 * Panta Market Discovery & Orderbook Interface
 */

export class PantaClient {
  constructor(apiKey = 'demo-panta-key') {
    this.apiKey = apiKey;
  }

  formatMarketData(raw) {
    const yesPrice = Number(raw.yesPrice || 0.50);
    const noPrice = 1.0 - yesPrice;

    return {
      marketId: raw.id || 'market_solana_tps',
      question: raw.question || 'Will Solana daily active addresses exceed 5M in October 2026?',
      yesPrice: parseFloat(yesPrice.toFixed(4)),
      noPrice: parseFloat(noPrice.toFixed(4)),
      liquidityUsd: Number(raw.liquidityUsd || 150000),
      volume24h: Number(raw.volume24h || 42000),
      category: raw.category || 'Crypto Ecosystem'
    };
  }
}
