import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Da6m-O9r.mjs';
import { manifest } from './manifest_C5PbjpyX.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/alter-speicher.astro.mjs');
const _page2 = () => import('./pages/api/test.astro.mjs');
const _page3 = () => import('./pages/buchungen.astro.mjs');
const _page4 = () => import('./pages/vorderhaus.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.8.0_@types+node@22.15.21_rollup@4.41.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/alter-speicher.astro", _page1],
    ["src/pages/api/test.ts", _page2],
    ["src/pages/buchungen.astro", _page3],
    ["src/pages/vorderhaus.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "531819b6-6571-4927-b04c-83eca6831143",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
