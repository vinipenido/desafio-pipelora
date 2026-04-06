const express = require ('express')
const app = express()
require('dotenv').config()
const integrarRoute = require('./routes/integrar')

app.use(express.json())
app.use(integrarRoute)



app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`)
}) 