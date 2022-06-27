import React from "react";
import { Button } from "antd";
import { BsGithub } from "react-icons/bs";
import { useAuth } from "../../context/global1";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
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
   
    // add the user to the users collection

  };

  return (

    <div>
      <h1>Register</h1>
    </div>
    
  );
};

export default Register;
