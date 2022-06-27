import React from 'react';
import { useAuth } from '../../context/global';
const History = () => {

    const {userinfo} = useAuth();
    return (
        <div>
            History {userinfo.name}
        </div>
    );
}

export default History;
