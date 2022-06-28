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
  serverTimestamp
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadString,
  getStorage,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";

export async function GroupsList() {
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
  console.log("groupdata---🚀🚀🚀🚀", groupid, groupdata);

  const categoryDoc = doc(db, "Groups", groupid);

  await updateDoc(categoryDoc, groupdata);
};

// specefic group data  single group

export const getGroup = async (groupid) => {
  try {
    const groupDoc = doc(db, "Groups", groupid);
    const group = await getDoc(groupDoc);
    console.log("groupdata---🚀🚀🚀🚀", group.data());

    return group.data();
  } catch (error) {
    toast.error(error.message);
  }
};

// delete a group

export const deleteGroup = async (groupdata, groupid) => {
  console.log("groupid--⚡⚡⚡⚡⚡⚡⚡⚡", groupid);

  // delete old image from storage

  console.log("groupdata- ☢️  ☢️  ☢️ ", groupdata.text);

  const desertRef = ref(storage, `groups/${groupdata?.text}/image`);
  deleteObject(desertRef)
    .then(() => {
      toast.success("Image Deleted");
    })
    .catch((error) => {
      console.log("Uh-oh, an error occurred!");
      toast.error(error.message);
    });

  const groupDoc = doc(db, "Groups", groupid);
  await deleteDoc(groupDoc);
};


// add users to group





export const addUserToGroup2 = async (groupid, userdata) => {


try{

  // add users collection to group collection


  const docRef = doc(db, "Groups", groupid);  // add suer collection to thid do
  const colRef = collection(docRef, 'groupUsers',`${userdata.id}`) // add user to this Sub-collection
  addDoc(colRef, {

    name: userdata.name,
    email: userdata.email,
    image: userdata.image,
    id: userdata.id,
    createdAt: serverTimestamp(),



  }).then(() => {

    toast.success("User Added");
  })










}
catch(error){
  toast.error(error.message);

}


}



export const addUserToGroup = async (groupid, userdata) => {


  try{
  
    // add users collection to group collection
  
    await setDoc(doc(db, "Groups", groupid, 'groupUsers',userdata?.email), {

name: userdata.name,
email: userdata.email,
image: userdata.image,
id: userdata.id,
createdAt: serverTimestamp(),


    }).then(() => {
  
      toast.success("User Added");
    })
  
  
  
  
  
  
  }
  catch(error){
    toast.error(error.message);
  
  }
  
  
  }