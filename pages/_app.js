import '../styles/globals.css'
import Global from '../context/global'
import { wrapper } from "../store/index";
import Header from '../components/Header/Navbar'
function MyApp({ Component, pageProps }) {



  return (
    <Global>
      <Header/>
        
     <Component {...pageProps} />
     
    
     </Global>

  )
}


export default wrapper.withRedux( MyApp);
