
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";

import { useAuth } from "../../context/global";
import { useState, useRef } from "react";
import { db, storage } from "../../firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from "firebase/storage";



const CreatePost = ({ groupid,userisingroup }) => {

    const { userinfo } = useAuth();
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            userid: userinfo.id,
            groupid: groupid,

            text: input,
            // groupImg: image,
            timestamp: serverTimestamp(),
            postedby: userinfo.name,
        });

        const imageRef = ref(storage, `posts/${input}/image`);

        if (selectedFile) {
            // Upload image as url to storage then send it to current user's post doc as update
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);

                const docRef = setDoc(doc(db, "posts", input), {
                    userid: userinfo.id,
                    groupid: groupid,
                    text: input,
                    image: downloadURL,
                    timestamp: serverTimestamp(),
                    creator: userinfo.name,
                });
            });
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
            <div>
                <>
                    {userinfo?.name && (
                        <div className="flex border-b w-[80%] mx-auto text-center border-gray-200 p-3 space-x-3">
                            {/* <img onClick={signOut} className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" src={session.user.image} alt="user-img" referrerPolicy="no-referrer"/> */}
                            <div className="w-full divide-y divide-gray-200">
                                <div className="">
                                    <textarea
                                        className="w-full border-2 focus:ring-0 text-lg placeholderbg-gray-700 tracking-wide min-h-[50px] text-gray-700"
                                        rows="2"
                                        placeholder="What`s happening"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    ></textarea>
                                </div>
                                {selectedFile && (
                                    <div className="relative">
                                        <XIcon
                                            onClick={() => setSelectedFile(null)}
                                            className="border h-7 text-black absolute cursor-pointer shadow-lg border-white m-1 rounded-full"
                                        />
                                        <img
                                            src={selectedFile}
                                            alt="user-img"
                                            className={`${loading && "animate-pulse"}`}
                                        />
                                    </div>
                                )}
                                <div className="flex items-center justify-between pt-2.5">
                                    {!loading && (
                                        <>
                                            <div className="flex">
                                                <div
                                                    className=""
                                                    onClick={() => filePickerRef.current.click()}
                                                >
                                                    <PhotographIcon className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-10 w-10" />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        ref={filePickerRef}
                                                        onChange={addImageToPost}
                                                    />
                                                </div>
                                                <EmojiHappyIcon className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-10 w-10" />
                                            </div>
                                            <button
                                                onClick={sendPost}
                                                disabled={!input.trim() || !userisingroup}
                                                className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                                type="submit"
                                            >
                                                Create Post
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default CreatePost;
