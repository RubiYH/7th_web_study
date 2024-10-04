import "./App.css";
import { MOVIES } from "./mocks/movies";

export default function App() {
  return (
    <div className="main">
      {MOVIES.results?.map((movie) => (
        <div key={movie?.id} className="card">
          <img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} />
        </div>
      ))}
    </div>
  );
}
