import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Wallet, verifyMessage } from "ethers";
import Ajv from "ajv";
import schema from "../schemas/drvc3.schema.json" assert { type: "json" };

type Receipt = {
  receipt_id: string;
  issuer: string;
  event: string;
  timestamp: string;         // ISO8601
  description?: string;
  resource?: {
    type?: string; url?: string; branch?: string; commit_hash?: string;
  };
  integrity: {
    hash_algorithm: "sha256";
    hash: string;            // "sha256:<hex>"
    signature_method: "eip191";
    signature: string;       // 0x...
    signer_address: string;  // 0x...
  };
  validation?: {
    v_score?: number;
    checks?: Record<string, unknown>;
  };
  block_state: "loose" | "blocked";
  certificate: string;       // "DRVC3 v1.0"
  replay_instructions?: Record<string, unknown>;
  tags?: string[];
};

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

async function sha256File(filePath: string): Promise<string> {
  const data = await readFile(filePath);
  const h = createHash("sha256").update(data).digest("hex");
  return `sha256:${h}`;
}

// Signs the MESSAGE BYTES = the raw hash string (utf8) per EIP-191 signMessage
async function signHashEIP191(hash: string, pk: string) {
  const wallet = new Wallet(pk);
  const signature = await wallet.signMessage(hash);
  return { signature, address: await wallet.getAddress() };
}

function isoNow(): string {
  return new Date().toISOString();
}

function basicVScore(): number {
  // Stub: you can replace with completeness/parity/freshness formula
  return 95;
}

function assertValidReceipt(r: Receipt) {
  const ok = validate(r);
  if (!ok) {
    const errs = (validate.errors ?? []).map(e => `${e.instancePath} ${e.message}`).join("; ");
    throw new Error(`Schema validation failed: ${errs}`);
  }
}

async function createReceipt(opts: {
  file: string;
  issuer: string;
  event: string;
  description?: string;
  block?: boolean;
  out?: string;
}) {
  const hash = await sha256File(opts.file);
  const pk = process.env.PRIVATE_KEY;
  if (!pk) throw new Error("Set PRIVATE_KEY to an EVM private key for signing");

  const { signature, address } = await signHashEIP191(hash, pk);

  const receipt: Receipt = {
    receipt_id: `drvc3_${Date.now()}`,
    issuer: opts.issuer,
    event: opts.event,
    timestamp: isoNow(),
    description: opts.description,
    resource: {
      type: "file",
      url: path.resolve(opts.file)
    },
    integrity: {
      hash_algorithm: "sha256",
      hash,
      signature_method: "eip191",
      signature,
      signer_address: address
    },
    validation: {
      v_score: basicVScore(),
      checks: { completeness: true, signed: true }
    },
    block_state: opts.block ? "blocked" : "loose",
    certificate: "DRVC3 v1.0",
    tags: ["#loosechain", "#drvc3", "#proof"]
  };

  assertValidReceipt(receipt);
  const out = opts.out ?? `receipt.${path.basename(opts.file)}.json`;
  await writeFile(out, JSON.stringify(receipt, null, 2));
  console.log(`✅ Receipt created → ${out}`);
}

async function verifyReceipt(opts: { receipt: string }) {
  const raw = await readFile(opts.receipt, "utf8");
  const r: Receipt = JSON.parse(raw);

  // 1) schema
  assertValidReceipt(r);

  // 2) re-hash resource if local file path
  if (r.resource?.url && r.resource.url.startsWith("/")) {
    const actual = await sha256File(r.resource.url);
    if (actual !== r.integrity.hash) {
      throw new Error(`Hash mismatch: expected ${r.integrity.hash} but got ${actual}`);
    }
  }

  // 3) signature check
  const recovered = verifyMessage(r.integrity.hash, r.integrity.signature);
  if (recovered.toLowerCase() !== r.integrity.signer_address.toLowerCase()) {
    throw new Error(`Bad signature: recovered ${recovered}, expected ${r.integrity.signer_address}`);
  }

  console.log("✅ Receipt verified:");
  console.log(`   receipt_id: ${r.receipt_id}`);
  console.log(`   signer:     ${r.integrity.signer_address}`);
  console.log(`   block:      ${r.block_state}`);
  console.log(`   v_score:    ${r.validation?.v_score ?? "n/a"}`);
}

// CLI
yargs(hideBin(process.argv))
  .command(
    "create",
    "Create & sign a DRVC3 receipt",
    (y) => y
      .option("file", { type: "string", demandOption: true, desc: "Path to file to hash" })
      .option("issuer", { type: "string", default: "github.com/your-org/your-repo" })
      .option("event", { type: "string", default: "content.publish" })
      .option("description", { type: "string" })
      .option("block", { type: "boolean", default: false, desc: "Canonize (blocked) vs loose" })
      .option("out", { type: "string" }),
    (argv) => createReceipt({
      file: argv.file!, issuer: argv.issuer!, event: argv.event!,
      description: argv.description, block: argv.block, out: argv.out
    }).catch(e => { console.error(e); process.exit(1); })
  )
  .command(
    "verify",
    "Verify a DRVC3 receipt file",
    (y) => y.option("receipt", { type: "string", demandOption: true }),
    (argv) => verifyReceipt({ receipt: argv.receipt! }).catch(e => { console.error(e); process.exit(1); })
  )
  .demandCommand(1)
  .strict()
  .help()
  .parse();
