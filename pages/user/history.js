import React from 'react';
import { useAuth } from '../../context/global';
import {useState,useEffect} from 'react';
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

const History = () => {

const {userinfo} = useAuth();
const [usergroups,setUsergroups] = useState([]);
const [userposts,setUserposts] = useState([]);

//console.log("userinfo-------->",userinfo?.id);


const fethGroup = async () => {
  
console.log("----💎💎💎---->",);

    const q = query(
        collection(db, "Users", userinfo.id, "userGroups"),
     //   orderBy("timestamp", "desc")
      );
      let groupsArray = [];
  
    onSnapshot(q, (QuerySnapshot) => {
       
        QuerySnapshot.forEach((doc) => {
            groupsArray.push({ ...doc.data(), id: doc.id });
          console.log("Groups array☢️☢️☢️--->", groupsArray );
          setUsergroups( groupsArray );
        });
      });

   

// fetch user posts from posts collection



const q2 = query(
    collection(db, "posts"),
    orderBy("timestamp", "desc"),
    where("userid", "==", userinfo.id) 
  );

  const unsub = onSnapshot(q2, (QuerySnapshot) => {
    let postsArray = [];
    QuerySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
        console.log("Posts array☢️☢️☢️--->", postsArray );
      setUserposts(postsArray);
    });
  });


  






  };





useEffect(()=>{

    if ( userinfo.id) {
console.log("userinfo-------->");
    fethGroup();
    }

},[db,userinfo.id]);


    return (
        <div>
            History {userinfo.name}
    {usergroups?.length}
    {userposts?.length}
        </div>
    );
}

export default History;
