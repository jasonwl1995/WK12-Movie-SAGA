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

  console.log( "details", details);
  return (
    <div>
      <h2>{details.title}</h2>
      <img src={details.poster} alt={details.title} />
      <p>{details.description}</p>
      
      {details.array_agg ? (
      <span>
        {details.array_agg.map((genre) => {
          return (
            <p>{genre}</p>
          );
        })}
      </span>
      ) : (
        <div></div>
      )}

      <button onClick = {() => history.push('/')}>Back to Home</button>
    </div>
  );
}

export default MovieDetailPage;