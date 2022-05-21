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
      <div className="text-center mx-3">
        <p className="text-4xl m-5">{professer.id}ゼミレビュー一覧</p>

        <div className="grid  gap-4 text-center mx-3 my-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {GetUsers.map((user, id) => (
            <div
              key={id}
              class="block p-6 max-w-sm bg-white rounded-lg border border-yellow-200 shadow-md  dark:bg-black-800 dark:border-yellow-700 "
            >
              <div class="mb-2 text-2xl font-bold tracking-tight text-black-900 dark:text-black">
                <p>{user.easyExplanation}</p>
              </div>
              <div class="font-normal text-gray-900 dark:text-gray-900">
                <p>星:{user.stars}</p>
                <p>雰囲気:{user.atmosphere}</p>
                <p>どんな活動をしているか:{user.WhatDo}</p>
                <p>教授の印象:{user.ProfesserImpression}</p>
                <p>どのくらい忙しいか:{user.HowBusy}</p>
                <p>レビュワー:{user.name}</p>

                <br />
              </div>
            </div>
          ))}
        </div>

        <div>
          <Link to={`/review`}>
            <div className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-5 border border-yellow-500 hover:border-transparent rounded">
              <button>もどる</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
