import { Viaje } from "../models/Viaje.js"
import { Testimonio } from "../models/Testimonios.js"

const paginaInicio = async (req, res) => {
    
    const promiseDB = []

    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimonio.findAll({ limit: 4}))

    try {
        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }
    
    
}

const paginaNosotros = (req, res) => {   
    res.render('nosotros', {
        pagina: 'Sobre Nosotros'
    })
}

const paginaTestimonios = async (req, res) => {
    const testimonios = await Testimonio.findAll()
    
    try {
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaViajes = async (req, res) => {
    // Consulta DB
    const viajes = await Viaje.findAll()
    console.log(viajes)

    res.render('viajes', {
        pagina: 'Viajes Disponibles',
        viajes
    })
}

// Muestra pagina con informacion sobre el viaje elegido
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params
  
    try {
        const resultado = await Viaje.findOne({ where: {slug}})
        res.render('viaje', {
            pagina: resultado.titulo,
            resultado
        })

    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimonios,
    paginaViajes,
    paginaDetalleViaje
}