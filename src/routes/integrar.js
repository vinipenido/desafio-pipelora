const express = require('express')
const router = express.Router()
const { fazerScraping } = require('../services/scraper')


router.get('/', (req, res) => {
  res.json({ mensagem: 'API Pipelora funcionando!' })
})

router.post('/integrar', async (req, res) => {
  const { login, senha, url_sistema } = req.body

  if (!login || !senha || !url_sistema) {
    return res.status(400).json({
      success: false,
      error: 'Todos os campos são obrigatórios'
    })
  }

  try {
    const dados = await fazerScraping(login, senha, url_sistema)
    res.status(200).json({
      success: true,
      total: dados.length,
      data: dados
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router