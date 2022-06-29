import React from "react";
import Link from "next/link";
const Usergroups = ({ groups }) => {
  return (
    <div>
      <div>
        {/* ----header----> */}

        <div>
          <h1 className=" text-center text-2xl font-semibold">User Groups</h1>
        </div>

        {/* ----map----- */}

        <div className=" grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {groups?.map((group) => (
            <div key={group.id}>
              {/* ---image--- */}
<Link href={`/${group.id}`}><div className=" w-[300px] h-[300px]">
                <img className=" w-full h-full " src={group.groupImg} alt="" />
              </div>
</Link>

                {/* ---name--- */}

                <div>
                    <p className="text-xl my-2 hover:text-red-500 transition-ll duration-200 font-semibold ">{group.name}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Usergroups;
