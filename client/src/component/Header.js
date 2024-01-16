import logo from "../images/travel-agent.png";
import { Link } from "react-router-dom";
import avatar from '../images/avatar.jpg'

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header-item-container">
          <Link to={"/"}>
            <img className="logo" src={logo} alt="Simo's Travels Logo" />
          </Link>
          </div>
          <div className="header-item-container">
            <p>Log out</p>
            <p>ⓘLanguage</p>
            <img className="avatar" src={avatar} alt="user avatar image "/>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
