import { comment } from 'postcss';
import React from 'react';
import Moment from 'react-moment';
const CommnetsList = ({comments}) => {
    return (
        <div>

<div>

<div>

{comments?.map((comment) => (
<div className='ml-2 mr-2 min-h-[120px] border-t-2 border-b-2'>


<div className=' mt-2 mb-4'>

{/* ---flex -- */}

<div className=' flex gap-4'>

{/* ---userimage--- */}
<div className='mt-2 w-[70px]'>
    <img className='w-12 h-12 rounded-full' src={comment?.userImg} alt="" />
</div>


{/* ----text and date--- */}

<div>

{/* tieme with Moment */}
<p
className=' text-red-500 font-semibold'
>
<span>Posted :</span><Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
</p>
    
<p className=' font-semibold'>By:{comment.name}</p>
{/* ---commnet text-- */}

<div>

    <p className='text-xl font-semibold'>{comment?.text}</p>


{/* ----if comment have image shhow it--- */}


{comment?.image && (

<div>

    <img className=' -ml-6' src={comment.image} alt="" />
</div>


)}





</div>


  
</div>

{/* ---- if commnet  userid or username is same as userid show  update delete options-- */}

<div>




</div>



</div>




</div>

   
</div>


))}








</div>




</div>





        </div>
    );
}

export default CommnetsList;
