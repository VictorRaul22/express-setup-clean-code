import { BackendApp } from "@/presentation/BackendApp";
async function main(): Promise<void> {
  const app = new BackendApp();
  await app.start();
}
void main();
