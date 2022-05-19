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
              <h1>研究室一覧</h1>
              <div>
                {labos.map((d, id) => (
                  <Link to={`/review/${d.Laboratory}`} key={id}>
                    <p>{d.Laboratory}ゼミ</p>
                  </Link>
                ))}
              </div>

              <h1>最新レビュー</h1>

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
              </div>

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
