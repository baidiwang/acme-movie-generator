import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';


const initialState = {
    movies: []
};

const movieReducer = ( state = [], action) => {
    if(action.type ==='CREATE_MOVIE') {
        return [...state, action.movie];
}
    if(action.type ==='DELETE_MOVIE') {
        return state.filter( movie => movie.id !== action.movie.id)
    }
    if(action.type ==='UPDATE_MOVIE') {
        return state.map( movie => movie.id !== action.movie.id? movie : action.movie )
    }
    if(action.type ==='SET_MOVIES') {
        return action.movies;
    }
    return state
};

const reducer = combineReducers({
    movies: movieReducer
});

const store = createStore( reducer, applyMiddleware(thunk, logger));

const setMovies = () => {
    return async(dispatch) => {
       const movies = (await axios.get('/api/movies')).data;
       dispatch({ type: 'SET_MOVIES', movies });
    }
}

const createMovie = (movie) => {
    return async(dispatch) => {
        movie =  (await axios.post('/api/movies', movie)).data;
        dispatch({ type: 'CREATE_MOVIE', movie });
    }
}

const updateMovie = (movie) => {
    return async(dispatch) => {
        movie = (await axios.put(`/api/movies/${movie.id}`, movie)).data;
        dispatch({ type: 'UPDATE_MOVIE', movie });
    }
}

const deleteMovie = (movie) => {
    return async(dispatch) => {
        await axios.delete(`/api/movies/${movie.id}`);
        dispatch({ type: 'DELETE_MOVIE', movie });
    }
}

export{ setMovies, deleteMovie, createMovie, updateMovie }; 
export default store; 