import "./PageFooter.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube,faTwitter,faFacebook ,faInstagram,faLinkedin} from '@fortawesome/free-brands-svg-icons';
const Myfooter =() =>{
    return(
      <footer className="footer">
        <div className="container footer-navbar">
          <div className="row">
            <div className="col-lg-4">
              <div>
                <h2 className="block-title h2">
                  Social Media
                </h2>
                <div className="social-links">
                  <a href="" className="twitter"><FontAwesomeIcon icon={faTwitter} />  TWITTER</a>
                  <a href="" className="youtube"><FontAwesomeIcon icon={faYoutube} />  YOUTUBE </a>
                  <a href="" className="facebook"><FontAwesomeIcon icon={faFacebook} />  FACEBOOK </a>
                  <a href="" className="linkedin"><FontAwesomeIcon icon={faLinkedin} />  LINKEDIN </a>
                  <a href="" className="instagram"><FontAwesomeIcon icon={faInstagram} />  INSTAGRAM </a>
                </div>
              </div>
              </div>
            
            <div className="col-lg-4">
              <div>
                <h2 className="block-title">
                  Get Help
                </h2>
                <div className="social-links">
                  <a href="" className="twitter">CONATCT THE ALLUMINI SERVER DESK </a>
                  <a href="" className="youtube">CLAIM YOUR NITKEY </a>
                  <a href="" className="facebook">GET HELP SERACHING THE ALLUMINI DIRECTOR </a>
                  <a href="" className="linkedin">VIEW ALL THE CONATCTS </a>
                  <a href="" className="instagram">VIEW ALL THE HELP DESK PAGES </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div>
                <h2 className="block-title">
                  About This Site
                </h2>
                <div className="social-links">
                  <a href="" className="twitter">ACCESSIBILITY </a>
                  <a href="" className="youtube">PRIVACY </a>
                  <a href="" className="facebook">TERMS OF USE </a>
                  <a href="" className="linkedin">GO TO NITAP WEBSITE </a>
                  <a href="" className="instagram">ADMIN PROFILE </a>
                </div>
              </div>
            </div>
          

        </div>
        <div className="last">
          <div>© 2024 The President and Fellows of NIT Arunachal Pradesh</div>
        </div>
        </div>
      </footer>
       
    )
}
export default Myfooter;
