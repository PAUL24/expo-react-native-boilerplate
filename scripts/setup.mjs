import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const identityPath = path.join(projectRoot, 'app.identity.json');
const envPath = path.join(projectRoot, '.env');

const flagNames = new Set([
  'android-package',
  'api-url',
  'bundle-id',
  'dry-run',
  'help',
  'name',
  'package',
  'scheme',
  'slug',
]);

function parseArguments(argumentsList) {
  const values = new Map();

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];

    if (!argument?.startsWith('--')) {
      throw new Error(`Unexpected argument: ${argument ?? ''}`);
    }

    const name = argument.slice(2);
    if (!flagNames.has(name)) {
      throw new Error(`Unknown flag: --${name}`);
    }

    if (name === 'dry-run' || name === 'help') {
      values.set(name, true);
      continue;
    }

    const value = argumentsList[index + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${name}`);
    }

    values.set(name, value.trim());
    index += 1;
  }

  return values;
}

function assertMatches(label, value, expression, example) {
  if (!expression.test(value)) {
    throw new Error(`${label} is invalid. Expected a value like ${example}.`);
  }
}

function validateIdentity(identity) {
  if (!identity.name.trim()) {
    throw new Error('Application display name cannot be empty.');
  }

  assertMatches('Expo slug', identity.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'my-awesome-app');
  const applicationId = /^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/;
  assertMatches(
    'iOS bundle identifier',
    identity.iosBundleIdentifier,
    applicationId,
    'com.example.myapp',
  );
  assertMatches('Android package', identity.androidPackage, applicationId, 'com.example.myapp');
  assertMatches('URL scheme', identity.scheme, /^[a-z][a-z0-9+.-]*$/, 'myawesomeapp');
}

function printHelp() {
  console.log(`Usage: npm run setup -- [options]

Options:
  --name "My App"                 Application display name
  --slug my-app                   Expo slug
  --bundle-id com.example.myapp   iOS bundle identifier
  --package com.example.myapp     Android package name
  --android-package <value>       Alias for --package
  --scheme myapp                  Deep-link URL scheme
  --api-url https://api.example   Optional public API base URL
  --dry-run                       Validate and preview without writing
  --help                          Show this help`);
}

const flags = parseArguments(process.argv.slice(2));

if (flags.has('help')) {
  printHelp();
  process.exit(0);
}

const currentIdentity = JSON.parse(await readFile(identityPath, 'utf8'));
const prompt = process.stdin.isTTY
  ? createInterface({ input: process.stdin, output: process.stdout })
  : null;

async function valueFor(flag, question, fallback) {
  const flagValue = flags.get(flag);
  if (typeof flagValue === 'string') {
    return flagValue;
  }

  if (!prompt) {
    return fallback;
  }

  const answer = await prompt.question(`${question} (${fallback}): `);
  return answer.trim() || fallback;
}

try {
  const nextIdentity = {
    name: await valueFor('name', 'Application display name', currentIdentity.name),
    slug: await valueFor('slug', 'Expo slug', currentIdentity.slug),
    iosBundleIdentifier: await valueFor(
      'bundle-id',
      'iOS bundle identifier',
      currentIdentity.iosBundleIdentifier,
    ),
    androidPackage: await valueFor(
      flags.has('package') ? 'package' : 'android-package',
      'Android package name',
      currentIdentity.androidPackage,
    ),
    scheme: await valueFor('scheme', 'URL scheme', currentIdentity.scheme),
  };
  validateIdentity(nextIdentity);

  const apiUrl = flags.get('api-url');
  if (typeof apiUrl === 'string') {
    new URL(apiUrl);
  }

  console.log('\nConfiguration preview:');
  console.log(JSON.stringify({ ...nextIdentity, apiUrl: apiUrl ?? '(unchanged)' }, null, 2));

  if (!flags.has('dry-run')) {
    await writeFile(identityPath, `${JSON.stringify(nextIdentity, null, 2)}\n`, 'utf8');

    if (typeof apiUrl === 'string') {
      await writeFile(
        envPath,
        `EXPO_PUBLIC_API_URL=${apiUrl}\nEXPO_PUBLIC_APP_ENV=development\n`,
        'utf8',
      );
    }

    console.log('\nSetup complete. Run npm start to launch the app.');
  } else {
    console.log('\nDry run complete; no files were changed.');
  }
} finally {
  prompt?.close();
}
