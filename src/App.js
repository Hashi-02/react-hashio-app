import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Review from './component/Review';
import Post from './component/Post';
import NotFound from './component/NotFound';
import DetailPage from './component/DetailPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/Review'} element={<Review />} />
          <Route path={'/Post'} element={<Post />} />
          <Route path={`/review/:id`} element={<DetailPage />} />
          <Route path={`*`} element={<NotFound />} />
          {/* <Route path={'/Detail'} element={<Detail />} />
        <Route path={'/Edit'} element={<Edit />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
