import { modalGlobalConfig } from "antd/lib/modal/confirm";
import React from "react";
import { useEffect, useState } from "react";
import { GroupsList, updateGroup, deleteGroup } from "../../functions/groups";
import GroupModal from "../modals/groupModal";

import { useAuth } from "../../context/global";

const AllGroups = () => {


    const { showModal, setGroupid_update, groupid_upate } = useAuth();

    const [refreshlist, setRefreshlist] = useState(false);

    // handle group id clickded and open modal


    const handlegroupIdClick = (groupid) => {


        setGroupid_update(groupid);
        console.log(groupid);
        showModal();


    }


    // delete group

    const handleDeleteGroup = async (groupdata,groupid) => {


        await setGroupid_update(groupid);
       // console.log(' ☢️  fgfgfg  ☢️  ☢️  ☢️ ', groupdata);

       await deleteGroup(groupdata,groupid);

    }






    const [groups, setGroups] = useState([]);

    useEffect(() => {
        GroupsList()
            .then((res) => {
                console.log('res---👉️👉️👉️👉️👉️👉️', res);
                setGroups(res);
            })
            .catch((err) => {
                console.log(err);

            });
    }, [groupid_upate]);

    return (
        <div>
            <div>
                {/* --header--- */}

                <div>
                    <h1 className=" text-center text-2xl font-bold">Groups List</h1>
                </div>

                {/* ----All Groups---  */}

                <div className=" w-[500px] pb-20 mx-auto" >
                    {groups?.map((group) => {
                        return (
                            <div key={group?.text} className=" mt-8 my-18 ml-12 mr-12">
                                <div className="  flex  justify-between gap-2">
                                    {/* ---group image-- */}

                                    <div>
                                        <img
                                            className=" w-16 h-16 rounded-full"
                                            src={group?.image}
                                            alt=""
                                        />
                                    </div>

                                    {/* --name-- */}

                                    <div>
                                        <h1 className=" mt-6 font-bold text-blue-600">{group?.text}</h1>
                                    </div>

                                    {/* ----Edit Group Or Delete--  */}

                                    <div>
                                        <div className="mt-4 flex gap-6">
                                            <div><img

                                                onClick={() => handleDeleteGroup(group,group?.uid)}
                                                //{()=>deleteGroup(group?.uid)}
                                                className=" w-8 h-8 rounded-full" src="https://cdn4.iconfinder.com/data/icons/email-2-2/32/Trash-Email-Bin-256.png" alt="" /></div>

                                            <div><img

                                                onClick={() => handlegroupIdClick(group?.uid)}

                                                className=" w-8 h-8 rounded-full" src="https://cdn1.iconfinder.com/data/icons/neutro-essential/32/write-256.png" alt="" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div>
                    <GroupModal />
                </div>


            </div>
        </div>
    );
};

export default AllGroups;
