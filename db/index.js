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

module.exports = {
    conn,
    Movie
}