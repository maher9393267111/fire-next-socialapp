import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import {HeartOutlined,CommentOutlined  } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import {} from "../../functions/groups";
import {} from "../../store/reduxglobal";
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
const {postId} = useSelector(state => state.global);



  const [hasLiked, setHasLiked] = useState(false);
  
  const [likes, setLikes] = useState(0);

  const [likesdata, setLikesdata] = useState([]);
const [refresh, setRefresh] = useState(false);



  const [post, setPost] = useState({});

  const fethPost = async () => {
    const groupRef = doc(db, "posts", postid);
    const postr = await getDoc(groupRef);


    await setPost({ id: postid, ...postr.data() });

    const userin = await getDocs(
        collection(db, "posts", postid, "likes")
      );
  
      const allLikes = [];
  
   
      userin.forEach((doc) => (allLikes.push({ ...doc.data(), id: doc.id })));
      console.log("🔥🔥🔥", allLikes);
      setLikesdata(allLikes);
    //  return allPosts;



 
  };

  useEffect(() => {
    if (postid) {
      fethPost();
    }
  }, [db, postid,refresh]);



    useEffect(() => {

if (likesdata) {   // ---->>> importnat to work good
  setHasLiked(
    likesdata.findIndex((like) => like.username === userinfo.name) !== -1
  );
  console.log("has liked---->", hasLiked);
}


    }, [likesdata,refresh]);



    const likedPost = async () => {
        try {
          if (userinfo.name) {
            if (hasLiked) {
                setRefresh(!refresh);
              console.log(post.id, "___post id____");
              // delete doc from likes if aleready liked
              await deleteDoc(doc(db, "posts", post.id, "likes", userinfo.id));
              toast.error("Post unliked");
            } else {
                setRefresh(!refresh);
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
    <div className=" pb-[100px] ">
      <div>
        {/* postdata start--- */}

        <div className=" w-[450px] mx-auto   min-h-[400px] pb-20 mb-24 shadow-lg">
          <div>
            {/* --header back --- */}

            <div className=" ml-12 mt-12 mb-12">
              <div className=" flex gap-12 ">
                <div>
                  <img
                    className=" w-12 h-12 rounded-full"
                    src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/back-alt-256.png"
                    alt=""
                  />
                </div>

                <div>
                  <h1 className=" text-xl  mt-2 text-blue-600">
                    Back to Group
                  </h1>
                </div>
              </div>
            </div>

            {/* -post info start--- */}

            <div className=" ml-6 mr-12">
              <div>
                {/* ---flex start image user and delete or update options--- */}
                <div className=" flex  justify-between">
                  {/* ----left-- */}
                  <div className="">
                    <div className=" flex gap-6">
                      <div>
                        <img
                          className="  transition-all  duration-200 hover:bg-slate-200 w-14 h-14 rounded-full"
                          src={post?.userImg}
                          alt=""
                        />
                      </div>

                      <div className=" font-bold">
                        <p> {post?.name}</p>
                        <p className=" -mt-2">{post?.userid}</p>

                        <p></p>
                      </div>
                    </div>
                  </div>

                  {/* ----right-- */}

                  <div>rigth</div>
                </div>

                {/* ------post text and image--- */}

                <div>
                  {/* ---text-- */}

                  <div className="mt-4 ml-4 text-xl">
                    <h3>{post?.text}</h3>

                    <div>
                      <p className=" text-sm ">
                        {" "}
                        <Moment
                        // fromNow ago
                        // toNow
                        >
                          {post.timestamp?.toDate()}
                        </Moment>
                      </p>
                    </div>
                  </div>

                  {/* ---post image if is exist-- */}

                  {post?.image && (
                    <div>
                      <div>
                        <img
                          className=" w-full h-[250px] object-cover"
                          src={post.image}
                          alt=""
                        />
                      </div>
                    </div>
                  )}


{/* -----icons- */}


<div>

<div className=" flex gap-12 mt-[31px] mb-12 justify-around">

{/* --Like-- */}

<div>

{/* ----if user make like show this---- */}
 {hasLiked &&  
<div>
    <img 
    onClick={likedPost }
    
    className="w-10 rounded-full h-10" src="https://cdn3.iconfinder.com/data/icons/object-emoji/50/Heart-256.png" alt="" />
</div>
 } 



{/* ----if user Not  make like Yet show this---- */}

  {!hasLiked &&  

 <div>
    <img 
    onClick={likedPost }
    className="w-10 rounded-full h-10" src="https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-19-512.png" alt="" />
</div> 

    }
 


</div>


<div>

<p className="icon-parent transition-all duration-200">
<svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 w-10 h-10 hover:fill-current r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
</p>

{/* <p><img className="w-10 rounded-full h-10" src="https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-28-256.png" alt="" /></p> */}

</div>





</div>





</div>



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
