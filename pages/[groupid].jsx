import React from "react";
import Link from "next/link";
import CreatePost from "../components/singlegroup/createPost";
import safeJsonStringify from "safe-json-stringify";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AllPosts from "../components/singlegroup/groupPosts";
import { addUserToGroup, delteGroupusers } from "../functions/groups";
import { setGroupUsers } from "../store/reduxglobal";
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
import { db, storage } from "../firebase";
import { useAuth } from "../context/global";
import { message } from "antd";
const Groupid = ({}) => {
  const { userinfo } = useAuth();
  const router = useRouter();
  const { groupid } = router.query;
  // console.log(groupid);

  const dispatch = useDispatch();
  const [group, setGroup] = useState(null);
  const [groupUsers, setGroupUsers, getPostsInGroup] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [grouoPosts, setGrouoPosts] = useState([]);

  const fethGroup = async () => {
    const groupRef = doc(db, "Groups", groupid);
    const groupr = await getDoc(groupRef);

    await setGroup({ id: groupid, ...groupr.data() });

    const userin = await getDocs(
      collection(db, "Groups", groupid, "groupUsers")
    );

    const allUsers = [];

    // allUsers = [{ ...doc.data(), id: doc.id }])
    userin.forEach((doc) => (allUsers.push({ ...doc.data(), id: doc.id })));
   // console.log("🔥🔥🔥", allUsers);
    setGroupUsers(allUsers);
  //  return allPosts;





 const q = query(collection(db, "posts"), where("groupid", "==", groupid));
 const unsub = onSnapshot(q, (QuerySnapshot) => {
   let postsArray = [];
   QuerySnapshot.forEach((doc) => {
     postsArray.push({ ...doc.data(), id: doc.id });
   });
   console.log("from vivek", postsArray);
    setGrouoPosts(postsArray);
    console.log("🔥🔥🔥", grouoPosts);
  // setTodos(postsArray);
 });




  };

  useEffect(() => {
    if (groupid || group) {
      fethGroup().then(() => {
        //  getPostsInGroup(groupid);
      });
    }
  }, [db, groupid, refresh]);

  const addgroup = async () => {
    addUserToGroup(groupid, userinfo, group);
    setRefresh(!refresh);
  };

  const deletegroup = async () => {
    await delteGroupusers(groupid, userinfo.id);
    setRefresh(!refresh);
  };

  const [userisingroup, setUserisingroup] = useState(false);

  useEffect(() => {
    const check = groupUsers?.filter((user) => user.id === userinfo.id);

    if (check?.length > 0) {
      setUserisingroup(true);
    } else {
      setUserisingroup(false);
    }

    console.log("chec 🔴🔴🔴k---->", check);
  }, [groupUsers, db]);

  return (
    <div className=" min-h-[122vh] pb-30">
      <div>
        {/* ---image cover--- */}

        <div className=" w-full bg-slate-200 relative">
          <img
            className="  mx-auto object-fit w-[455px] h-[455px]"
            src={group?.image}
            alt=""
          />

          {/* ---Add icon--- */}

          <div className=" absolute sm:bottom-[-1px] sm:left-[44px]  md:left-[130px] lg:left-[333px] ">
            <div>
              {!userisingroup && (
                <img
                  onClick={addgroup}
                  className=" w-14 h-14 rounded-full"
                  src="https://cdn1.iconfinder.com/data/icons/basic-user-interface-7/24/new_plus_create_add_increase-256.png"
                  alt=""
                />
              )}

              {userisingroup && (
                <img
                  onClick={deletegroup}
                  className=" w-14 h-14 rounded-full"
                  src="https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-010_exit_logout-128.png"
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {userisingroup ? "yes in group" : " now not inm group"}

      {/* -------data and fgroup posts--- */}

      <div className=" mt-12 mr-12 ml-12">
        {/* --grid- */}

        <div className=" grid grid-cols-12 gap-4">
          {/* ----posts and create--- */}

          <div className=" col-span-9">
            {/* -----create post----- */}

            <div>
              <CreatePost userisingroup={userisingroup} groupid={groupid} />
            </div>

            {/* ---end of create post--- */}



{/* ----ALL POSTS--- */}

<div>

<AllPosts posts={grouoPosts} />

</div>


          </div>

          {/* ----group info--- */}

          <div className=" pb-22 col-span-3">
            <div>
              {/* -header--- */}

              <div>
                <h1 className="text-2xl transition-all duration-200 text-blue-600 hover:scale-110">
                  {" "}
                  Group Info
                </h1>
              </div>

              <div className=" my-2">
                <div>
                  <h2 className="text-md transition-all duration-200 text-blue-600 ">
                    {" "}
                    Group Name : {group?.text}
                  </h2>
                </div>

                <div>
                  <h2 className="text-md transition-all duration-200 text-blue-600 ">
                    {" "}
                    Group Users : {groupUsers?.length}

                    <div>
                        {groupUsers?.map((user) => (

<div key ={user?.name} className="">
    <h1> <div className=" flex gap-6">
        
        <h1><img className="w-6 h-6" src={user?.image} alt="" /></h1>
<h1 className="  text-green-700 font-bold">{user?.name}</h1>

        </div>
         </h1>
</div>
                        ))}
                    </div>
                  </h2>
                </div>

                <div>
                  <h2 className="text-md transition-all duration-200 text-blue-600 ">
                    {" "}
                    Group Posts : {grouoPosts?.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groupid;
