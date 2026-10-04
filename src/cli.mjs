#!/usr/bin/env node
import { KellyOracle } from './kelly_oracle.mjs';
import { PantaClient } from './panta_client.mjs';

console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║  Panta Prediction Market EV & Kelly Sizing Autonomous Agent          ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝');

const client = new PantaClient();
const rawMarket = {
  id: 'sol_cctp_volume_oct26',
  question: 'Will Solana monthly CCTP USDC transfer volume cross $10B?',
  yesPrice: 0.42, // Market implies 42% probability
  liquidityUsd: 285000,
  volume24h: 64000
};

const market = client.formatMarketData(rawMarket);
const modelProb = 0.58; // On-chain model estimates 58% true probability

console.log(`\n🎯 Market: "${market.question}"`);
console.log(`   - Market YES Price: $${market.yesPrice} (Implied Odds: ${(market.yesPrice * 100).toFixed(1)}%)`);
console.log(`   - AI Model True Probability: ${(modelProb * 100).toFixed(1)}%`);
console.log(`   - 24h Volume / Depth: $${market.volume24h.toLocaleString()} / $${market.liquidityUsd.toLocaleString()}`);

const ev = KellyOracle.calculateEV({
  modelProbability: modelProb,
  marketPriceYes: market.yesPrice
});

const kelly = KellyOracle.calculateKellyFraction({
  modelProbability: modelProb,
  marketPriceYes: market.yesPrice,
  fractionalMultiplier: 0.5 // Half-Kelly
});

console.log('\n📊 Trade Decision Matrix:');
console.log(`   - Edge over Market: +${(kelly.edge * 100).toFixed(1)}%`);
console.log(`   - Expected Value per $1: +$${ev}`);
console.log(`   - Full Kelly Allocation: ${(kelly.fullKelly * 100).toFixed(1)}% of bankroll`);
console.log(`   - Recommended Safe (Half-Kelly): ${(kelly.recommendedFraction * 100).toFixed(1)}% of bankroll`);
console.log(`   - Signal Execution Status: ${kelly.shouldTrade ? '🟢 EXECUTE BUY YES ORDER' : '⚪ PASS'}`);
