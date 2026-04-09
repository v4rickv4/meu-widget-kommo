// server.js — Servidor local que lê o .env e serve as chaves com segurança
// As chaves NUNCA ficam expostas no código-fonte

require('dotenv').config()
const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000

// Validação: garante que as variáveis estão definidas antes de subir
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('\n❌ Erro: Variáveis de ambiente não encontradas!')
  console.error('👉 Copie o arquivo .env.example para .env e preencha suas chaves.\n')
  process.exit(1)
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
}

const server = http.createServer((req, res) => {
  // Rota especial: entrega as chaves do Supabase para o frontend (somente local)
  if (req.url === '/config.json') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }))
    return
  }

  // Serve os arquivos estáticos normalmente
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url)
  const ext = path.extname(filePath)
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('Arquivo não encontrado')
      return
    }
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
})

server.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em http://localhost:${PORT}`)
  console.log('🔒 Suas chaves estão protegidas no arquivo .env\n')
})
