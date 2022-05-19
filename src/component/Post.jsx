import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import { setDoc, doc, addDoc } from 'firebase/firestore';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
const Post = () => {
  const [labos, setLabos] = useState([]);
  const [user, setUser] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ProfessorCollectionRef = collection(db, 'seminar');
    const unsub = onSnapshot(ProfessorCollectionRef, (querySnapshot) => {
      getDocs(ProfessorCollectionRef).then((querySnapshot) => {
        setLabos(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    });

    onAuthStateChanged(auth, (currentUser) => {
      const uids = auth.currentUser;
      setUid(uids.uid);
      setUser(currentUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      name,
      stars,
      WhatDo,
      atmosphere,
      HowBusy,
      ProfesserImpression,
      selectLabo,
    } = event.target.elements;
    console.log(
      name.value,
      stars.value,
      WhatDo.value,
      atmosphere.value,
      HowBusy.value,
      ProfesserImpression.value,
      selectLabo.value
    );

    const usersCollectionRef = doc(db, 'users', uid);

    const documentRef = await setDoc(usersCollectionRef, {
      name: name.value,
      stars: stars.value,
      WhatDo: WhatDo.value,
      atmosphere: atmosphere.value,
      HowBusy: HowBusy.value,
      ProfesserImpression: ProfesserImpression.value,
      selectLabo: selectLabo.value,
      uid: uid,
    });

    console.log(documentRef);
  };

  const labosList = labos.map((value, idx) => (
    <option key={idx} value={value.Laboratory} text={value.Laboratory}>
      {value.Laboratory}
    </option>
  ));

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    const { Laboratory } = event.target.elements;
    console.log(Laboratory.value);

    const documentRef2 = addDoc(collection(db, 'seminar'), {
      Laboratory: Laboratory.value,
    });

    console.log(documentRef2);
  };

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/`} />
          ) : (
            <>
              <h1>新規投稿</h1>

              <div style={{ margin: '50px' }}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>研究室名</label>
                    <select name="selectLabo" value={labos.value}>
                      <option id={'none'}>Please select</option>
                      {labosList}
                    </select>
                  </div>

                  <div>
                    <label>名前</label>
                    <input name="name" type="text" placeholder="名前" />
                  </div>

                  <div>
                    <label>星</label>
                    <input name="stars" type="number" placeholder="星" />
                  </div>

                  <div>
                    <label>どんな活動をしてるのか</label>
                    <input
                      name="WhatDo"
                      type="text"
                      placeholder="どんな活動をしてるのか"
                    />
                  </div>

                  <div>
                    <label>雰囲気</label>
                    <input name="atmosphere" type="text" placeholder="雰囲気" />
                  </div>

                  <div>
                    <label>どのくらい忙しいか</label>
                    <input
                      name="HowBusy"
                      type="text"
                      placeholder="どのくらい忙しいか"
                    />
                  </div>

                  <div>
                    <label>教授の印象</label>
                    <input
                      name="ProfesserImpression"
                      type="text"
                      placeholder="教授の印象"
                    />
                  </div>

                  <div>
                    <button>登録</button>
                  </div>
                </form>
              </div>

              <Link to={'/review'}>
                <button>レビューに戻る</button>
              </Link>

              <h1>新規投稿</h1>

              <div style={{ margin: '50px' }}>
                <form onSubmit={handleSubmit2}>
                  <div>
                    <label>Laboratory</label>
                    <input
                      name="Laboratory"
                      type="text"
                      placeholder="Laboratory"
                    />
                  </div>
                  <div>
                    <button>登録</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Post;
