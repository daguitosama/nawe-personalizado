/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	DOMAIN: string;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (typeof env.DOMAIN != 'string') {
			return new Response('Error, not $DOMAIN found', { status: 500 });
		}
		return redirect_to_www({ domain: env.DOMAIN, request });
	},
};

function redirect_to_www({ domain, request }: { domain: string; request: Request }): Response {
	const headers = new Headers();
	const url = new URL(request.url);
	const has_params = url.searchParams.toString().length;
	if (has_params) {
		headers.set('Location', `https://www.${domain}` + url.pathname + `?${url.searchParams.toString()}`);
	} else {
		headers.set('Location', `https://www.${domain}` + url.pathname);
	}

	return new Response(null, { headers, status: 301 });
}
