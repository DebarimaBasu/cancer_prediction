import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
});


// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://auth.privy.io",
//         changeOrigin: true,
//         secure: false, // Sometimes needed for HTTPS
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
