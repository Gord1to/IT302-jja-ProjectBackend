import CardsDAO from '../dao/cardsDAO.js'

export default class CardsController {
  static async apiGetCards(req, res, next) {
    const cardsPerPage = req.query.cardsPerPage ? parseInt(req.query.cardsPerPage) : 20
    const page = req.query.page ? parseInt(req.query.page) : 0
    let filters = {}
    if (req.query.name) {
      filters.name = req.query.name
    } else if (req.query.rarity) {  
      filters.rarity = req.query.rarity
    } else if (req.query.setName) {
      filters.setName = req.query.setName
    } else if (req.query.subtypes) {
      filters.subtypes = req.query.subtypes
    }
    const { cardsList, totalNumCards } = await CardsDAO.getCards({
      filters, page, cardsPerPage
    })

    let response = {
      cards: cardsList,
      page: page,
      filters: filters,
      entries_per_page: cardsPerPage,
      total_results: totalNumCards,
    }
    res.json(response)
  }
}