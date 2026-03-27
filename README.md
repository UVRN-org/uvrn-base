# UVRN Base

**Universal Verification Receipt Network (UVRN)**
_The SSL of AI and analytics._

**UVRN Base** is the seed repository of the **uvrn-org** organization.
It defines the **UVRN protocol**: schemas, receipts, and validation logic.
This is the **genesis block** of the ecosystem. Everything else — explorers, badges, fix-it recipes — grows from here.

---

> **Disclaimer:** UVRN is in Alpha testing. The engine measures whether your sources agree with each other — not whether they're correct. Final trust of output rests with the user. Use at your own discretion. Have fun.
>
> *UVRN makes no claims to "truth" — the "verification" is the output of math. It is up to any user to decide if a claim is actually "true." A high score means sources agreed; it does not mean the claim is objectively correct, complete, or will remain accurate in the future. Consensus among sources is evidence of alignment, not proof of reality. UVRN is a verification tool, not an authority — any conclusions, decisions, or actions taken based on UVRN outputs are solely the responsibility of the individual user. Nothing produced by UVRN constitutes legal, financial, medical, scientific, or any other form of professional advice. Research and testing are absolutely recommended per use case and individual system.*
>
> *See [uvrn.org/disclaimer](https://uvrn.org/disclaimer) for the full disclaimer.*

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

| Repo / Package | What it is |
| --- | --- |
| **[uvrn-base](https://github.com/UVRN-org/uvrn-base)** ← you are here | Protocol: DRVC3 schema, receipt examples, validation demo |
| **[uvrn-packages](https://github.com/UVRN-org/uvrn-packages)** | Implementation monorepo — Delta Engine, CLI, API, MCP, DRVC3 adapter |
| **[uvrn-worker](https://github.com/UVRN-org/uvrn-worker)** | Cloudflare Worker — receipt registry API backed by D1 |
| **[uvrn](https://github.com/UVRN-org/uvrn)** | Project landing page and repo directory |

**npm packages** (from `uvrn-packages`): [@uvrn/core](https://www.npmjs.com/package/@uvrn/core) 1.6.0 · [@uvrn/sdk](https://www.npmjs.com/package/@uvrn/sdk) 1.6.0 · [@uvrn/mcp](https://www.npmjs.com/package/@uvrn/mcp) 1.5.3 · [@uvrn/api](https://www.npmjs.com/package/@uvrn/api) 1.5.2 · [@uvrn/adapter](https://www.npmjs.com/package/@uvrn/adapter) 1.5.1 · [@uvrn/cli](https://www.npmjs.com/package/@uvrn/cli) 1.5.1

**Open source:** Source: [uvrn-base](https://github.com/UVRN-org/uvrn-base). Implementation: [uvrn-packages](https://github.com/UVRN-org/uvrn-packages), [uvrn](https://github.com/UVRN-org/uvrn).

---

# 🪞 UVRN Protocol

**Portable proof for the open web.**
UVRN is the lightweight verification protocol — receipts that flow freely until you decide to block (canonize) them.

# ✨ Core Idea

"Proof that flows. Block it when it matters."

UVRN replaces heavy ledgers with tiny receipts: signed JSON records that prove who did what, when, and with what result.
Each receipt can stay loose (mutable, portable) or become blocked (canonical, permanent).

# 🔖 Tag Examples

Tags act like open-graph hashtags for proof context. They help index receipts across apps, agents, and people.

| Tag | Meaning | Typical Use |
| --- | --- | --- |
| `#drvc3` | DRVC3 certificate / protocol | Compliance, generic proof, schema version |
| `#canonized` | Finalized / blocked receipt | Locked record, NFT seal, or audit log |
| `#uvrn` | Universal Verification Receipt Network | Cross-registry sync |
| `#proof` | Generic evidence emission | Generic verification events |
| `#vscore` | Confidence-score event | Quality metrics / analytics |
| `#ai-action` | AI-initiated proof | Model run, agent act, automation |
| `#human-sign` | Human-signed receipt | Wallet, e-mail, or identity signature |
| `#group-seal` | Collective canonization | 1155/721 supporter seals |
| `#loglog` | Human-readable twin entry | Sync to Hermes DevChronicle |
| `#replayable` | Contains replay instructions | Used by AI automations |
| `#looseproof` | Temporary verification | Draft, pre-publication proof |

Each tag can appear in the receipt metadata:

```json
"tags": ["#uvrn", "#drvc3", "#canonized"]
```

# 🧾 UVRN Protocol Outline

## 1. Receipt Structure — DRVC3 Schema

```json
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
```

## 2. Lifecycle (TVC Loop)

**Test → Validate → Canonize**

- **Test** — System or user emits a loose receipt.
- **Validate** — Cross-checks parity, completeness, freshness → V-Score.
- **Canonize ("Block")** — Optionally lock the proof; write to the Canon Log; issue DRVC3 certificate.

## 3. Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/receipts` | Submit new receipt — create / emit proof |
| `GET` | `/api/v1/receipts/:id` | Retrieve + verify — public verification |
| `POST` | `/api/v1/canonize/:id` | Canonize (block) — finalize proof |
| `GET` | `/api/v1/search?tag=#uvrn` | Query by tag — discovery / analytics |

## 4. Integration Pattern

| Layer | Example |
| --- | --- |
| Apps | Substack, LK Hub, Figma plug-in, etc. |
| Auth | Wallet / OAuth signature |
| Network | UVRN registry (open-source, neutral) |
| Optional | On-chain Anchor — Ethereum / EVM hash reference |

## 5. Developer Quick-Start

Implementation: [uvrn-packages](https://github.com/UVRN-org/uvrn-packages) — install from npm: `@uvrn/core`, `@uvrn/sdk`, `@uvrn/cli`, `@uvrn/api`, `@uvrn/mcp`, `@uvrn/adapter`.

```bash
npm i @uvrn/core @uvrn/sdk
npx @uvrn/cli run bundle.json
```

→ returns receipt and verification.

## 6. Principles

- **Open by default** — No proprietary ledger.
- **Minimal and verifiable** — Store hashes, not content.
- **Human + Machine friendly** — Readable + executable.
- **Selective immutability** — Block only what must endure.
- **Ethical proof design** — Privacy-preserving verification.

---

## 🤝 Contributing

We welcome early contributors!

## 📜 License

MIT — see [LICENSE](LICENSE) in this repo.
