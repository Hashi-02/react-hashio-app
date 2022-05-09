import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <h1>ホームページ</h1>

      <Link to={'/Review'}>
        <button>ログイン</button>
      </Link>
    </div>
  );
};

export default Home;
