/** @type {import('@remix-run/dev').AppConfig} */
export default {
    devServerBroadcastDelay: 1000,
    ignoredRouteFiles: ["**/.*"],
    server: "./server.ts",
    serverBuildPath: "functions/[[path]].js",
    serverConditions: ["workerd", "worker", "browser"],
    serverDependenciesToBundle: "all",
    serverMainFields: ["browser", "module", "main"],
    serverMinify: true,
    serverModuleFormat: "esm",
    serverPlatform: "neutral",
    // appDirectory: "app",
    // assetsBuildDirectory: "public/build",
    // publicPath: "/build/",
    tailwind: true,
};
