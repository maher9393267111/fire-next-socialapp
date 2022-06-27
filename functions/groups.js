
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
    console.group("Dashboard useEffect read firestore data: ");

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      arr.push({ id: doc.id, ...doc.data() });
    });

  
    return arr;
  }