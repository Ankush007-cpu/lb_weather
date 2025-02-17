import {Link} from "react-router-dom"
import './home.css'
import Logo from '../../assets/logo.png'
function Home(){
    return(
        <div className='homeMain'>
            <h1>Discover The <br />  Weather In Your City</h1>
            <img src={Logo} alt="LogoImg" />
            <p>Get to know your weather maps and <br /> rader perciption forecast</p>
          <Link to='weather'><button>Get Started</button> </Link>
        </div>
    )
}
export default Home;