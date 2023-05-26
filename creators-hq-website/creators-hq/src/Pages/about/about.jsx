import './about.css';
import Navbar from '../../Components/Navbar';
import aboutPage from './aboutPage.png';

const About = () => {
  return (
    <div className="a_body_container" >
      <img src={aboutPage} alt=""></img>
    <Navbar/>
    </div>
  )
}

export default About