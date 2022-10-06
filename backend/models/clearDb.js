import practices from "./index.js";

async function clearDb() {
  const response = await practices.deleteMany();
  console.log(response);
}

clearDb();
