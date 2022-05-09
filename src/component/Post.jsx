import { Link } from 'react-router-dom';
const Post = () => {
  return (
    <div>
      <h1>新規投稿</h1>
      <Link to={'/Review'}>
        <button>レビューに戻る</button>
      </Link>
    </div>
  );
};

export default Post;
