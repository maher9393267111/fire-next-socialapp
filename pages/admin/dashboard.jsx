import React from 'react';
import CreateGroup from '../../components/admin/createGroup';
import AllGroups from '../../components/admin/AllGroups';
const Dashboard = () => {
    return (
       <div>
              <h1 className=' ml-12 text-2xl mt-12 mb-12 font-bold text-teal-500 text-center'> Admin Dashboard</h1>

<div>



{/* ---crete group comp-- */}

<div>
<CreateGroup />
</div>


<div>

<AllGroups />

</div>





</div>



       </div>
    );
}

export default Dashboard;
