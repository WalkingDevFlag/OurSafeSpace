const fs = require('node:fs');
const path = require('node:path');

// Resolve dist directory relative to the project root
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const envConfig = {
  USER1_USERNAME: process.env.USER1_USERNAME,
  USER1_PASSWORD: process.env.USER1_PASSWORD,
  USER2_USERNAME: process.env.USER2_USERNAME,
  USER2_PASSWORD: process.env.USER2_PASSWORD,
};

const outputFile = path.join(distDir, 'env-config.js');
// If an env var (e.g., process.env.USER1_USERNAME) is undefined,
// JSON.stringify will omit the key if its value is undefined.
// This means window.APP_CONFIG.USER1_USERNAME will be undefined in the client if not set.
const outputContent = `window.APP_CONFIG = ${JSON.stringify(envConfig)};`;

fs.writeFileSync(outputFile, outputContent);
console.log(`Environment configuration (env-config.js) generated in ${distDir}`);

// Optional: Check for missing required env vars during Vercel build
if (process.env.VERCEL_ENV) { // VERCEL_ENV is set by Vercel (e.g., 'production', 'preview', 'development')
  const requiredEnvVars = ['USER1_USERNAME', 'USER1_PASSWORD', 'USER2_USERNAME', 'USER2_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => envConfig[varName] === undefined);

  if (missingVars.length > 0) {
    console.warn(`Warning: The following environment variables are not set in Vercel and will be undefined in the app: ${missingVars.join(', ')}. Please set them in your Vercel project settings for the login system to function correctly.`);
  }
}
