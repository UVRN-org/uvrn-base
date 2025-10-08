# UVRN Base

**Universal Verification Receipts for Nything (UVRN)**  
_The SSL of AI and analytics._

**UVRN Base** is the seed repository of the **uvrn-org** organization.  
It defines the **UVRN protocol**: schemas, receipts, and validation logic.  
This is the **genesis block** of the ecosystem. Everything else — explorers, badges, fix-it recipes — grows from here.

---

## 🌐 What is UVRN?

UVRN is an open protocol for producing **verifiable receipts**.  
It reconciles analytics data, generates proof, and establishes trust.

- **Checks** → structured test results (tags, events, parity, UTMs, a11y/perf)
- **Confidence Score** → weighted score from completeness, parity, freshness
- **Receipts** → signed, replayable records of verification runs
- **Artifacts** → fix-it recipes (GTM JSON, CSV maps, code snippets)

Every UVRN receipt follows the **DRVC3 v1.0** standard:

- **Confidence Score:** weighted completeness + parity + freshness.
- **Checks:** detailed test outcomes.
- **Signature:** ed25519 with replay ID.

---

## ⚙️ Quickstart

```bash
git clone https://github.com/UVRN-org/uvrn-base.git
cd uvrn-base
npm install -g ajv-cli
ajv validate -s schemas/UVRN_receipt.schema.json -d "examples/receipts/*.json"
```

## 🔑 Principles

- **Protocol-first** → schemas + receipts are canonical
- **Replayable** → every receipt can be revalidated anywhere
- **Proof over trust** → verification = receipts, not screenshots
- **Extendable** → artifacts, fix-it recipes, and explorers grow from the base

---

## 🤝 Contributing

We welcome early contributors!

## 📜 License

MIT — see [LICENSE](LICENSE) for details.
