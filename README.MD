# Desafio Pipelora AI

API REST que utiliza Puppeteer para fazer login em sistemas externos e extrair dados automaticamente — simulando integrações com sistemas que não possuem API pública.

---

## Como funciona

1. Você envia uma requisição `POST /integrar` com login, senha e URL do sistema
2. A API abre um navegador automaticamente (Puppeteer)
3. Faz login no sistema informado
4. Navega até a listagem de dados e extrai as informações
5. Retorna um JSON estruturado com os registros encontrados

---

## Pré-requisitos

- [Node.js v20+](https://nodejs.org) instalado
- [Git](https://git-scm.com) instalado

---

## Instalação
```bash
# Clone o repositório
git clone https://github.com/vinipenido/desafio-pipelora.git

# Entre na pasta
cd desafio-pipelora

# Instale as dependências
npm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
```bash
cp .env.example .env
```

Conteúdo do `.env`: PORT=3000

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta em que o servidor vai rodar | `3000` |

---

## Como rodar
```bash
node src/api-pipelora.js
```

O terminal vai exibir: Servidor rodando na porta 3000

---

## Endpoints

### GET /
Verifica se a API está no ar.

**Resposta:**
```json
{
  "mensagem": "API Pipelora funcionando!"
}
```

---

### POST /integrar
Faz login no sistema informado, extrai os dados e retorna como JSON.

**Body (JSON):**
```json
{
  "login": "tomsmith",
  "senha": "SuperSecretPassword!",
  "url_sistema": "https://the-internet.herokuapp.com/login"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `login` | string | sim | Usuário para autenticação |
| `senha` | string | sim | Senha para autenticação |
| `url_sistema` | string | sim | URL da página de login do sistema |

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "total": 4,
  "data": [
    {
      "sobrenome": "Smith",
      "nome": "John",
      "email": "jsmith@gmail.com",
      "devido": "$50.00"
    }
  ]
}
```

**Resposta de erro — campos faltando (400):**
```json
{
  "success": false,
  "error": "Todos os campos são obrigatórios"
}
```

**Resposta de erro — login inválido (401):**
```json
{
  "success": false,
  "error": "Login inválido."
}
```

---

## Estrutura do projeto

desafio-pipelora/
src/
routes/
integrar.js     # endpoint POST /integrar e GET /
services/
scraper.js      # lógica do Puppeteer
api-pipelora.js   # servidor principal
.env                # variáveis de ambiente (não commitado)
.env.example        # modelo das variáveis
.gitignore
package.json
README.md

---

## Tecnologias

- **Node.js** — runtime JavaScript
- **Express** — framework para API REST
- **Puppeteer** — automação de navegador
- **dotenv** — variáveis de ambiente
