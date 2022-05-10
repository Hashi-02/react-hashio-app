import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
const Post = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/`} />
          ) : (
            <>
              <h1>新規投稿</h1>
              <Link to={'/review'}>
                <button>レビューに戻る</button>
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Post;
