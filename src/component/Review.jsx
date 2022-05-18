import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
const Review = () => {
  const [GetUsers, setGetUsers] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      setGetUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    // console.log(GetUsers);

    onAuthStateChanged(auth, (currentUser) => {
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
              <h1>レビュー</h1>
              <div>
                {GetUsers.map((user) => (
                  <div key={user.id}>
                    <p>レビュワー:{user.name}</p>
                    <p>星:{user.stars}</p>
                    <p>雰囲気:{user.atmosphere}</p>
                    <p>どんな活動をしているか:{user.WhatDo}</p>
                    <p>教授の印象:{user.ProfesserImpression}</p>
                    <p>どのくらい忙しいか:{user.HowBusy}</p>
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
