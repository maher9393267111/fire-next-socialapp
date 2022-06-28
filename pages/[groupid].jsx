import React from 'react';
import Link from 'next/link';
import safeJsonStringify from "safe-json-stringify";
import { useRouter } from 'next/router';
import { useState,useEffect } from "react";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    getDoc
  } from "firebase/firestore";
  import { db, storage } from "../firebase";
const Groupid = ({}) => {

    const router = useRouter();
    const { groupid } = router.query;
    console.log(groupid);

    const [group, setGroup] = useState(null);

    const fethGroup = async () => {
        const groupRef = doc(db, "Groups", groupid);
        const group = await getDoc(groupRef);
    
        setGroup({ id:groupid, ...group.data() });
    
      
    
     
      };
    
      useEffect(() => {
        if (groupid) {
          fethGroup();
        }
      }, [db, groupid]);






    return (
        <div>
            
            {groupid}

            {group?.text}
          
          
        </div>
    );
}



export default Groupid;
