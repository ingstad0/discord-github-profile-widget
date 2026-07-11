import { runSync } from './sync.js';

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runSync(env));
  },

  async fetch(request, env, ctx) {
    const authHeader = request.headers.get('Authorization');
    const expected = `Bearer ${env.MANUAL_TRIGGER_TOKEN}`;

    if (!env.MANUAL_TRIGGER_TOKEN || authHeader !== expected) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      await runSync(env);
      return new Response('Sync completed successfully!', { status: 200 });
    } catch (error) {
      return new Response(`Sync failed: ${error.message}`, { status: 500 });
    }
  }
};
