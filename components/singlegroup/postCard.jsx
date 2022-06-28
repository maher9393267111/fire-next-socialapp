import React from 'react';

const PostCard = ({post}) => {
    return (
       <div >
<div className={ ` ${post.image ? 'h-[300px]' : 'h-170px'}  border-2 sm:text-left lg:text-center mx-auto border-blue-700 w-[300px] h-[300px]`}>


{/* ---content-- */}


<div>


{/* imaga---- */}

<div>
    <img src={post?.image} alt="" />
</div>




</div>






</div>

     

       </div>
    );
}

export default PostCard;
