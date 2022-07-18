// Sequelize part


// const Sequelize = require('sequelize');
// const { STRING } = Sequelize;
// const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_colors_db');

// const Color = conn.define('color', {
//   name: {
//     type: STRING,
//     unique: true,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   }
// });




//EXPRESS ROUTER

const express = require('express');
const app = express();
const path = require('path');



app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});


const init = async()=> {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
