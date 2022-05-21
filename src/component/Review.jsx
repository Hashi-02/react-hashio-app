import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
const Review = () => {
  const [labos, setLabos] = useState([]);
  const [GetUsers, setGetUsers] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    var unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      setGetUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    // console.log(GetUsers);
    const ProfessorCollectionRef = collection(db, 'seminar');
    unsub = onSnapshot(ProfessorCollectionRef, (querySnapshot) => {
      getDocs(ProfessorCollectionRef).then((querySnapshot) => {
        setLabos(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    });
    // console.log(unsub0);

    onAuthStateChanged(auth, (currentUser) => {
      const uids = auth.currentUser;
      localStorage.setItem('uid', uids.uid);
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser.photoURL);
    });
    return unsub;
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
              <div className="text-center mx-3">
                <p className="text-5xl my-5">研究室一覧</p>
                <button
                  onClick={logout}
                  className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-5 border border-yellow-500 hover:border-transparent rounded"
                >
                  ログアウト
                </button>
                <Link to={'/post'}>
                  <div className="text-5xl bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-6 w-full border border-yellow-500 hover:border-transparent rounded my-10">
                    <button>
                      <p>新規投稿する</p>
                    </button>
                  </div>
                </Link>
              </div>

              <div className="grid gap-4 text-center mx-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {labos.map((d, id) => (
                  <Link to={`/review/${d.Laboratory}`} key={id}>
                    <p className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 w-full border border-yellow-500 hover:border-transparent rounded">
                      {d.Laboratory}ゼミ
                    </p>
                  </Link>
                ))}
              </div>

              <div className="text-center mx-3">
                <Link to={'/post'}>
                  <div className="text-5xl bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-6 w-full border border-yellow-500 hover:border-transparent rounded my-10">
                    <button>
                      <p>新規投稿する</p>
                    </button>
                  </div>
                </Link>
              </div>

              {/* <h1>最新レビュー</h1>

              <div key={user.id}>
                {GetUsers.map((user, id) => (
                  <div key={id}>
                    <p>研究室:{user.selectLabo}</p>
                    <p>星:{user.stars}</p>
                    <p>雰囲気:{user.atmosphere}</p>
                    <p>どんな活動をしているか:{user.WhatDo}</p>
                    <p>教授の印象:{user.ProfesserImpression}</p>
                    <p>どのくらい忙しいか:{user.HowBusy}</p>
                    <p>レビュワー:{user.name}</p>
                    <br />
                  </div>
                ))}
              </div> */}

              {/* <h1>プロフィール</h1>
              <p>{user?.email}</p>
              <p>{user?.displayName}</p>
              <img src={user?.photoURL} alt="ユーザープロフィール画像" /> */}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Review;
