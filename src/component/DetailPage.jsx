import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const DetailPage = () => {
  const professer = useParams();
  const [GetUsers, setGetUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = query(
      collection(db, 'users'),
      where('selectLabo', '==', professer.id)
    );
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      setGetUsers(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    // console.log('aaa');
    // console.log(GetUsers);
    return unsub;
  }, [professer.id]);

  return (
    <div>
      <div>
        <p>教授名:{professer.id}</p>
        <div>
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
        <Link to={`/review`}>もどる</Link>
      </div>
    </div>
  );
};

export default DetailPage;
