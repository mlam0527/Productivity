const { MongoClient } = require('mongodb');
const { mongoURI } = require('../../secrets')

async function connectToServer() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Accounts");
    const collection = db.collection("google");
    // console.log(collection)
  } catch (error) {
    console.log(error);
  } finally {
    await client.close()
  }
}

async function listDatabases() {
  databasesList = await client.db().admin().listDatabases();
  console.log(databasesList); 
  databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

module.exports = {
  connectToServer,
  listDatabases
}