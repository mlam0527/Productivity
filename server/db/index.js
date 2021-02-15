const { MongoClient } = require('mongodb');
const { mongoURI } = require('../../secrets')

async function main() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    await listDatabases(client);
  } catch(error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  // console.log(databasesList);
  // databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

main().catch(console.error)