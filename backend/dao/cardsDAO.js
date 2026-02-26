let cards
/*
Jeremy Aviles
2/25/26
IT302-452
Phase 2 Read MongoDB data using Node.js
jja@njit.edu
*/

export default class CardsDAO {
  static async injectDB(conn) {
    if(cards){ 
      return
    } try {
      cards = await conn.db(process.env.CARDS_NS).collection('cards_jja')
    } catch(e) {
      console.error(`unable to connect in CardsDAO: ${e}`)
    }
  }

  static async getCards({
    filters = null,
    page = 0,
    cardsPerPage = 20,
  } = {}) {
    let query = {}
    if(filters) {
      if("name" in filters) {
        query = { $text: { $search: filters['name']}}
      } else if("rarity" in filters) {
        query = { "rarity": { $eq: filters['rarity']}}
    } else if("setName" in filters) {
        query = { "setName": { $eq: filters['setName']}}
    } else if("subtypes" in filters) {
        query = { "subtypes": { $eq: filters['subtypes']}}
    }
 }
    let cursor
    try {
      cursor = await cards
        .find(query)
        .limit(cardsPerPage)
        .skip(cardsPerPage * page)
      const cardsList = await cursor.toArray()
      const totalNumCards = await cards.countDocuments(query)
      return {cardsList, totalNumCards}
    } catch(e) {
      console.error(`Unable to issue find command, ${e}`)
      console.error(e)
      return { cardsList: [], totalNumCards: 0 }
    }
  }
}