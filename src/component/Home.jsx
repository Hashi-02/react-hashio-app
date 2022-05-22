import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import homeImage from '../images/home.png';

const Home = () => {
  const [loading, setLoading] = React.useState('');
  const handleGoogleSubmit = async (e) => {
    setLoading('True');
    e.preventDefault();
    try {
      await signInWithRedirect(auth, provider);
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
            {!loading ? (
              <div className="flex place-content-center px-16 py-8 h-screen ">
                <div className="flex-1 self-center">
                  <p className="text-6xl mb-8">はしをくんについて</p>
                  <p className="text-2xl mb-10">
                    はしをくんは関西大学総合情報学部のゼミの情報を
                    <br />
                    共有できるサービスです。
                    <br />
                    コロナ禍でもゼミの情報を多くの後輩へ共有できる。
                    <br />
                    そんなことを実現できるのがはしをくんです。
                    <br />
                  </p>
                  <div className="flex justify-center ">
                    <button
                      className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 w-full border border-yellow-500 hover:border-transparent rounded"
                      onClick={handleGoogleSubmit}
                    >
                      Googleアカウントでログインする
                    </button>
                  </div>
                </div>
                <div className="flex-1 self-center">
                  <img src={homeImage} alt="" class="hidden md:inline-block" />
                </div>
              </div>
            ) : (
              <p>Loading</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
