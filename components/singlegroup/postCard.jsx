import React from "react";
import Moment from "react-moment";
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
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase";
import { useAuth } from "../../context/global";
import { useDispatch } from "react-redux";
import { setPostId } from "../../store/reduxglobal";
import { useState, useEffect } from "react";
import { map } from "@firebase/util";
const PostCard = ({ post }) => {
  const router = useRouter();
  const { userinfo } = useAuth();
const dispatch = useDispatch();
  const [hasLiked, setHasLiked] = useState(false);

  const [likes, setLikes] = useState(0);

  const q = query(
    collection(db, "posts", post.id, "likes")
    // orderBy("timestamp")
  );


  const [postLikes, loading] = useCollectionData(q,  { idField: "id" });



  

  


 
  //const [chat] = useDocumentData(doc(db, "chats", id));

  useEffect(() => {
    // like.id is doc from likes collection  and compare it with current user's id

    if (postLikes) {   // ---->>> importnat to work good
      setHasLiked(
        postLikes.findIndex((like) => like.username === userinfo.name) !== -1
      );
      console.log("has liked---->", hasLiked);
    }
  }, [postLikes]);

  const likedPost = async () => {
    try {
      if (userinfo.name) {
        if (hasLiked) {
          console.log(post.id, "___post id____");
          // delete doc from likes if aleready liked
          await deleteDoc(doc(db, "posts", post.id, "likes", userinfo.id));
          toast.error("Post unliked");
        } else {
          console.log(post.id, "___post id____");
          // add doc to likes if not already liked
          await setDoc(doc(db, "posts", post.id, "likes", userinfo.id), {
            username: userinfo.name,
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
      <div
        className={` ${
          post.image ? "h-[400px]" : "h-[170px]"
        }  border-2 sm:text-left lg:text-center mx-auto border-blue-700 w-[344px]  p-2`}
      >
        {/* ---content-- */}

        <div className=" h-full w-full">
          {/* --user data --- */}

          <div>
            <div className=" mb-4 ml-2 flex gap-4">
              <div>
                <img
                  className=" w-12 h-12 rounded-full"
                  src={post?.userImg}
                  alt=""
                />
              </div>

              {/* ---user name-- */}

              <div>
                <h4 className="font-bold mt-2 text-[15px] sm:text-[16px] hover:underline">
                  {post?.name}
                </h4>
              </div>

              <div className=" mt-[8px]">
                <span className="text-[10px]  text-red-500 font-bold sm:text-[12px]">
                  @{post?.name} -{" "}
                </span>
                <span className="text-sm  sm:text-[15px] hover:underline  text-blue-700 font-bold">
                  <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                </span>
              </div>
            </div>

            {/* --post Text-- */}

            <div className="  text-left mb-2 font-bold">
              <h1 className="  font-bold">{post?.text.slice(0, 40)}....</h1>
            </div>
          </div>

          {/* post image---- */}
          {post.image && (
            <div className=" h-[60%]">
              <img
                className=" w-full h-[100%]  object-cover"
                src={post?.image}
                alt=""
              />
            </div>
          )}

          {/* ----likes and comments-- */}

          <div className=" mt-[8px]">
            {/* ---flex icons--- */}

            <div className=" flex  justify-around">
              {/* ---Comments--- */}
              <div
              onClick={() => {dispatch(setPostId(post.id))}}
              >
                <Link href={`/post/${post.id}`}><img
                  className=" w-8 h-8 rounded-full"
                  src="https://cdn4.iconfinder.com/data/icons/hiba-vol-1-1/512/comments-256.png"
                  alt=""
                />
                </Link>
              </div>

              <div className=" flex gap-2">
                {/* -----if not user make like to post--- */}
                <div className=" ">
                  <p className="mt-2">{postLikes?.length}</p>

                  {/* {postLikes?.map((like) => {
                    return (
                      <div>
                        {like?.username}
                        {like.id}
                      </div>
                    );
                  })} */}
                </div>

{ !hasLiked && 

                <img
                  onClick={likedPost}
                  className=" w-8 h-8 rounded-full"
                  src="https://cdn4.iconfinder.com/data/icons/top-search-6/128/_Feedback_like_review-256.png"
                  alt=""
                />
}

                {/* -if maake like show this-- */}

 { hasLiked &&


                <img 
                onClick={likedPost}
                className=' w-8 h-8 rounded-full' src="https://cdn1.iconfinder.com/data/icons/lightly-selected/30/thumbs-up-240.png" alt="" />
}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
