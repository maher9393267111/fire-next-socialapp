import React from "react";
import { Button } from "antd";
import { BsGithub } from "react-icons/bs";
import { useAuth } from "../../context/global1";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase2";
import Link from "next/link";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const { userinfo, signUp, currentUser } = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password);

    // uodate the profile
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:
        "https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-256.png",
    });

    // add the user to the users collection

    await setDoc(doc(db, "users", email), {
      watchList: [],
      name: name,
      role: "user",
      image: "https://picsum.photos/200",
      email: email,
      password: password,
      cart: [],
      order: [],
    });
  };

  return (
    <div className="  register">
      <div className=" w-[73%]  lg:min-h-[355px]  border-2 border-blue-700  mx-auto mt-14   sm:min-h-[355px] sm:h-auto">
        {/* ---content--- */}
        <div>
          {/* --flex- */}

          <div className=" flex justify-between ml-8 mr-8  lg:flex-row sm:flex-col">
            {/* -left- */}

            <div className=" lg:w-1/2 ">
              <div className=" mt-12 mb-12">
                <form>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="floating_email"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_email"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="floating_password"
                      id="floating_password"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_password"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                  </div>

                  <div class="">
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="floating_first_name"
                        id="floating_first_name"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        for="floating_first_name"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        {" "}
                        name
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* -right-- */}

            <div className="  lg:w-1/2">
              <div className="container  text-center  lg:ml-12 mt-16 mb-12">
                {/* -------google sighn- */}
                <button
                  type="button"
                  class="py-2.5 px-5 mb-4 w-[250px] mr-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <span className="inline-block">
                    <img
                      className="w-8 h-8  transform  translate-y-[10px] mr-2"
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-256.png"
                      alt=""
                    />
                  </span>
               
                </button>

                {/* --Github sign- */}
                <div>
                  <button
                    type="button"
                    class="text-white w-[250px] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    <span className="inline-block">
                      <BsGithub className=" translate-y-[10px] mr-2   text-[28px]" />
                    </span>

                   
                  </button>
                </div>
              </div>
            </div>
            {/* --bottom-----  already have account */}
          </div>
        </div>
        <div className="mt-6  border-t-2 p-6  border-t-blue-700">
          {/* ---flex- */}

          <div className="  justify-center flex gap-4">
            <div>
              <h1>already have account</h1>
            </div>

            <div>
              <button>
                <Link href="/auth/login">Sign in</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
