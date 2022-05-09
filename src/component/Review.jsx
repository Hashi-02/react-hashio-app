import { Link } from 'react-router-dom';
const Review = () => {
  return (
    <div>
      <h1>レビュー</h1>

      <Link to={'/'}>
        <button>ログアウト</button>
      </Link>
      <Link to={'/post'}>
        <button>新規投稿</button>
      </Link>
    </div>
  );
};

export default Review;
