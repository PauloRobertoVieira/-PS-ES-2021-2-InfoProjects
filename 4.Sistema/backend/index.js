const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('From Get')
})

app.get('/projetos', (req, res) => {
    res.send('Path Projetos')
})

app.post('/', (req, res) => {
    res.send('From Post!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})