import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
const Review = () => {
  const [labos, setLabos] = useState([]);

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ProfessorCollectionRef = collection(db, 'seminar');
    var unsub = onSnapshot(ProfessorCollectionRef, (querySnapshot) => {
      getDocs(ProfessorCollectionRef).then((querySnapshot) => {
        setLabos(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    });

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
            </>
          )}
        </>
      )}
    </>
  );
};

export default Review;
