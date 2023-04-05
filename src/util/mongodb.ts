import { MongoClient, ConnectOptions } from "mongodb";

let uri: any = process.env.MONGODB_URI;
let dbName: any = process.env.MONGODB_DB;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  const db = client.db(dbName);

  return { client, db };
}
