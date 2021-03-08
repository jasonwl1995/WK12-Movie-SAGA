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

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES'
    });
  }, []);

  return (
    <div>
      <h3>Add a Movie</h3>
      <form onSubmit={addMovie}>
        <label htmlFor="movieTitle">Movie Title:</label>
        <input
        name="movieTitle"
        type="text"
        placeholder="Movie Title"
        value={movieTitle}
        onChange={(evt) => setMovieTitle(evt.target.value)}
        />

        <label htmlFor="moviePoster">Movie Poster URL:</label>
        <input
        name="moviePoster"
        type="text"
        placeholder="Movie Poster URL"
        value={moviePoster}
        onChange={(evt) => setMoviePoster(evt.target.value)}
        />

        <label htmlFor="movieDescription">Movie Description:</label>
        <input
        name="movieDescription"
        type="textarea"
        placeholder="Movie Title"
        value={movieTitle}
        onChange={(evt) => setMovieTitle(evt.target.value)}
        />

        <input
        type="textarea"
        placeholder="Movie Description..."
        />

      </form>
    </div>
  );
}

export default MovieAddPage;