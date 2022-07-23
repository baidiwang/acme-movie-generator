//EXPRESS ROUTER
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { conn, Movie } = db;
const { faker } = require('@faker-js/faker');
const { connect } = require('http2');


app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});


app.post('/api/movies', async(req, res, next) => {
try{
  res.status(201).send(await Movie.create(req.body)); 
}
catch(ex){
  next(ex);
}
})


app.put('/api/movies/:id', async(req, res, next) => {
  try{ 
    const movie = Movie.findByPk(req.params.id);
    await movie.update(req.body);
    res.send(movie);
  }
  catch(ex){
    next(ex);
  }
})



app.delete('/api/movies/:id', async(req, res, next) => {
  try{
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(204);
  } 
   catch(ex){
    next(ex);
   }
})



app.get('/api/movies', async(req, res, next)=> {
  try {
    res.send(await Movie.findAll());
  } 
  catch (ex) {
    next(ex);
  }
});


const init = async() => {
  try{
    await conn.sync({ force: true });
    const [movieA, movieB, movieC] = await Promise.all(
      ['MovieA','MovieB','MovieC'].map(name => {
        return Movie.create({ name })
      })
    );

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
    catch(ex){
    console.log(ex);
  }
}

init();
