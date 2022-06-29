import React from 'react';
import Moment from 'react-moment';
const UserPosts = ({posts}) => {
    return (
        <div>
            <h1 className='text-xl font-semibold text-center my-6'>UserPosts</h1>


<>


{ posts?.map((post) => (



<div key ={post.id}

        className={` ${
          post.image ? "h-[400px]" : "h-[170px]"
        }  border-2 sm:text-left lg:text-center  my-6  mx-auto shadow-2xl w-[344px]  p-2`}
      >
        {/* ---content-- */}

        <div className=" h-full w-full">
          {/* --user data --- */}

          <div>
            <div className=" mb-4 ml-2 flex gap-4">
              <div>
                <img
                  className=" w-12 h-12 rounded-full"
                  src={post?.userImg}
                  alt=""
                />
              </div>

              {/* ---user name-- */}

              <div>
                <h4 className="font-bold mt-2 text-[15px] sm:text-[16px] hover:underline">
                  {post?.name}
                </h4>
              </div>

              <div className=" mt-[8px]">
                <span className="text-[10px]  text-red-500 font-bold sm:text-[12px]">
                  @{post?.name} -{" "}
                </span>
                <span className="text-sm  sm:text-[15px] hover:underline  text-blue-700 font-bold">
                  <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                </span>
              </div>
            </div>

            {/* --post Text-- */}

            <div className="  text-left mb-2 font-bold">
              <h1 className="  font-bold">{post?.text.slice(0, 40)}....</h1>
            </div>
          </div>

          {/* post image---- */}
          {post.image && (
            <div className=" h-[60%]">
              <img
                className=" w-full h-[100%]  object-cover"
                src={post?.image}
                alt=""
              />
            </div>
          )}

          {/* ----likes and comments-- */}

          
        </div>
      </div>

))}








</>






        </div>
    );
}

export default UserPosts;
