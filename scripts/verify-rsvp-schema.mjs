import { spawnSync } from 'node:child_process';

const dbUrl = process.env.SUPABASE_DB_URL;

if (!dbUrl || dbUrl.trim().length === 0) {
  console.error(
    'Missing SUPABASE_DB_URL. Set it to a Postgres connection string and rerun `npm run verify:rsvp-schema`.',
  );
  process.exit(1);
}

const executable = 'npx';
const args = [
  '--yes',
  'supabase',
  'db',
  'query',
  '--file',
  'supabase/scripts/verify-rsvp-schema.sql',
  '--db-url',
  dbUrl,
  '--output',
  'table',
  '--agent',
  'no',
];

const result = spawnSync(executable, args, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(`Failed to execute Supabase CLI: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
