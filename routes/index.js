import express from 'express'
import { paginaInicio,
     paginaNosotros, 
     paginaTestimonios, 
     paginaViajes, 
     paginaDetalleViaje
} from '../controllers/pageController.js'
import {guardarTestimonio} from '../controllers/testimoniosController.js'

const router = express.Router()

router.get('/', paginaInicio)

router.get('/nosotros', paginaNosotros)

router.get('/testimonios', paginaTestimonios)
router.post('/testimonios', guardarTestimonio)

router.get('/viajes', paginaViajes)

router.get('/viajes/:slug', paginaDetalleViaje)

export default router; 