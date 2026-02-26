import CardsDAO from '../dao/cardsDAO.js'

export default class CardsController {
  static async apiGetCards(req,res,next) {
    const cardsPerPage = req.query.cardsPerPage ? parseInt(req.query.cardsPerPage) : 20
    const page = req.query.page ?   parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.rated){
      filters.rated = req.query.rated
    } else if(req.query.name){
      filters.name = req.query.name
    }
    const { cardsList, totalNumCards } = await CardsDAO.getCards({
    filters, page, cardsPerPage})

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