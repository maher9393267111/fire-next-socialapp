import React from "react";
import PostCard from "./postCard";
const GroupPosts = ({ posts }) => {
  return (
    <div>
      <div>
        <h1 className=" text-center mt-4 mb-12 text-2xl text-red-600">
          Group Posts
        </h1>
      </div>

      {/* ------posts map make --- */}

      <div>
        <div>
          {posts?.map((post) => (
            <div key={post?.id} className='my-6'>

<PostCard post={post} />


            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPosts;
