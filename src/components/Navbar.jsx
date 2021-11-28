import {Link}from 'react-router-dom'
import {HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined} from '@ant-design/icons'
import icon from '../images/Cryptornado.png'
const Navbar=()=>{
    return(
        <div className="nav-container">
      <div className="logo-container">
<img src={icon} />
               
            </div>
      <nav className="navbar">
        <Link to="/" className="navbar-item"><HomeOutlined /> Home</Link>
        <Link to="/cryptocurrencies" className="navbar-item"><FundOutlined /> Cryptocurrencies</Link>
        <Link to="/exchanges" className="navbar-item"><MoneyCollectOutlined /> Exchanges</Link>
        <Link to="/news" className="navbar-item"><BulbOutlined /> News</Link>

      </nav>
        </div>
    )
}

export default Navbar