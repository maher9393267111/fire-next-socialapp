import React from 'react';
import { useAuth } from '../../context/global';
import {useState,useEffect} from 'react';


const History = () => {

const {userinfo} = useAuth();
const [usergroups,setUsergroups] = useState([]);
const [userposts,setUserposts] = useState([]);
useEffect(()=>{


    




},[])


    return (
        <div>
            History {userinfo.name}
        </div>
    );
}

export default History;
