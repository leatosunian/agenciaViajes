import express from "express"
import router from "./routes/index.js"
import db from "./config/db.js"

console.log(process.env.DB_HOST)

const app = express()

// Conectar a base de datos
db.authenticate()
    .then(() => {
        console.log('DB conectada')
    })
    .catch( error => {
        console.log(error)
    })


// Definir puerto 
const port = process.env.PORT || 4000

// Agregar bodyparser para leer el formulario de testimonios 
app.use(express.urlencoded({extended: true}))

// Agregar router
app.use('/', router)

// Habilitar PUG
app.set('view engine', 'pug')

// Obtener el año actual para el footer
app.use((req, res, next) => {
    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    
    next()
})

// Incorporar carpeta publica
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})