import '../styles/globals.css'
import Global1 from '../context/global1'
function MyApp({ Component, pageProps }) {



  return (
    <Global1>
     <Component {...pageProps} />
     </Global1>

  )
}


export default MyApp
