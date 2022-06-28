import React from "react";
import { Button } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/global";
import Link from "next/link";
import {Menu} from "antd";
const { SubMenu, Item } = Menu;
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
  } from "@ant-design/icons";
const Navbar = () => {
  const { userinfo,logout } = useAuth();

  const [current, setCurrent] = useState("home");

  let router= useRouter();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };



  return (
    <div>

<div>
<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">


{/* ---flex--- */}

<div className="   pt-4  w-full flex justify-between   mx-6">



<div className="pt-[8px] flex sm:-ml-6 lg:gap-8">

      <Item  className=" pb-[10px]" key="home" icon={<AppstoreOutlined />}>
        <Link href="/"><a>Home</a></Link>
      </Item>

      <Item  className=" pb-[10px]" key="home" icon={<AppstoreOutlined />}>
        <Link href="/groups"><a>Groups</a></Link>
      </Item>


</div>


<div className=" left flex gap-6">


{/* -----searrch bar----- */}




<div className=" pt-[8px]">
        {!userinfo?.name && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link href="/auth/register"><a>Register</a></Link>
        </Item>
      )}  

      {!userinfo?.name && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link href="/auth/login"><a>Login</a></Link>
        </Item>
      )} 

       {userinfo?.name && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userinfo?.name }
          className="float-right"
        >
          {userinfo && userinfo.role === "user" && (
            <Item>
              <Link href="/user/history"><a>user Dashboard</a></Link>
            </Item>
          )}
 
          {userinfo?.name && userinfo?.role === "admin" && (
            <Item>
              <Link href="/admin/dashboard"><a>Admin Dashboard</a></Link>
            </Item>
          )}







          <Item icon={<LogoutOutlined />}  onClick={logout} >
            Logout
          </Item>
        </SubMenu>
      )}  


</div>
{/* ///------- */}



      </div>
      </div>
    </Menu>
</div>



</div>

    
  );
};

export default Navbar;
