import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import CardsDAO from './dao/cardsDAO.js'

/*
Jeremy Aviles
2/25/26
IT302-452
Phase 2 Read MongoDB data using Node.js
jja@njit.edu
*/

async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient( process.env.CARDS_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await CardsDAO.injectDB(client)

    app.listen(port, () => {
    console.log('server is running on port: ' + port);
    })

  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}
main().catch(console.error);
