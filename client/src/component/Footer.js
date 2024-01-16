import logo from '../images/travel-agent.png'

const Footer = () => {
  return (
    <footer>
       <div className="footer-container">
       <img className="logo" src={logo} alt="Simo's Travels Logo" /> 
       <p>Enjoy your travels and add them on our page!</p>     
       </div>
    </footer>
  )
}

export default Footer;