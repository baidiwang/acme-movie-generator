import { createRoot } from 'react-dom/movies';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import sotre, { fetchMovies } from './store';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';




const root = createRoot(document.querySelector('#root'));
root.render(<hr />);
