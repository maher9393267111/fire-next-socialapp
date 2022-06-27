
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
    arrayUnion,
    addDoc,
    deleteDoc,
} from "firebase/firestore";

import {
    getDownloadURL,
    ref,
    uploadString,
    getStorage,
    uploadBytes,
    deleteObject,
  } from "firebase/storage";


import { db,storage } from '../firebase'
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";


 export  async function GroupsList() {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "Groups"));
  // console.group("Dashboard useEffect read firestore data: ");

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      arr.push({ uid: doc.id, ...doc.data() });
   //   console.log(doc.id, " => in function page 👉️👉️👉️👉️", doc.data());
//   console.log( " => in function page 👉️👉️👉️👉️", arr);
    });

  
    return arr;
  }




  // update a category

export const updateGroup = async (groupid, groupdata) => {
  console.log('groupdata---🚀🚀🚀🚀', groupid,groupdata);
 
  const categoryDoc = doc(db, 'Groups', groupid);
 
await updateDoc(categoryDoc, groupdata);


}



// specefic group data  single group

  export const getGroup = async (groupid) => {

    try {

      const groupDoc = doc(db, 'Groups', groupid);
      const group = await getDoc(groupDoc);
      console.log('groupdata---🚀🚀🚀🚀', group.data());

      return group.data();


    }
    catch (error) {
      toast.error(error.message);
    }

  }



  // delete a group

  export const deleteGroup = async (groupid) => {
    console.log('groupid--⚡⚡⚡⚡⚡⚡⚡⚡', groupid);

const groupDoc = doc(db, 'Groups', groupid);
await deleteDoc(groupDoc);




  }
