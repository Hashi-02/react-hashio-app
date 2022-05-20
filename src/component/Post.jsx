import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import { setDoc, doc, addDoc, getDoc } from 'firebase/firestore';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import * as Yup from 'yup';
const Post = () => {
  const [GetUsers, setGetUsers] = useState([]);
  const [labos, setLabos] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const UID = localStorage.getItem('uid');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    const ProfessorCollectionRef = collection(db, 'seminar');
    var unsub = onSnapshot(ProfessorCollectionRef, (querySnapshot) => {
      getDocs(ProfessorCollectionRef).then((querySnapshot) => {
        setLabos(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    });
    // const UserCollectionRef = doc(db, 'users', UID);
    // getDoc(UserCollectionRef).then((documentSnapshot) => {
    //   console.log('aaa:');
    //   console.log(documentSnapshot.data());
    //   setGetUsers(documentSnapshot.data());
    // });
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

    const usersCollectionRef = doc(db, 'users', UID);

    const documentRef = await setDoc(usersCollectionRef, {
      name: name.value,
      stars: stars.value,
      WhatDo: WhatDo.value,
      atmosphere: atmosphere.value,
      HowBusy: HowBusy.value,
      ProfesserImpression: ProfesserImpression.value,
      selectLabo: selectLabo.value,
      uid: UID,
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
  // const formik = useFormik(
  //   {
  //     enableReinitialize: true,
  //     initialValues: {
  //       name: GetUsers.name,
  //       selectLabo: GetUsers.selectLabo,
  //     },
  //     validationSchema: Yup.object({
  //       name: Yup.string().max(40).required('Required'),
  //     }),
  //     onSubmit: (values) => {
  //       console.log(values, null, 2);
  //     },
  //   },
  //   []
  // );

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/`} />
          ) : (
            <>
              {/* <>
                <h1>新規投稿</h1>
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="Labo">研究室名</label>
                  <select
                    name="selectLabo"
                    // value={labos.value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  >
                    <option id={'none'}>{GetUsers.selectLabo}</option>
                    {labosList}
                  </select>
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                  <br />

                  <label htmlFor="name">名前</label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                  <br />

                  <label htmlFor="stars">星</label>
                  <input
                    id="stars"
                    name="stars"
                    type="stars"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stars}
                  />
                  {formik.touched.stars && formik.errors.stars ? (
                    <div>{formik.errors.stars}</div>
                  ) : null}
                  <br />

                  <label htmlFor="WhatDo">どんな活動をしてるのか</label>
                  <input
                    id="WhatDo"
                    name="WhatDo"
                    type="WhatDo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.WhatDo}
                  />
                  {formik.touched.WhatDo && formik.errors.WhatDo ? (
                    <div>{formik.errors.WhatDo}</div>
                  ) : null}
                  <br />

                  <label htmlFor="atmosphere">雰囲気</label>
                  <input
                    id="atmosphere"
                    name="atmosphere"
                    type="atmosphere"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.atmosphere}
                  />
                  {formik.touched.atmosphere && formik.errors.atmosphere ? (
                    <div>{formik.errors.atmosphere}</div>
                  ) : null}
                  <br />

                  <label htmlFor="HowBusy">どのくらい忙しいか</label>
                  <input
                    id="HowBusy"
                    name="HowBusy"
                    type="HowBusy"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.HowBusy}
                  />
                  {formik.touched.HowBusy && formik.errors.HowBusy ? (
                    <div>{formik.errors.HowBusy}</div>
                  ) : null}
                  <br />

                  <label htmlFor="ProfesserImpression">教授の印象</label>
                  <input
                    id="ProfesserImpression"
                    name="ProfesserImpression"
                    type="ProfesserImpression"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ProfesserImpression}
                  />
                  {formik.touched.ProfesserImpression &&
                  formik.errors.ProfesserImpression ? (
                    <div>{formik.errors.ProfesserImpression}</div>
                  ) : null}
                  <br />

                  <button type="submit">Submit</button>
                </form>
              </> */}
              <div className="flex  flex-col px-16 py-8 h-screen text-center ">
                <h1 className="text-6xl my-3 mb-5">新規投稿</h1>

                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800">
                        研究室名
                      </label>

                      <select
                        name="selectLabo"
                        value={labos.value}
                        class="block p-2.5 w-full text-lg text-black-900 bg-yellow-50 rounded-lg border border-yellow-300 focus:ring-blue-500 focus:border-blue-500  dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-yellow-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      >
                        <option id={'none'}>所属ゼミ選択</option>
                        {labosList}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800">
                        投稿者名
                      </label>
                      <input
                        name="name"
                        type="text"
                        placeholder="名前"
                        class="block p-2.5 w-full text-lg text-black-900 bg-yellow-50 rounded-lg border border-yellow-300 focus:ring-blue-500 focus:border-blue-500  dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      />
                    </div>

                    <div>
                      <label>星</label>
                      <input name="stars" type="number" placeholder="星" />
                    </div>

                    <div>
                      <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800">
                        どんな活動をしてるのか
                      </label>
                      <textarea
                        name="WhatDo"
                        type="text"
                        placeholder="どんな活動をしてるのか"
                        rows="4"
                        class="block p-2.5 w-full text-lg text-black-900 bg-yellow-50 rounded-lg border border-yellow-300 focus:ring-blue-500 focus:border-blue-500  dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800">
                        雰囲気
                      </label>
                      <textarea
                        name="atmosphere"
                        type="text"
                        placeholder="雰囲気"
                        rows="4"
                        class="block p-2.5 w-full text-lg text-black-900 bg-yellow-50 rounded-lg border border-yellow-300 focus:ring-blue-500 focus:border-blue-500  dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800">
                        どのくらい忙しいか
                      </label>
                      <textarea
                        name="HowBusy"
                        type="text"
                        placeholder="どのくらい忙しいか"
                        rows="4"
                        class="block p-2.5 w-full text-lg text-black-900 bg-yellow-50 rounded-lg border border-yellow-300 focus:ring-blue-500 focus:border-blue-500  dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800">
                        教授の印象
                      </label>
                      <textarea
                        name="ProfesserImpression"
                        type="text"
                        placeholder="教授の印象"
                        rows="4"
                        class="block p-2.5 w-full text-lg text-black-900 bg-yellow-50 rounded-lg border border-yellow-300 focus:ring-blue-500 focus:border-blue-500  dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                      />
                    </div>

                    <div>
                      <button className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 w-full border border-yellow-500 hover:border-transparent rounded mb-5">
                        登録
                      </button>
                    </div>
                  </form>
                </div>

                <Link to={'/review'}>
                  <button className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-3 w-full border border-yellow-500 hover:border-transparent rounded my-3 mb-9">
                    レビューに戻る
                  </button>
                </Link>

                <h2 className="text-5xl my-3">ゼミ追加</h2>

                <div>
                  <form onSubmit={handleSubmit2}>
                    <div>
                      <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800">
                        Laboratory
                      </label>
                      <input
                        name="Laboratory"
                        type="text"
                        placeholder="Laboratory"
                        class="block p-2.5 w-full text-lg text-black-900 bg-yellow-50 rounded-lg border border-yellow-300 focus:ring-blue-500 focus:border-blue-500  dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <button className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 w-full border border-yellow-500 hover:border-transparent rounded my-4 mb-5">
                        登録
                      </button>
                    </div>
                  </form>
                </div>
                <Link to={'/review'}>
                  <button className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-3 w-full border border-yellow-500 hover:border-transparent rounded my-3 mb-9">
                    レビューに戻る
                  </button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Post;
