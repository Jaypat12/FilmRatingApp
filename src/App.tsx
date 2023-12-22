import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { Movie } from "./pages/movie";
import { TvShow } from "./pages/tvshow";
import { Rated } from "./pages/rating";
import { Upcoming } from "./pages/upcoming";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/rating" element={<Rated />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshow/:id" element={<TvShow />} />
          <Route path="/upcoming" element={<Upcoming />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
