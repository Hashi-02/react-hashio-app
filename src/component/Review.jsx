import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
const Review = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };
  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/`} />
          ) : (
            <>
              <h1>レビュー</h1>
              <h1>プロフィール</h1>
              <p>{user?.email}</p>
              <p>{user?.displayName}</p>
              <img src={user?.photoURL} alt="ユーザープロフィール画像" />

              <button onClick={logout}>ログアウト</button>
              <Link to={'/post'}>
                <button>新規投稿</button>
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Review;
