import { Testimonio } from "../models/Testimonios.js"

const guardarTestimonio = async (req, res) => {
    const {nombre, correo, mensaje} = req.body

    const errores = []

    if (nombre.trim() === '') {
        errores.push({mensaje: 'El nombre esta vacio'})
    }

    if (correo.trim() === '') {
        errores.push({mensaje:'El correo esta vacio'})
    }

    if (mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje esta vacio'})
    }

    if (errores.length > 0){
        // Consulta los testimonios existentes en la base de datos
        const testimonios = await Testimonio.findAll()

        // Mostrar mensaje de error en pantalla
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre, 
            correo,
            mensaje,
            testimonios
        })
    } else{
        // Almacenar campos en base de datos 
        try {
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            })
            
            res.redirect('/testimonios')
        } catch (error) {
            console.log(error)
        }
    }
}

export {guardarTestimonio}