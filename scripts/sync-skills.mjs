import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const sourceRoot =
  "https://raw.githubusercontent.com/alpacahq/alpaca-skills/refs/heads/main/skills";

const skillFiles = ["SKILL.md", "reference.md"];

const skillRoutes = {
  "trading-api/paper-trading": "alpaca-trading",
  "trading-api/paper-trading-mcp": "alpaca-trading",
  "broker-api/integration": "alpaca-broker",
  "broker-api/account-onboarding": "alpaca-broker",
  "broker-api/funding-transfers": "alpaca-broker",
  "broker-api/journals": "alpaca-broker",
  "broker-api/trading-orders": "alpaca-broker",
  "broker-api/market-data": "alpaca-broker",
  "broker-api/sse-events": "alpaca-broker",
  "broker-api/reconciliation-idempotency": "alpaca-broker",
  "broker-api/rate-limits-resilience": "alpaca-broker",
  "broker-api/money-precision": "alpaca-broker",
};

function getSkillName(content, skillFile) {
  const match = content.match(/^name:\s*([a-z0-9-]+)\s*$/m);

  if (!match) {
    throw new Error(`Missing skill name in ${skillFile}`);
  }

  return match[1];
}

async function fetchSkillFile(skill, file) {
  const url = `${sourceRoot}/${skill}/${file}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}

async function syncSkills() {
  const plugins = new Set(Object.values(skillRoutes));
  const skills = [];

  for (const [skill, plugin] of Object.entries(skillRoutes)) {
    const files = new Map(
      await Promise.all(
        skillFiles.map(async (file) => [
          file,
          await fetchSkillFile(skill, file),
        ]),
      ),
    );

    const skillName = getSkillName(
      files.get("SKILL.md"),
      `${skill}/SKILL.md`,
    );

    skills.push({ files, plugin, skillName });
  }

  for (const plugin of plugins) {
    const skillsDirectory = path.join(repoRoot, "plugins", plugin, "skills");

    await fs.rm(skillsDirectory, { recursive: true, force: true });
    await fs.mkdir(skillsDirectory, { recursive: true });
  }

  for (const { files, plugin, skillName } of skills) {
    const destination = path.join(
      repoRoot,
      "plugins",
      plugin,
      "skills",
      skillName,
    );

    await fs.mkdir(destination, { recursive: true });

    await Promise.all(
      [...files].map(([file, content]) =>
        fs.writeFile(path.join(destination, file), content, "utf8"),
      ),
    );

    console.log(`Synced ${skillName} to ${plugin}`);
  }
}

syncSkills().catch((error) => {
  console.error(`Skill sync failed: ${error.message}`);
  process.exitCode = 1;
});
