import '../styles/globals.css'
import Global from '../context/global'
import { wrapper } from "../store/index";
import Navbar from '../components/Header/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
function MyApp({ Component, pageProps }) {



  return (
    <Global>
      <Navbar/>
      <ToastContainer />
        
     <Component {...pageProps} />
     
    
     </Global>

  )
}


export default wrapper.withRedux( MyApp);
