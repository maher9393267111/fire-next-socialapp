
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { useAuth } from '../../context/global';


const GroupModals = ({children,title}) => {

const {    isModalVisible, setIsModalVisible,
   
    handleOk,
    handleCancel,
 } = useAuth();


    return (
        <div>

<>
    
      <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       
<div>

{children}

</div>


      </Modal>
    </>


            
        </div>
    );
}

export default GroupModals;
