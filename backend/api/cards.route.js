import express from 'express'
import CardsController from "./cards.controller.js"

const router = express.Router()
router.route('/').get(CardsController.apiGetCards)



export default router