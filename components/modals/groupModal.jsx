import React from 'react';
import ModalLayout from './Modal';
import { useAuth } from '../../context/global';
import {useEffect,useState,useRef} from 'react';
import { toast } from 'react-toastify';
import  {getGroup} from '../../functions/groups';
import { db, storage } from "../../firebase";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString,deleteObject } from "firebase/storage";

const GroupModal = () => {




const {groupid_upate} = useAuth();

const [group,setGroup] = useState({});


useEffect(() => {


    if (groupid_upate) {

    getGroup(groupid_upate)
    .then((res) => {
        console.log('res in Modal ---👉️👉️👉️👉️👉️👉️',res);
        setGroup(res);
    }
    )
}

}, [groupid_upate]);


const [input, setInput] = useState("");
const [selectedFile, setSelectedFile] = useState(null);
const [loading, setLoading] = useState(false);
const filePickerRef = useRef(null);




const sendPost = async () => {
    if (loading) return;
    setLoading(true);

  
  


//-----------------------------------------------------//

const desertRef = ref(storage, `groups/${group.text}/image`);
deleteObject(desertRef)
    .then(() => {toast.success('Image Deleted')})
    .catch((error) => {
        console.log("Uh-oh, an error occurred!");
        toast.error(error.message);
    }
    )





//-----------------------------------------------------//










    //const imageRef = ref(storage, `groups/${docRef.id}/image`);

    if (selectedFile) {

// delete old image from storage delete object method




const imageRef = ref(storage, `groups/${groupid_upate}/image`);

      // Upload image as url to storage then send it to current user's post doc as update
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "Groups", groupid_upate), {
          image: downloadURL,
          text: input,

        });
      });

   // } )

// --end here




    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };








    return (
        <div>

<ModalLayout  title=' Update group modal'>

 {/* {groupid_upate} */}

 {group?.text}

 <div className="flex border-b w-[300px] mx-auto text-center border-gray-200 p-3 space-x-3">
            {/* <img onClick={signOut} className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" src={session.user.image} alt="user-img" referrerPolicy="no-referrer"/> */}
            <div className="w-full divide-y divide-gray-200">
                <div className="">
                    <textarea className="w-full border-2 focus:ring-0 text-lg placeholderbg-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="What`s happening"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}></textarea>
                </div>
                {selectedFile && (
                    <div className="relative">
                        <XIcon onClick={() => setSelectedFile(null)} className="border h-7 text-black absolute cursor-pointer shadow-lg border-white m-1 rounded-full"/>
                        <img src={selectedFile} alt="user-img" className={`${loading && "animate-pulse"}`}/>
                    </div>
                )}
                <div className="flex items-center justify-between pt-2.5">
                    {!loading && (
                        <>
                            <div className="flex">
                                <div className="" onClick={() => filePickerRef.current.click()}>
                                <PhotographIcon className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-10 w-10"/>
                                <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>
                                </div>
                                <EmojiHappyIcon className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-10 w-10"/>
                            </div>
                            <button onClick={sendPost} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" type="submit">Add Group</button>
                        </>
                    )}
                </div>
            </div>
        </div>






</ModalLayout>



            
        </div>
    );
}

export default GroupModal;
