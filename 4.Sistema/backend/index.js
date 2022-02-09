const express = require('express')
const bodyParser = require('body-parser');

const projetos = require('./controllers/projetos')

const app = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('From Get')
})

app.use('/projetos', projetos)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})