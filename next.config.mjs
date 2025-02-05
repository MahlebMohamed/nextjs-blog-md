// import mdx from "@next/mdx";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Autres configurations Next.js si nécessaire
// };

// const withMDX = mdx({
//   extension: /\.mdx?$/,
// });

// export default withMDX({
//   ...nextConfig, // Ajoute nextConfig à la configuration MDX
//   pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
// });

import { build } from "velite";

/** @type {import('next').NextConfig} */
export default {
  // othor next config here...
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}
