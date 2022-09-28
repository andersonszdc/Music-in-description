/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  SPOTIFY: KVNamespace;
  //
  API_URL: string;
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    console.log(`Cron: Started!`);

    const access_token = await env.SPOTIFY.get("access_token");

    console.log(`access_token: ${access_token}`);

    const result = await fetch(
      `${env.API_URL}/worker-test/?access_token=${access_token}`,
      {
        method: "GET",
      }
    );

    if (result.status !== 200) {
      const refresh_token = await env.SPOTIFY.get("refresh_token");

      const response = await fetch(
        `${env.API_URL}/refresh_token/?refresh_token=${refresh_token}`
      );

      const result: any = await response.json();

      if (result.refresh_token) {
        await env.SPOTIFY.put("refresh_token", result.refresh_token);
      }
    }
  },
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const access_token = url.searchParams.get("access_token");
    const refresh_token = url.searchParams.get("refresh_token");

    if (access_token && !refresh_token) {
      await env.SPOTIFY.put("access_token", access_token);
      return new Response("access_token atualizado!");
    }

    if (refresh_token && !access_token) {
      await env.SPOTIFY.put("refresh_token", refresh_token);
      return new Response("refresh_token atualizado!");
    }

    if (access_token && refresh_token) {
      await env.SPOTIFY.put("access_token", access_token);
      await env.SPOTIFY.put("refresh_token", refresh_token);
      return new Response("access_token e refresh_token atualizados!");
    }

    return new Response("Vish...");
  },
};
