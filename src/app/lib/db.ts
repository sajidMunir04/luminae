// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client;
let clientPromise: Promise<MongoClient>;
 
// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>
}

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri, options)
  globalWithMongo._mongoClientPromise = client.connect()
}
clientPromise = globalWithMongo._mongoClientPromise as Promise<MongoClient>;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;