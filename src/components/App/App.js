import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

// IMPORT COMPONENTS
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import MovieAddPage from '../MovieAddPage/MovieAddPage';
import MovieDetailPage from '../MovieDetailPage/MovieDetailPage';


function App(props) {
  return (
    <div className="App">
      <Router>        
      <Header />

        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details/:id" exact>
          <MovieDetailPage />
        </Route>
        {/* Add Movie page */}
        <Route path="/addMovie">
          <MovieAddPage />
        </Route>

      </Router>
    </div>
  );
}


export default App;
