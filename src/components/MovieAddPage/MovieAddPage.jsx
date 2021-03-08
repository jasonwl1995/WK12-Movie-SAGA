import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MovieAddPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  //Global Store
  const genres = useSelector(store => store.genres);

  //Local Store
  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieGenre, setMovieGenre] = useState('');



  return (
    <div id="banner">
      <h1>The Movies Saga!</h1>
      <nav>
        <span>
          <Link to="/" className="navigation">
            Movies
          </Link>
        </span>
        <span>
          <Link to="/addMovie" className="navigation">
            Add a Movie
          </Link>
        </span>
      </nav>
    </div>
  );
}

export default MovieAddPage;