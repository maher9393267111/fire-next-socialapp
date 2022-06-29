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
      let commentsArray = [];
  
    onSnapshot(q, (QuerySnapshot) => {
       
        QuerySnapshot.forEach((doc) => {
          commentsArray.push({ ...doc.data(), id: doc.id });
          console.log("groups array--->",commentsArray);
          setUsergroups(commentsArray);
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
        </div>
    );
}

export default History;
