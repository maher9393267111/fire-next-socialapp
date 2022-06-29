import React from "react";
import { useState,useEffect } from "react";
import Moment from 'react-moment'

import { useRouter } from "next/router";
import Link from "next/link";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
  getDoc,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase";


const CommentCard = ({ comment,userinfo,postid }) => {

//console.log('postid ⚛️⚛️⚛️',postid);

    const [hasLiked, setHasLiked] = useState(false);

    const q = query(
      collection(db, "posts", postid, "comments", comment.id, "comlikes")
      // orderBy("timestamp")
    );
  
  
    const [commentLikes, loading] = useCollectionData(q,  { idField: "id" });

console.log('commentLikes ⚛️⚛️⚛️',commentLikes);


    useEffect(() => {
      // like.id is doc from likes collection  and compare it with current user's id
  
      if (commentLikes) {   // ---->>> importnat to work good
        setHasLiked(
          commentLikes.findIndex((like) => like.useremail === userinfo.email) !== -1
        );
        console.log("commnet has liked---->", hasLiked);
      }
    }, [commentLikes]);





    const likedPost = async () => {
      try {
        if (userinfo.name) {
          if (hasLiked) {
            console.log(postid, "___post id Delete____");
            // delete doc from likes if aleready liked
            await deleteDoc(doc(db, "posts", postid, "comments", comment.id,'comlikes',userinfo.id));
            toast.error("Post unliked");
          } else {
            console.log(postid, "___post id Add____");
            // add doc to likes if not already liked
            await setDoc(doc(db, "posts", postid, "comments",comment.id,'comlikes', userinfo.id), {
              username: userinfo.name,
              timestamp: serverTimestamp(),
              userimage: userinfo.image,
              useremail: userinfo.email,
              userid: userinfo.id,

            });
            toast.success("Post liked");
          }
        } else {
          toast.error("Please login to like a post");
          // router.push("/login");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };





    
  return (
    <div>
      {hasLiked? (<p>liked</p>) : (<p>no liked</p>)}
      <div className=" mt-2 mb-4">
        {/* ---flex -- */}

        <div className=" flex gap-4">
          {/* ---userimage--- */}
          <div className="mt-2 w-[70px]">
            <img
              className="w-12 h-12 rounded-full"
              src={comment?.userImg}
              alt=""
            />
          </div>

          {/* ----text and date--- */}

          <div>
            {/* tieme with Moment */}
            <p className=" text-red-500 font-semibold">
              <span>Posted :</span>
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </p>

            <p className=" font-semibold text-sm">By:{comment.name}</p>
            {/* ---commnet text-- */}

            <div>
              <p className="text-md font-semibold">{comment?.text}</p>

              {/* ----if comment have image shhow it--- */}

              {comment?.image && (
                <div>
                  <img
                    className="  h-[230px] object-cover"
                    src={comment.image}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>

          {/* ---- if commnet  userid or username is same as userid show  update delete options-- */}

          {userinfo.name === comment.name && (
            <div className="w-[100px]">
              <div>
                <p className=" font-semibold text-red-600 text-[10px]">
                  <img
                    className="w-8 h-8 ml-6 mt-2 rounded-full"
                    src="https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/trash-256.png"
                    alt=""
                  />
                </p>
              </div>
            </div>
          )}
        </div>

{/* ------icons---- */}

<div>

<div className=" flex gap-12 mt-[31px] mb-12 justify-around">
                      {/* --Like-- */}

                      <div className=" flex gap-2">
                        {/* <span> {likesdata?.length}</span> */}
                        {/* ----if user make like show this---- */}
                        {hasLiked && (
                          <div>
                            <img
                              onClick={likedPost}
                              className="w-[14px] h-[14px] rounded-full "
                              src="https://cdn3.iconfinder.com/data/icons/object-emoji/50/Heart-256.png"
                              alt=""
                            />
                          </div>
                        )}

                        {/* ----if user Not  make like Yet show this---- */}

                        {!hasLiked && (
                          <img
                            onClick={likedPost}
                            className="w-8 rounded-full h-8"
                            src="https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-19-512.png"
                            alt=""
                          />
                        )}
                      </div>

                      <div className=" flex gap-2">
                        <span className=" mt-[3px] font-semibold">
                          {/* {comments?.length} */}
                        </span>

                        <p className="icon-parent transition-all duration-200">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="r-4qtqp9 w-8 h-8 hover:fill-current r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"
                          >
                            <g>
                              <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                            </g>
                          </svg>
                        </p>

                        {/* <p><img className="w-10 rounded-full h-10" src="https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-28-256.png" alt="" /></p> */}
                      </div>
                    </div>




</div>

{/* -icons sec end--- */}


      </div>
    </div>
  );
};

export default CommentCard;
