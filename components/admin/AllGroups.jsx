import React from 'react';
import { useEffect,useState } from 'react';
import {GroupsList} from '../../functions/groups'
const AllGroups = () => {

const [groups,setGroups] = useState([]);

useEffect(() => {

    GroupsList().then(res => {
    //    console.log('res---👉️👉️👉️👉️👉️👉️',res);
        setGroups(res)
    }).catch(err => {
        console.log(err)
    }
    )



}, [])




    return (
       
<div>
    <div>


{/* --header--- */}

<div>

<h1 className=' text-center text-2xl font-bold'>Groups List</h1>


</div>


{/* ----All Groups---  */}

<div>

  ????  {groups?.length}
</div>





    </div>
</div>


    );
}

export default AllGroups;
