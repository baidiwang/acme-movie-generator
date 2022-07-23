import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';
// import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Movies from './Movies';
import setMovies from './store';


const root = createRoot(document.querySelector('#root'));

class _App extends Component {
    componentDidMount(){
        try{
            this.props.setMovies();
        }
        catch(ex){
            console.log(ex);
        }
    }
    render(){
        return (
            <div>
                Acme Movie Generator:
                <Movies />
            </div>
        )
    }
}

const mDtP = (dispatch) => {
    return {
        setMovies: () => {
            dispatch(setMovies());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const App = connect(mapStateToProps, mDtP)(_App);

root.render(<Provider store={ store }><App /></Provider>);