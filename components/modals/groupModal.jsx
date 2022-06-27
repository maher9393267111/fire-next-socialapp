import React from 'react';
import ModalLayout from './Modal';
import { useAuth } from '../../context/global';
import {useEffect,useState} from 'react';
import  {getGroup} from '../../functions/groups';
const GroupModal = () => {



const {groupid_upate} = useAuth();

const [group,setGroup] = useState({});


useEffect(() => {


    if (groupid_upate) {

    getGroup(groupid_upate)
    .then((res) => {
        console.log('res in Modal ---👉️👉️👉️👉️👉️👉️',res);
        setGroup(res);
    }
    )
}

}, [groupid_upate]);





    return (
        <div>

<ModalLayout  title=' Update group modal'>

 {groupid_upate}

 {group?.text}




</ModalLayout>



            
        </div>
    );
}

export default GroupModal;
