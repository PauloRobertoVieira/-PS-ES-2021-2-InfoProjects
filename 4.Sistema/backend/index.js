const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('From Get')
})

app.get('/projetos', (req, res) => {
  const projetos = [
    {
      id: 1,
      name: 'Projeto1'
    },
    {
      id: 2,
      name: 'Projeto2'
    }
  ]
    res.json(projetos)
})

app.get('/projetos/:id', (req, res) => {
  console.log(req.params)
   res.send(`Return post ${req.params.id}`)
})

app.delete('/projetos/:id', (req, res) => {
  console.log(req.params)
   res.send(`Delete post ${req.params.id}`)
})

app.put('/projetos/:id', (req, res) => {
  console.log(req.params)
  const post = req.body
   res.send(`UpDate post ${req.params.id}`)
})

app.post('/projetos', (req, res) => {
  console.log(req.body)
  const post = req.body
  res.send(`Save post ${post.id}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})