import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Review from './component/Review';
import Post from './component/Post';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/Review'} element={<Review />} />
          <Route path={'/Post'} element={<Post />} />
          {/* <Route path={'/Detail'} element={<Detail />} />
        <Route path={'/Edit'} element={<Edit />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
