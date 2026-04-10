import http from "node:http";
import { createServerApplication } from "./app.js";
import { env } from "./env.js";

async function main() {
  const app = createServerApplication();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
