import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "../..");

async function build() {
  await esbuild({
    entryPoints: [path.resolve(currentDir, "src/app.ts")],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    outfile: path.resolve(rootDir, "api/index.js"),
    external: ["nodemailer"],
    banner: {
      js: `import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';
globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
`,
    },
    footer: {
      js: `export default app;`,
    },
  });

  const wrapperContent = `import app from "./index.js";\nexport default app;\n`;
  const fs = await import("node:fs");

  // Create endpoints in root /api
  fs.writeFileSync(path.resolve(rootDir, "api/enquiries.js"), wrapperContent, "utf8");
  fs.writeFileSync(path.resolve(rootDir, "api/applications.js"), wrapperContent, "utf8");

  // Create endpoints in artifacts/inclined-careers/api
  const frontendApiDir = path.resolve(rootDir, "artifacts/inclined-careers/api");
  if (!fs.existsSync(frontendApiDir)) {
    fs.mkdirSync(frontendApiDir, { recursive: true });
  }
  fs.copyFileSync(path.resolve(rootDir, "api/index.js"), path.resolve(frontendApiDir, "index.js"));
  fs.writeFileSync(path.resolve(frontendApiDir, "enquiries.js"), wrapperContent, "utf8");
  fs.writeFileSync(path.resolve(frontendApiDir, "applications.js"), wrapperContent, "utf8");

  console.log("Built Vercel serverless endpoints successfully!");
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
