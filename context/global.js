import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendSignInLinkToEmail,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
  where,
  FieldPath,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setGroupUsers,   setGroupPosts,  setUserGroups } from "../store/reduxglobal";
import {toast} from 'react-toastify';
const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentuser, setUser] = useState({});
  const [userinfo, setUserinfo] = useState({});
  const [groupid_upate, setGroupid_update] = useState("");
  const dispatch = useDispatch();

  const signUp = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);

    console.log("signUp--------->⚡⚡⚡⚡", email, password, name);

    await updateProfile(auth.currentUser, {
      displayName: name,

      photoURL:
        "https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-256.png",
    });

    await setDoc(doc(db, "Users", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: password,

      cart: [],
      rezerv: [],
      totalprice: 0,
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {

      toast.success("Successfully Signed In");
    })
    .catch(error => {
      toast.error(error.message);
    })
  };

  //------- reguister and login

  //--- Sign in with google ---

  // sign with google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    // add the user to the users collection

    await setDoc(doc(db, "Users", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: "",

      cart: [],
      rezerv: [],
      totalprice: 0,
    });
  };

  // signout

  const logout = () => {
    console.log("logout");
    setUser({});
    setUserinfo({});
    signOut(auth);
  };

  //------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const fetchuser = async () => {
          const userinfo = await getDoc(doc(db, "Users", user.email));
          setUserinfo({ id: userinfo.id, ...userinfo.data() });
        };

        fetchuser();
      }
    });

    return unsubscribe;
  }, [auth]);

  // ----modal

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ----modal End




    const getPostsInGroup = async (groupid) => {
    
    
      const q = query(collection(db, "posts"), where("groupid", "==", groupid));
      const unsub = onSnapshot(q, (QuerySnapshot) => {
        let postsArray = [];
        QuerySnapshot.forEach((doc) => {
          postsArray.push({ ...doc.data(), id: doc.id });
        });
        console.log("from vivek", postsArray);
        dispatch(setGroupPosts(postsArray));
       // setTodos(postsArray);
      });

      return unsub;
      // const data = await getDocs(userCollectionRef);
      // setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
 



    const getUserGroups = async (userid) => {
    
    //  where("userid", "==", userid))
      const q = query(collection(db, "Users",userid, 'userGroups'))
      const unsub = onSnapshot(q, (QuerySnapshot) => {
        let postsArray = [];
        QuerySnapshot.forEach((doc) => {
          postsArray.push({ ...doc.data(), id: doc.id });
        });
        console.log("user posts fetched-->>>>", postsArray);
        dispatch(setUserGroups(postsArray));
       // setTodos(postsArray);
      });

      return unsub;
      // const data = await getDocs(userCollectionRef);
      // setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };



    







  const value = {
    signUp,
    signIn,
    logout,

    currentuser,
    userinfo,

    isModalVisible,
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel,
    groupid_upate,
    setGroupid_update,
    getPostsInGroup,
    getUserGroups
  
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
