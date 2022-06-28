import React from "react";
import Link from "next/link";
import { useState,useEffect } from "react";
const Homecart = ({ group }) => {








  return (
    <div>
      <div className=" my-12 w-[400px] h-[400px]  mx-auto shadow-lg">
        {/* --image-- */}

        <div className="w-full h-[70%]">
            <Link href={`/${group.uid}`}><img className=" h-full w-full" src={group?.image} alt="" />
            </Link>
        </div>

        {/* ---info---- */}

        <div className=" mt-2">
          <div>
            {" "}
            <h1 className=" text-center font-bold text-xl ">{group?.text}</h1>
          </div>

          <div>
            <div className=" mt-6 flex justify-center gap-8">
              {/* ---Viwe--- */}

              <div>
                <p>
                  <img
                    className=" w-8 h-8 rounded-full"
                    src="https://cdn1.iconfinder.com/data/icons/medical-health-care-flat/33/ophthalmology-256.png"
                    alt=""
                  />
                </p>
              </div>

              {/* users joined number of users joined */}
              <div>
                <p>
                  <img
                    className=" w-8 h-8 rounded-full"
                    src="https://cdn2.iconfinder.com/data/icons/buno-ui-interface/32/__friends_users_people-256.png"
                    alt=""
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homecart;
