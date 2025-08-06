import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { Database } from 'sqlite3'

const app = Fastify({ logger: true })

// Middleware CORS
app.register(fastifyCors)

// Init SQLite
const db = new Database('./db.sqlite', (err) => {
  if (err) console.error('Error SQLite :', err)
  else console.log('SQLite connected !')
})

// Crée une table si elle n’existe pas
db.run(`CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alias TEXT NOT NULL UNIQUE
)`)

// Route test
app.get('/players', async (request, reply) => {
  db.all('SELECT * FROM players', (err, rows) => {
    if (err) {
      reply.status(500).send({ error: 'Error DB' })
    } else {
      reply.send(rows)
    }
  })
})

const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' })
    console.log('Serveur Fastify sur http://localhost:3001')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
