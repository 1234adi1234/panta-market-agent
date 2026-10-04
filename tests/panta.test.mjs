import test from 'node:test';
import assert from 'node:assert/strict';
import { KellyOracle } from '../src/kelly_oracle.mjs';
import { PantaClient } from '../src/panta_client.mjs';

test('KellyOracle computes correct EV and positive edge fraction', () => {
  // Model thinks 60%, market sells at 40% (0.40)
  const ev = KellyOracle.calculateEV({
    modelProbability: 0.60,
    marketPriceYes: 0.40
  });

  // Net payout = 0.60, stake = 0.40
  // EV = 0.60 * 0.60 - 0.40 * 0.40 = 0.36 - 0.16 = 0.20
  assert.equal(ev, 0.20);

  const sizing = KellyOracle.calculateKellyFraction({
    modelProbability: 0.60,
    marketPriceYes: 0.40,
    fractionalMultiplier: 0.5
  });

  assert.equal(sizing.edge, 0.20);
  assert.ok(sizing.fullKelly > 0.30);
  assert.equal(sizing.shouldTrade, true);
});

test('KellyOracle rejects negative edge and does not trade', () => {
  const sizing = KellyOracle.calculateKellyFraction({
    modelProbability: 0.30,
    marketPriceYes: 0.50
  });

  assert.equal(sizing.shouldTrade, false);
  assert.equal(sizing.recommendedFraction, 0);
});

test('PantaClient standardizes market response object', () => {
  const client = new PantaClient();
  const res = client.formatMarketData({
    id: 'm1',
    question: 'Solana test question',
    yesPrice: 0.35
  });

  assert.equal(res.marketId, 'm1');
  assert.equal(res.yesPrice, 0.35);
  assert.equal(res.noPrice, 0.65);
});
