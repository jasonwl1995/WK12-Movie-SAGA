import { Link } from 'react-router-dom';
import './Header.css';
//Taken from Group Project Giphy SAGA

function Header() {
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

export default Header;