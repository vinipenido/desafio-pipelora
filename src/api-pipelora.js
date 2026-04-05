const express = require ('express')
const { fazerScraping } = require ('./services/scraper')
const app = express()
require('dotenv').config()


app.use(express.json())

app.get('/', (req, res) => {
  res.json('API Pipelora ta funcionando!')
})

app.post('/integrar', async (req, res) => {
  const {login, senha, url_sistema} = req.body

  if (!login || !senha || !url_sistema) {
    return res.status(400).json({ 
      success: false,
      error: 'Todos os campos são obrigatórios' })
  }

  try {
   const dados = await fazerScraping(login, senha, url_sistema)
    res.status(200).json({
      success: true,
      total: dados.length,
      data: dados
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })

  }

  /* res.status(200).json({
  success: true,
message: `Recebido! Login: ${login}, Senha: ${senha}, Sistema: ${url_sistema}`}) */

})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`)
}) 