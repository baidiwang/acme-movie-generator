const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_movies_db');

const Movie = conn.define('movie', {
    name: {
        type: STRING
    },
    ranking: {
        type: INTEGER,
        defaultValue: 3
      }
});

Movie.addHook('beforeValidate', (movie) => {
    if (movie.rating < 1 || movie.rating > 5) {
        throw new Error ('Rating must be between 1 and 5');
    }
}); 


Movie.addHook('beforeUpdate', (movie) => {
    if (movie.rating < 1 || movie.rating > 5) {
        throw new Error ('Rating must be between 1 and 5');
    }
}); 



module.exports = {
    conn,
    Movie
}