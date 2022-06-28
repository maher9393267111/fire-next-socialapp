
import React from "react";
import Link from "next/link";


import { useCollectionData ,useDocumentData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {  } from "../../functions/groups";
import { } from "../../store/reduxglobal";
import { useDispatch } from "react-redux";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useAuth } from "../../context/global";
import { message } from "antd";



const Post = () => {

const { userinfo } = useAuth();
const router = useRouter();
const { postid } = router.query;
console.log(postid);


// const q = query(
//     collection(db, "chats", id, "messages"),
//     orderBy("timestamp")
//   );
 // const [messages, loading] = useCollectionData(q);
 // const [post] = useDocumentData(doc(db, "posts", postid));
const [post, setPost] = useState({});


const fethPost = async () => {
    const groupRef = doc(db, "posts", postid);
    const postr = await getDoc(groupRef);

    await setPost({ id: postid, ...postr.data() });

    // const userin = await getDocs(
    //   collection(db, "Groups", groupid, "groupUsers")
    // );


  };



  useEffect(() => {
    if (postid ) {
      fethPost() }
  }, [db, postid, ]);






    return (
      <div>
        post id
        {post?.text}
      </div>
    );
}

export default Post;
