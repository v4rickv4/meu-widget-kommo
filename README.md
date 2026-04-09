# 🎯 Metas do Funil — Kommo

Widget para configurar as metas percentuais de cada etapa do funil de vendas, com persistência no Supabase.

---

## 🚀 Como usar

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure suas chaves (⚠️ este passo é obrigatório)
```bash
cp .env.example .env
```
Abra o arquivo `.env` e preencha com suas chaves reais do Supabase:
```
SUPABASE_URL=https://SEU_PROJETO.supabase.co
SUPABASE_KEY=SUA_CHAVE_ANON_AQUI
```

### 4. Suba o servidor
```bash
npm start
```

### 5. Acesse no navegador
```
http://localhost:3000
```

---

## 🗄️ Estrutura da tabela no Supabase

Crie a tabela `metas_funil` com as seguintes colunas:

| Coluna           | Tipo    | Default |
|------------------|---------|---------|
| id               | int8    | —       |
| qualificado      | int4    | 80      |
| agendamento      | int4    | 40      |
| comparecimentos  | int4    | 30      |
| vendas_ganhas    | int4    | 30      |

> Insira uma linha com `id = 1` antes de usar o widget.

---

## 🔒 Segurança

- O arquivo `.env` está no `.gitignore` e **nunca** é enviado ao GitHub.
- O `server.js` lê as chaves do `.env` e as entrega ao frontend via `/config.json` somente localmente.
- Use `.env.example` como referência para outros colaboradores.

---

## 📁 Estrutura do projeto

```
projeto-kommo/
├── .env              ← suas chaves reais (nunca sobe)
├── .env.example      ← template vazio (sobe normalmente)
├── .gitignore        ← bloqueia o .env
├── index.html        ← widget principal
├── server.js         ← servidor local que lê o .env
├── package.json
└── README.md
```
