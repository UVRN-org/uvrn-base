# UVRN Base

**Universal Verification Receipt Network (UVRN)**
_The SSL of AI and analytics._

**UVRN Base** is the seed repository of the **uvrn-org** organization. It defines the **UVRN protocol**: schemas, receipts, and validation logic. This is the genesis block of the ecosystem — everything else grows from here.

---

> **Disclaimer:** UVRN is in Alpha testing. The engine measures whether your sources agree with each other — not whether they're correct. Final trust of output rests with the user. Use at your own discretion. Have fun.
>
> *UVRN makes no claims to "truth" — the "verification" is the output of math. It is up to any user to decide if a claim is actually "true." A high score means sources agreed; it does not mean the claim is objectively correct, complete, or will remain accurate in the future. Consensus among sources is evidence of alignment, not proof of reality. UVRN is a verification tool, not an authority — any conclusions, decisions, or actions taken based on UVRN outputs are solely the responsibility of the individual user. Nothing produced by UVRN constitutes legal, financial, medical, scientific, or any other form of professional advice. Research and testing are absolutely recommended per use case and individual system.*
>
> *See [uvrn.org/disclaimer](https://uvrn.org/disclaimer) for the full disclaimer.*

---

## What is UVRN?

UVRN is an open protocol for producing **verifiable receipts** — signed, replayable proof that a claim was checked, scored, and optionally locked forever.

The protocol answers one question: **did multiple independent sources agree on this claim, when, and by how much?** That answer is expressed as a cryptographic receipt, not a screenshot.

- **V-Score** — weighted confidence: completeness + parity + freshness
- **Receipts** — signed JSON records (DRVC3 v1.01) with replay ID and integrity hash
- **Drift** — temporal decay: scores degrade over time on fast-moving claims
- **Canonization** — optionally lock a receipt permanently (TVC loop: Test → Validate → Canonize)
- **20 scoped packages** — from raw data ingestion to embeddable badge widgets

Every receipt follows the **DRVC3 v1.01** standard: canonical hash, EIP-191 or ed25519 signature, replayable.

---

## Quickstart

```bash
git clone https://github.com/UVRN-org/uvrn-base.git
cd uvrn-base
npm install -g ajv-cli
ajv validate -s schemas/drvc3.schema.json -d "receipts/uvrn-receipt-ex1.json"
# validate all: ajv validate -s schemas/drvc3.schema.json -d "receipts/*.json"
```

**Schema:** [schemas/drvc3.schema.json](schemas/drvc3.schema.json)
**Examples:** [receipts/uvrn-receipt-ex1.json](receipts/uvrn-receipt-ex1.json) (full) · [receipts/uvrn-receipt-minimal.json](receipts/uvrn-receipt-minimal.json) (minimal)

For production Delta Engine receipts, see [@uvrn/adapter](https://www.npmjs.com/package/@uvrn/adapter) — extended DRVC3 envelope with Delta receipt shape.

---

## Ecosystem

| Repo | What it is |
| --- | --- |
| **[uvrn-base](https://github.com/UVRN-org/uvrn-base)** ← you are here | Protocol: DRVC3 schema, receipt examples, validation demo |
| **[uvrn-packages](https://github.com/UVRN-org/uvrn-packages)** | Implementation monorepo — 20 scoped `@uvrn/*` packages |
| **[uvrn-worker](https://github.com/UVRN-org/uvrn-worker)** | Cloudflare Worker — receipt registry API backed by D1 |
| **[uvrn](https://github.com/UVRN-org/uvrn)** | Project landing page and repo directory |

---

## Packages

20 scoped packages across four protocol layers. Every package is independently installable.

### Layer 1 — Data & Consensus

| Package | What it does |
| --- | --- |
| [@uvrn/signal](https://www.npmjs.com/package/@uvrn/signal) | Typed in-process event bus — zero-dep pub/sub for wiring packages together |
| [@uvrn/farm](https://www.npmjs.com/package/@uvrn/farm) | Provider-agnostic data ingestion — define the `FarmConnector` interface, bring any source |
| [@uvrn/normalize](https://www.npmjs.com/package/@uvrn/normalize) | Profile-driven normalization of `FarmSource` objects before scoring |
| [@uvrn/consensus](https://www.npmjs.com/package/@uvrn/consensus) | Turns raw farm output into a `DeltaBundle` — ranks, deduplicates, and weights sources |

### Layer 2 — Receipt & Verification

| Package | What it does |
| --- | --- |
| [@uvrn/core](https://www.npmjs.com/package/@uvrn/core) ✦ | Delta Engine core — run, validate, verify. V-Score formula lives here. |
| [@uvrn/sdk](https://www.npmjs.com/package/@uvrn/sdk) ✦ | TypeScript SDK — build bundles and verify receipts |
| [@uvrn/adapter](https://www.npmjs.com/package/@uvrn/adapter) ✦ | DRVC3 envelope adapter, EIP-191 signing |
| [@uvrn/score](https://www.npmjs.com/package/@uvrn/score) | Score breakdown and explanation layer — LLM-ready output strings |
| [@uvrn/compare](https://www.npmjs.com/package/@uvrn/compare) | Head-to-head and time-series claim comparison |
| [@uvrn/identity](https://www.npmjs.com/package/@uvrn/identity) | Signer reputation tracking — pluggable `IdentityStore` |
| [@uvrn/test](https://www.npmjs.com/package/@uvrn/test) | Dev-time mocks, factories, and fixtures _(dev only)_ |

### Layer 3 — Temporal & Lifecycle

| Package | What it does |
| --- | --- |
| [@uvrn/drift](https://www.npmjs.com/package/@uvrn/drift) | Temporal decay scoring — models how confidence degrades over time |
| [@uvrn/agent](https://www.npmjs.com/package/@uvrn/agent) | Continuous claim monitoring loop — emits unsigned `AgentDriftReceipt` on each interval |
| [@uvrn/canon](https://www.npmjs.com/package/@uvrn/canon) | Canonization — the final TVC step. Signs and permanently locks receipts. |
| [@uvrn/timeline](https://www.npmjs.com/package/@uvrn/timeline) | Claim history reconstruction, bucketing, and chart shaping |

### Layer 4 — Distribution & Access

| Package | What it does |
| --- | --- |
| [@uvrn/mcp](https://www.npmjs.com/package/@uvrn/mcp) ✦ | MCP server — connect the Delta Engine to Claude Desktop or any MCP-compatible AI assistant |
| [@uvrn/api](https://www.npmjs.com/package/@uvrn/api) ✦ | Fastify REST API server — self-host the Delta Engine |
| [@uvrn/cli](https://www.npmjs.com/package/@uvrn/cli) ✦ | CLI — run bundles and generate receipts from the terminal |
| [@uvrn/watch](https://www.npmjs.com/package/@uvrn/watch) | Threshold-event alerts — pluggable delivery targets (webhook, Slack, Discord, in-process) |
| [@uvrn/embed](https://www.npmjs.com/package/@uvrn/embed) | Embeddable React badge + UMD widget for live claim status |

✦ Live on npm. All others are pre-release from `uvrn-packages-next`.

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 4 — Distribution & Access                                │
│  @uvrn/embed  @uvrn/watch  @uvrn/mcp  @uvrn/api  @uvrn/cli    │
├─────────────────────────────────────────────────────────────────┤
│  Layer 3 — Temporal & Lifecycle                                 │
│  @uvrn/drift  @uvrn/agent  @uvrn/canon  @uvrn/timeline         │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2 — Receipt & Verification                               │
│  @uvrn/core  @uvrn/sdk  @uvrn/adapter  @uvrn/score             │
│  @uvrn/compare  @uvrn/identity  @uvrn/test                     │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1 — Data & Consensus                                     │
│  @uvrn/farm  @uvrn/consensus  @uvrn/normalize  @uvrn/signal    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Developer Quick-Start

**Minimal (core + SDK):**
```bash
npm i @uvrn/core @uvrn/sdk
npx @uvrn/cli run bundle.json
```

**Data → Receipt pipeline:**
```bash
npm i @uvrn/farm @uvrn/normalize @uvrn/consensus @uvrn/core @uvrn/score
```

**Lifecycle (drift + canonization):**
```bash
npm i @uvrn/drift @uvrn/agent @uvrn/canon
```

**Delivery (alerts + embed):**
```bash
npm i @uvrn/watch @uvrn/embed
```

**AI assistant (MCP):**
```json
// claude_desktop_config.json
{
  "mcpServers": {
    "delta-engine": {
      "command": "npx",
      "args": ["-y", "@uvrn/mcp"]
    }
  }
}
```

See [uvrn-packages](https://github.com/UVRN-org/uvrn-packages) for individual package READMEs and minimal install notes per package.

---

## UVRN Protocol

**Portable proof for the open web.** Receipts flow freely until you decide to block (canonize) them.

### Core Idea

> *"Proof that flows. Block it when it matters."*

UVRN replaces heavy ledgers with tiny receipts: signed JSON records that prove who checked what, when, and with what result. Each receipt stays **loose** (mutable, portable) until explicitly **canonized** (permanent, locked).

### Receipt Structure — DRVC3 v1.01

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
  "certificate": "DRVC3 v1.01",
  "replay_instructions": { "service": "app.launcher", "params": { "id": "42" } },
  "tags": ["#uvrn", "#drvc3", "#replayable"]
}
```

**V-Score formula** (canonical, lives in `@uvrn/core`):
```
V-Score = (Completeness × 0.35) + (Parity × 0.35) + (Freshness × 0.30)
```

### Lifecycle — TVC Loop

**Test → Validate → Canonize**

- **Test** — System or user emits a loose receipt.
- **Validate** — Cross-checks parity, completeness, freshness → V-Score.
- **Canonize** — Optionally lock the proof. Signed, written to Canon Log, DRVC3 certificate issued. Human or explicitly confirmed system trigger required — never automatic.

### Drift

Scores decay over time via `@uvrn/drift`. A receipt from 6 hours ago on a fast-moving claim carries less weight than one from 6 minutes ago. Drift status: `STABLE | DRIFTING | CRITICAL`.

### Tags

Tags act like open-graph hashtags for proof context — they index receipts across apps, agents, and people.

| Tag | Meaning | Typical Use |
| --- | --- | --- |
| `#drvc3` | DRVC3 certificate / protocol | Compliance, generic proof, schema version |
| `#canonized` | Finalized / blocked receipt | Locked record, audit log |
| `#uvrn` | Universal Verification Receipt Network | Cross-registry sync |
| `#proof` | Generic evidence emission | Generic verification events |
| `#vscore` | Confidence-score event | Quality metrics / analytics |
| `#ai-action` | AI-initiated proof | Model run, agent act, automation |
| `#human-sign` | Human-signed receipt | Wallet, e-mail, or identity signature |
| `#group-seal` | Collective canonization | 1155/721 supporter seals |
| `#loglog` | Human-readable twin entry | Sync to Hermes DevChronicle |
| `#replayable` | Contains replay instructions | Used by AI automations |
| `#looseproof` | Temporary verification | Draft, pre-publication proof |

```json
"tags": ["#uvrn", "#drvc3", "#canonized"]
```

### API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/receipts` | Create / emit proof |
| `GET` | `/api/v1/receipts/:id` | Public verification |
| `POST` | `/api/v1/canonize/:id` | Finalize proof |
| `GET` | `/api/v1/search?tag=#uvrn` | Discovery / analytics |

Delta Engine API (`@uvrn/api`):

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/delta/run` | Execute engine on bundle — returns receipt |
| `POST` | `/api/v1/delta/validate` | Validate bundle schema |
| `POST` | `/api/v1/delta/verify` | Verify receipt (replay / hash) |

### Principles

- **Open by default** — No proprietary ledger.
- **Provider-agnostic** — Every external system is a pluggable interface. Bring your own connectors, stores, and delivery targets.
- **Minimal and verifiable** — Store hashes, not content.
- **Human + Machine friendly** — Readable + executable. LLM-friendly explanation fields throughout.
- **Selective immutability** — Block only what must endure.
- **Independently installable** — Every package works standalone. Zero-external path always works.
- **Ethical proof design** — Privacy-preserving verification.

---

## Contributing

We welcome early contributors. Protocol contributions (schema changes, new tags, receipt extensions) go here in `uvrn-base`. Implementation contributions go in [uvrn-packages](https://github.com/UVRN-org/uvrn-packages).

## License

MIT — see [LICENSE](LICENSE) in this repo.
