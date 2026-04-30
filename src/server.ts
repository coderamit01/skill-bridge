import app from "./app";
import { envVars } from "./app/config/env";
import { prisma } from "./app/lib/prisma";
import { seedAdmin } from "./app/utils/seedAdmin";

const PORT = envVars.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("something went wrong");
    await prisma.$disconnect();
  }
}

main();
