import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function MovieDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const movieId = params;

  // data from redux
  const details = useSelector(store => store.details);

  // on load, get(fetch)
  // Display details on the page
  useEffect(() => {
    dispatch({
      type: 'FETCH_DETAILS',
      payload: movieId,
    });
  }, []);

  return (
    <div>
      <h2>{movie.title}</h2>
      <img scr={movie.poster} alt={movie.title} />
      <p>{movie.description}</p>
      <span>
        {movie.genre.map((genre) => {
          return (
            <p>{genre + ', '}</p>
          );
        })}
      </span>

      <button onClick={() => history.push('/')}>Back to Home</button>
    </div>
  );
}

export default MovieDetailPage;