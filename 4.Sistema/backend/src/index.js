const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const projetos = require('./controllers/projetos')
const servicos = require('./controllers/servicos')
//const projetos = require('./controllers/usuario')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('From Get')
})

app.use('/projetos', projetos)
app.use('/servicos', servicos)
//app.use('/servicos', usuario)

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ message: error.message || "Algo está errado" })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})