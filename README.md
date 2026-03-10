# UVRN Base

**Universal Verification Receipt Network (UVRN)**  
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
ajv validate -s schemas/drvc3.schema.json -d "receipts/uvrn-receipt-ex1.json"
# or validate all: ajv validate -s schemas/drvc3.schema.json -d "receipts/*.json"
```

## Schema and examples

- **Schema:** [schemas/drvc3.schema.json](schemas/drvc3.schema.json) — base DRVC3 receipt structure.
- **Examples:** [receipts/uvrn-receipt-ex1.json](receipts/uvrn-receipt-ex1.json) (full, with optional extension fields); [receipts/uvrn-receipt-minimal.json](receipts/uvrn-receipt-minimal.json) (minimal). Validate with: `ajv validate -s schemas/drvc3.schema.json -d "receipts/*.json"`.
- For production and Delta Engine receipts, see [@uvrn/adapter](https://www.npmjs.com/package/@uvrn/adapter) and [uvrn-packages](https://github.com/UVRN-org/uvrn-packages) (extended DRVC3 envelope with Delta receipt).

## 🔑 Principles

- **Protocol-first** → schemas + receipts are canonical
- **Replayable** → every receipt can be revalidated anywhere
- **Proof over trust** → verification = receipts, not screenshots
- **Extendable** → artifacts, fix-it recipes, and explorers grow from the base

## Ecosystem

- **[uvrn-packages](https://github.com/UVRN-org/uvrn-packages)** — Implementation monorepo: Delta Engine, CLI, API, MCP, DRVC3 adapter. Published as `@uvrn/*` on npm. [@uvrn/core](https://www.npmjs.com/package/@uvrn/core) · [@uvrn/sdk](https://www.npmjs.com/package/@uvrn/sdk) · [@uvrn/adapter](https://www.npmjs.com/package/@uvrn/adapter) · [@uvrn/mcp](https://www.npmjs.com/package/@uvrn/mcp) · [@uvrn/api](https://www.npmjs.com/package/@uvrn/api) · [@uvrn/cli](https://www.npmjs.com/package/@uvrn/cli)
- **[uvrn](https://github.com/UVRN-org/uvrn)** — Project landing page and repo directory.

**Open source:** Source: [uvrn-base](https://github.com/UVRN-org/uvrn-base). Implementation: [uvrn-packages](https://github.com/UVRN-org/uvrn-packages), [uvrn](https://github.com/UVRN-org/uvrn).

---


# 🪞 UVRN Protocol 

**Portable proof for the open web.**
UVRN is the lightweight verification protocol — receipts that flow freely until you decide to block (canonize) them.

# ✨ Core Idea

“Proof that flows. Block it when it matters.”

UVRN replaces heavy ledgers with tiny receipts: signed JSON records that prove who did what, when, and with what result.
Each receipt can stay loose (mutable, portable) or become blocked (canonical, permanent).

# 🔖 Tag Examples

Tags act like open-graph hashtags for proof context.
They help index receipts across apps, agents, and people.

Tag Meaning Typical Use
#drvc3 DRVC3 certificate / protocol Compliance, generic proof, schema version
#canonized Finalized / blocked receipt Locked record, NFT seal, or audit log
#uvrn Universal Verification Receipt Network Cross-registry sync
#proof Generic evidence emission Generic verification events
#vscore Confidence-score event Quality metrics / analytics
#ai-action AI-initiated proof Model run, agent act, automation
#human-sign Human-signed receipt Wallet, e-mail, or identity signature
#group-seal Collective canonization 1155/721 supporter seals
#loglog Human-readable twin entry Sync to Hermes DevChronicle
#replayable Contains replay instructions Used by AI automations
#looseproof Temporary verification Draft, pre-publication proof

Each tag can appear in the receipt metadata:

"tags": ["#uvrn", "#drvc3", "#canonized"]

# 🧾 UVRN Protocol Outline

# 1. Receipt Structure — DRVC3 Schema

{
  "receipt_id": "abc123",
  "issuer": "app.example.com",
  "event": "content.publish",
  "timestamp": "2025-10-06T21:00Z",
  "integrity": {
    "hash_algorithm": "sha256",
    "hash": "sha256:…",
    "signature_method": "eip191",
    "signature": "0x…",
    "signer_address": "0xA9F1…"
  },
  "validation": { "v_score": 92, "checks": {} },
  "block_state": "loose",
  "certificate": "DRVC3 v1.0",
  "replay_instructions": {"service": "app.launcher", "params": {"id": "42"}},
  "tags": ["#uvrn", "#drvc3", "#replayable"]
}

# 2. Lifecycle (TVC Loop)

**Test → Validate → Canonize**

Test – System or user emits a loose receipt.

Validate – Cross-checks parity, completeness, freshness → V-Score.

Canonize (“Block”) – Optionally lock the proof; write to the Canon Log; issue DRVC3 certificate.

# 3. Endpoints

Method Endpoint Purpose
POST /api/v1/receipts Submit new receipt Create / emit proof
GET /api/v1/receipts/:id Retrieve + verify Public verification
POST /api/v1/canonize/:id Canonize (block) Finalize proof
GET /api/v1/search?tag=#uvrn Query by tag Discovery / analytics

# 4. Integration Pattern

Layer Example
Apps Substack, LK Hub, Figma plug-in, etc.
Auth Wallet / OAuth signature
Network UVRN registry (open-source, neutral)
Optional On-chain Anchor Ethereum / EVM hash reference

# 5. Developer Quick-Start

Implementation: [uvrn-packages](https://github.com/UVRN-org/uvrn-packages) — install from npm: `@uvrn/core`, `@uvrn/sdk`, `@uvrn/cli`, `@uvrn/api`, `@uvrn/mcp`, `@uvrn/adapter`.

```bash
npm i @uvrn/core @uvrn/sdk
npx @uvrn/cli run bundle.json
```

→ returns receipt and verification.

# 6. Principles

Open by default – No proprietary ledger.

Minimal and verifiable – Store hashes, not content.

Human + Machine friendly – Readable + executable.

Selective immutability – Block only what must endure.

Ethical proof design – Privacy-preserving verification.

## 🤝 Contributing

We welcome early contributors!

## 📜 License

MIT — see [LICENSE](LICENSE) in this repo.
