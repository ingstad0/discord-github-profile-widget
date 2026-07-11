import dotenv from 'dotenv';
import { runSync } from './sync.js';

dotenv.config();

async function main() {
  try {
    await runSync(process.env);
  } catch (error) {
    console.error('Sync failed:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
