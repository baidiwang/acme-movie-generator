//EXPRESS ROUTER

const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Movie } = db;
const { faker } = require('@faker-js/faker')



app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api/movies', async(req, res, next)=> {
  try {
    res.send(await Movie.findAll());
  } 
  catch (ex) {
    next(ex);
  }
});


app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});


const init = async()=> {
  try {
    await db.conn.sync({ force: true });
    const name = await Promise.all(
      [faker.name.findName()].map(name => Movie.create({ name })));

      
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
