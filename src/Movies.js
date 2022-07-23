import React from 'react';
import { connect } from 'react-redux';
import { createMovie, updateMovie, deleteMovie } from './store';
import { faker } from '@faker-js/faker';

const Movies = ({ movies, increment, createMovie, deleteMovie}) => {
    return (
        <div>
            The average rating is: {(movies.reduce((a,b) => a + b.rating, 0)/movies.length)};
            <button onClick = {createMovie}>Create A New Movie</button>
        <ul>
            {
                movies.map( movie => {
                    return (
                        <li key = {movie.id}>
                            <button onClick={()=> deleteMovie(movie)}>X</button>
                            {movie.name} ({movie.rating}) 
                            <button onClick={()=> increment(movie, -1)}> - </button>
                            <button onClick={()=> increment(movie, +1)}> + </button>
                        </li>
                    )
                })     
            }
        </ul>
     </div>
    )
}

const myStateMovies = (state) => {
    return {
        movies: state.movies
    }
}

const myStateDispatch = (dispatch) => {
    return {
        createMovie: () => {
            dispatch(createMovie({name: faker.company.catchPhrase()}));
        },
        deleteMovie: (movie) => {
            dispatch(deleteMovie(movie));
        },
        increment: (movie, dir) => {
            movie = {...movie, rating: movie.rating + dir};
            dispatch(updateMovie(movie));
        }
    }
}

export defalut conncet(myStateMovies, myStateDispatch)(Movies);
