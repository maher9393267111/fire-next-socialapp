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
  } from "firebase/firestore";
  import { db, storage } from "../firebase";
const Groupid = ({groupdata}) => {

    const router = useRouter();
    const { groupid } = router.query;
    console.log(groupid);

console.log(groupdata);


    return (
        <div>
            
            {groupid}
            {groupdata?.text}
          
        </div>
    );
}

export default Groupid;


// serverside props are used to pass data to the component
export async function getServerSideProps(context) {
    console.log("GET SERVER SIDE PROPS RUNNING");
  
    try {
        const group = await doc(`groups/${context.query.groupid}`).get();
      const communityDoc = await getDoc(group);
      return {
        props: {
          groupdata: communityDoc.exists()
            ? JSON.parse(
                safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
              )
            : "",
        },
      };
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                statusCode: 307,
              //  console.log("getServerSideProps error - [community]", error)
            }
        }
      // Could create error page here
     
    }
  }