import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import {HeartOutlined,CommentOutlined  } from "@ant-design/icons";

import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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

  // const q = query(
  //     collection(db, "chats", id, "messages"),
  //     orderBy("timestamp")
  //   );
  // const [messages, loading] = useCollectionData(q);
  // const [post] = useDocumentData(doc(db, "posts", postid));
  const [post, setPost] = useState({});

  const fethPost = async () => {
    const groupRef = doc(db, "posts", postid);
    const postr = await getDoc(groupRef);

    
    await setPost({ id: postid, ...postr.data() });

 
  };

  useEffect(() => {
    if (postid) {
      fethPost();
    }
  }, [db, postid]);

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

<div className=" flex gap-12">

{/* --Like-- */}

<div>

<h1><HeartOutlined  className=' block w-12 h-12'/></h1>


</div>


<div>

<h1><CommentOutlined /></h1>


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
