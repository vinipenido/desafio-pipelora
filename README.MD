# Desafio Pipelora AI

API REST que utiliza Puppeteer para fazer login em sistemas externos e extrair dados automaticamente.

## Tecnologias

- Node.js
- Express
- Puppeteer
- Dotenv

## Como instalar
```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

PORT=3000

## Como rodar
```bash
node src/api-pipelora.js
```

## Como usar

Faça uma requisição POST para `/integrar`:
```json
{
  "login": "tomsmith",
  "senha": "SuperSecretPassword!",
  "url_sistema": "https://the-internet.herokuapp.com/login"
}
```

### Resposta de sucesso
```json
{
  "success": true,
  "total": 4,
  "data": [...]
}
```

### Resposta de erro
```json
{
  "success": false,
  "error": "Login inválido."
}
```