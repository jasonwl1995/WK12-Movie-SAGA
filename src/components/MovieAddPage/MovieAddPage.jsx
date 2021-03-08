import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useHistory, Link } from 'react-router-dom';

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


  const addMovie = (evt) => {
    evt.preventDefault();
    console.log('addmovie log', movieGenre);
    dispatch({
      type: 'ADD_MOVIE',
      payload: {
        title: movieTitle,
        poster: moviePoster,
        description: movieDescription,
        genre_id: movieGenre,
      }
    })
    history.push('/');
  };

  return (
    <div>
      <h3>Add a Movie</h3>
      <form onSubmit={addMovie}>
        <table>
          <tr>
            <td>
              <label htmlFor="movieTitle">Movie Title: </label>
            </td>
            <td>
              <input
              name="movieTitle"
              type="text"
              placeholder="Movie Title"
              value={movieTitle}
              onChange={(evt) => setMovieTitle(evt.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="moviePoster">Movie Poster URL: </label>
            </td>
            <td>
              <input
              name="moviePoster"
              type="text"
              placeholder="Movie Poster URL"
              value={moviePoster}
              onChange={(evt) => setMoviePoster(evt.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="movieDescription">Movie Description: </label>
            </td>
            <td>
              <textarea
              name="movieDescription"
              placeholder="Movie Description:"
              value={movieDescription}
              onChange={(evt) => setMovieDescription(evt.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="movieGenre">Select Genre: </label>
            </td>
            <td>
              <select 
                name="movieGenre" 
                placeholder="--- Genres ---"
                value={movieGenre}
                onChange={(evt) => setMovieGenre(evt.target.value)}
              >
                {genres.map((genre, i) => {
                  return (
                    <option key={i} value={genre.id}>{genre.name}</option>
                  )
                })};
              </select>
            </td>
          </tr>

          <tr>
            <td>
              <input type="submit" value="Save" />
            </td>
            <td>
              <Link to="/">Cancel</Link>
            </td>
          </tr>

        </table>
      </form>

    </div>
  );
}

export default MovieAddPage;