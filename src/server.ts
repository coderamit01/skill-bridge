import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 8000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("something went wrong");
    await prisma.$disconnect();
  }
}

main();
