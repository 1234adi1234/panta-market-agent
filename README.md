# Panta Prediction Market Expected Value (EV) & Kelly Sizing Agent

**Crypto World's Fair — Panta API Sidetrack**  
**Track Prize Pool:** 5,000 USDG  
**Author:** Aditya (@1234adi1234)  
**Target Payout Wallet (Solana):** `4N9HQfVSu7zjWLBD7WbaFroj79sDh4Sx76hRon7Vh86n`  

---

## 🚀 Overview
Prediction markets provide real-time crowd-sourced probabilistic intelligence. However, traders and automated liquidity providers require mathematical frameworks to exploit market inefficiencies, evaluate true odds, and optimize capital allocation.

This project introduces an autonomous **AI Prediction Market Agent** integrated with the **Panta API** that:
1. **Discovers Panta Prediction Markets:** Ingests orderbook prices, liquidity depth, and implied probabilities for binary outcome contracts.
2. **Calculates True Probability & Expected Value (EV):** Compares live market odds against statistical Bayesian priors to calculate mathematical edge ($EV$).
3. **Kelly Criterion Risk Sizing:** Emits fractional Half-Kelly position sizing ($f^*$) protecting trader bankrolls against tail-risk drawdowns.

---

## 🧪 Mathematical Sizing Formulations

### 1. Expected Value (EV)
$$EV = (p \cdot (1 - \text{price})) - ((1 - p) \cdot \text{price})$$

### 2. Full Kelly Criterion
$$f^* = \frac{b \cdot p - q}{b}$$
where $b = \frac{1 - \text{price}}{\text{price}}$, $p$ is the model estimate, and $q = 1 - p$.

---

## 🛠️ Verification & Test Suite
Run test suite:
```bash
node --test tests/panta.test.mjs
```
Output:
```
✔ KellyOracle computes correct EV and positive edge fraction
✔ KellyOracle rejects negative edge and does not trade
✔ PantaClient standardizes market response object
ℹ pass 3, fail 0
```

---

## 💻 CLI Usage
Run the live prediction market sizing agent:
```bash
node src/cli.mjs
```

---

## 📜 License
MIT License. Open source for Panta & the Solana ecosystem.
