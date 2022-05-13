/** @jsx h */
import { ConnInfo, serve } from "https://deno.land/std@0.137.0/http/server.ts";

import { h } from "https://esm.sh/preact@10.5.15";

import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";

function getRemoteIP(connInfo: ConnInfo): String {
  const addr = connInfo.remoteAddr as Deno.NetAddr;
  return addr.hostname;
}

function handler(_req: Request, connInfo: ConnInfo): Response {

  const serverDate = new Date();

  const page = (
    <div>
      <h1>Time</h1>
      <p>{serverDate.toLocaleString()}</p>

      <hr/>
      <h1>Remote IP</h1>
      <p>{getRemoteIP(connInfo)}</p>
    </div>
  );

  const html = renderToString(page);

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });

}

serve(handler);
