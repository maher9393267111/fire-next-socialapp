import { Button, Checkbox, Form, Input } from 'antd';
import  {useAuth} from '../../context/global';
import {auth,db} from "../../firebase";
import Link from "next/link";

import {useEffect} from "react";
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {doc,setDoc,getDoc,addDoc,collection} from "firebase/firestore";
const Register = () => {


const { signUp,currentuser,userinfo } = useAuth();


  const onFinish = (values) => {
    console.log('Success--->>>:', values);
    signInWithGoogle();
    //signUp(values.email, values.password, values.name);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  const router = useRouter();

useEffect(() => {
  //console.log("🔴🔴🔴🔴", );

if (userinfo?.role === "admin") {
  router.push("/admin/dashboard");
}
if (userinfo?.role === "user") {
  router.push("/user/history");
}


}, [userinfo?.role]);





const handleSubmit = async (values) => {
   // e.preventDefault();
    
    console.log('Success--->>>:', values);

    const { email, password, username } = values;

signUp(email, password, username);

  
   
   


  };






  return (


<div className=' w-[400px] mx-auto mt-24'>

<div>
    <h1 
    onClick={handleSubmit}
    className=' text-center mt-12 mb-12 text-2xl font-bold '>Register Page {currentuser?.displayName} ???  {userinfo?.name}</h1>
    <p>{userinfo?.name}</p>
</div>

    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={ handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>




      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Register;