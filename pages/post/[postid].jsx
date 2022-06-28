
import React from "react";
import Link from "next/link";


import { useCollectionData } from "react-firebase-hooks/firestore";
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


    return (
      <div>
        post id
        {postid}
      </div>
    );
}

export default Post;
