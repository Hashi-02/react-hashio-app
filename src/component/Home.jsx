import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';

const Home = () => {
  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert('メールアドレスまたはパスワードが間違っています');
    }
  };
  const [user, setUser] = useState('');
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return (
    <>
      {user ? (
        <Navigate to={`/review`} />
      ) : (
        <>
          <div>
            <h1>ホームページ</h1>
            <button onClick={handleGoogleSubmit}>Googleログイン</button>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
