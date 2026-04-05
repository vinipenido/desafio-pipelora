const puppeteer = require('puppeteer');

const fazerScraping = async (login, senha, url_sistema) => {
    const browser = await puppeteer.launch ({ headless: false })
    
    const page = await browser.newPage()

    await page.goto(url_sistema)
    await page.type('#username', login)
    await page.type('#password', senha)
    await page.click('button[type="submit"]')

    await page.waitForNavigation()

    const erro = await page.$('#flash.error')
        if (erro) {
            await browser.close()
            throw new Error('Login inválido.')
        }

    await page.goto('https://the-internet.herokuapp.com/tables')

        const dados = await page.evaluate(() => {
        const linhas = document.querySelectorAll('#table1 tbody tr')

        return Array.from(linhas).map(linha => {
            const colunas = linha.querySelectorAll('td')
            return {
                sobrenome: colunas[0].innerText,
                nome: colunas[1].innerText,
                email: colunas[2].innerText,
                devido: colunas[3].innerText,
            }
        })
    })

   /* const dados = await page.evaluate(() => {
      const mensagem = document.querySelector('#flash')
        return {
            titulo: document.querySelector('h2') ? document.querySelector('h2').innerText : '',
            mensagem: mensagem ? mensagem.innerText : ''
        }
    }) */  
    

    //console.log('Login realizado com sucesso!')
    console.log('Dados extraídos:', dados)
    await browser.close()

    return dados
}

module.exports = { fazerScraping }