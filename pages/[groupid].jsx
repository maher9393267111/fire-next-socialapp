import React from 'react';
import Link from 'next/link';
import safeJsonStringify from "safe-json-stringify";
import { useRouter } from 'next/router';
import { useState,useEffect } from "react";
import {addUserToGroup} from '../functions/groups'
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    getDoc
  } from "firebase/firestore";
  import { db, storage } from "../firebase";
  import {useAuth} from '../context/global'
const Groupid = ({}) => {

    const {userinfo} = useAuth()
    const router = useRouter();
    const { groupid } = router.query;
    console.log(groupid);

    const [group, setGroup] = useState(null);

    const fethGroup = async () => {
        const groupRef = doc(db, "Groups", groupid);
        const groupr = await getDoc(groupRef);
    
        
        setGroup({ id:groupid, ...groupr.data() });
    
      
        console.log('-12-12-1-21-2-12',group);
    
     
      };
    
      useEffect(() => {
        if (groupid) {
          fethGroup();
        }
      }, [db, groupid]);





      const addgroup = async () => {

        addUserToGroup(groupid,userinfo);


      }




    return (
        <div className=' min-h-[122vh]'>
            
        <div>

{/* ---image cover--- */}

<div className=' w-full bg-slate-200 relative'>
<img className='  mx-auto object-fit w-[455px] h-[455px]' src={group?.image} alt="" />


{/* ---Add icon--- */}


<div className=' absolute sm:bottom-[-1px] sm:left-[44px]  md:left-[130px] lg:left-[333px] '>

<div>
    <img 
    onClick={addgroup}
    className=' w-14 h-14 rounded-full'
    
    src="https://cdn1.iconfinder.com/data/icons/basic-user-interface-7/24/new_plus_create_add_increase-256.png" alt="" />
</div>


</div>


</div>








        </div>



          
          
        </div>
    );
}



export default Groupid;
