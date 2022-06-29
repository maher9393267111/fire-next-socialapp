import { comment } from 'postcss';
import React from 'react';;
import CommentCard from './commentCard';
const CommnetsList = ({comments,userinfo}) => {
    return (
        <div>

<div>

<div>

{comments?.map((comment) => (
<div className='ml-2 mr-2 min-h-[120px] border-t-2 border-b-2'>

<CommentCard comment={comment} userinfo={userinfo} />

   
</div>


))}








</div>




</div>





        </div>
    );
}

export default CommnetsList;
