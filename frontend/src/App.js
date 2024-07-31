import Search from './components/Search';
import HomeExpress from './components/HomeExpress';
import AddMovieForm from './components/AddMovieForm';
import UpdateMovie from './components/UpdateMovie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomeExpress />} />
        <Route path="/form" element={<AddMovieForm />} />
        <Route path="/movies/:id" element={<UpdateMovie/>} />
{/* //  <Search/> */}
      </Routes>
  </Router>
  );
}

export default App;
