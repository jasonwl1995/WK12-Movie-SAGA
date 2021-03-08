import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('FETCH_DETAILS', fetchMovieDetails);
    yield takeEvery('ADD_MOVIE', addMovie)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all movies:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
} // end fetchAllMovies

function* fetchAllGenres() {
  // get all genres from the DB
  try {
      const genres = yield axios.get('/api/genre');
      console.log('get all genre:', genres.data);
      yield put({ 
        type: 'SET_GENRES',
        payload: genres.data,
      });
  } catch(err) {
      console.log('Get Genre Error', err);
  }
} // end fetchAllGenres

// try {
//   let response = yield axios.get('/api/favorite');
//   yield put({
//     type: 'SET_FAVORITES',
//     payload: response.data,
//   });
// } catch (err) {
//   console.log('fetch error', err);
// }
// }

function* fetchMovieDetails(action) {
  // get movie details from the DB
  try {
    console.log('get details:', action);
      const details = yield axios.get(`/api/movie/${action.payload.id}`);
      console.log('get details:', details.data);
      yield put({ 
        type: 'SET_DETAILS',
        payload: details.data,
      });
  } catch(err) {
      console.log('Get Details Error', err);
  }
} // end fetchMovieDetails

function* addMovie(action) {
  // POST new Movie to DB
  try {
      yield axios.post(`/api/movie/`, action.payload);
      console.log('In addMovie:', action.payload);
      yield put({ 
        type: 'FETCH_MOVIES',
      });
  } catch(err) {
      console.log('Adding new movie to DB error', err);
  }
} // end addMovie

// function* addFavorite(action) {
//   console.log('in addFavorite', action.payload);

//   // post favorite to database
//   try {
//     yield axios.post(`/api/favorite/`, action.payload); // this is the url from the user clicking the fav button.

//     // update favoriteReducer
//     yield put({
//       // put is dispatching the information to be grabbed by whoever.
//       type: 'FETCH_FAVORITES', // this is being caught by RootSaga which is then being sent to function fetchFavorites()
//     });
//   } catch (err) {
//     console.log('Error in Fav post', err);
//   }
// } // end addFavorite

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


// - - - - REDUCERS - - - -

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the chosen movie details from server
const details = (state = {}, action) => {
  switch (action.type) {
      case 'SET_DETAILS':
          return action.payload;
      default:
          return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
