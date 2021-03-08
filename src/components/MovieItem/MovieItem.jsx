import {useHistory } from 'react-router-dom';

function MovieItem({details}) {
  const history = useHistory();

  const detailPage = () => {
    history.push(`/details/${movie.id}`);
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      
    </div>
  )
}