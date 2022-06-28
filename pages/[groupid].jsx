import React from "react";
import Link from "next/link";
import safeJsonStringify from "safe-json-stringify";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addUserToGroup } from "../functions/groups";
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
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../context/global";
import { message } from "antd";
const Groupid = ({ }) => {
    const { userinfo } = useAuth();
    const router = useRouter();
    const { groupid } = router.query;
    // console.log(groupid);

    const dispatch = useDispatch();
    const [group, setGroup] = useState(null);
    const [groupUsers, setGroupUsers] = useState([]);

    const fethGroup = async () => {
        const groupRef = doc(db, "Groups", groupid);
        const groupr = await getDoc(groupRef);

        await setGroup({ id: groupid, ...groupr.data() });


    };

    useEffect(() => {
        if (groupid || group) {
            fethGroup()


        }
    }, [db, groupid]);

    const addgroup = async () => {
        addUserToGroup(groupid, userinfo, group);
    };


    const [userisingroup, setUserisingroup] = useState(false);



    const q = query(
        collection(db, "Groups", groupid, "groupUsers"),
        // orderBy("timestamp")
    );
    const [messages, loading] = useCollectionData(q);

    console.log('messages---->', messages);
    console.log('loading---->', groupid);



// current user is in group or not


useEffect(() => {

    const check =messages?.filter(message => message.id === userinfo.id);

if (check?.length > 0) {

    setUserisingroup(true);

}
else {

    setUserisingroup(false);

}



    console.log('check---->', check);

}, [messages]);



    return (
        <div className=" min-h-[122vh]">
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
                            <img
                                onClick={addgroup}
                                className=" w-14 h-14 rounded-full"
                                src="https://cdn1.iconfinder.com/data/icons/basic-user-interface-7/24/new_plus_create_add_increase-256.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
           

{userisingroup ? 'yes in group'  : ' now not inm group'}

            

        </div>
    );
};

export default Groupid;
