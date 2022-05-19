import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1>お探しのページは見つかりませんでした。</h1>
      <Link to={`/`}>ホームに戻る</Link>
    </>
  );
};
export default NotFound;
