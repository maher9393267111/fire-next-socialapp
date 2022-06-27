import '../styles/globals.css'
import Global1 from '../context/global1'
import { wrapper } from "../store/index";
import Header from '../components/Header/Navbar'
function MyApp({ Component, pageProps }) {



  return (
    <Global1>
      <Header/>
        
     <Component {...pageProps} />
     
    
     </Global1>

  )
}


export default wrapper.withRedux( MyApp);
