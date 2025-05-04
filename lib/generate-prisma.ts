import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

async function generatePrisma() {
  try {
    console.log("Generating Prisma client...")
    await execAsync("npx prisma generate")
    console.log("Prisma client generated successfully!")
  } catch (error) {
    console.error("Error generating Prisma client:", error)
    process.exit(1)
  }
}

generatePrisma()
