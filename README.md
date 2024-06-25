# nawepersonalizado.com

A website for NAWE.

### Structure

-   `site/`: the website code, Remix project deployed on Cloudflare Pages
-   `apex_to_www/`: A Cloudflare Worker to redirect from Apex to www alias
-   `backend/`: a pocket base backend for CMS, deployed as an Unix Service on a VPS, proxy by a Caddy Server.
