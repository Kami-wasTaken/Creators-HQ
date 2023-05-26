import video from '../Assets/video.webm';
import { useRef } from 'react';


const Header = () => {
  
  const videoRef = useRef();
  const setPlayBack = () => {
    videoRef.current.playbackRate = 1;
  };
  return (
    
    <header className="main_header">
      <div className="container">
      <div className="main_header_container">
        <div className="header_left">
          <h1 className="slogan">Find Your Creative Answer</h1>
        </div>
        <div className="header_right">
          <video ref={videoRef}
          onCanPlay={() => setPlayBack()} src={video} autoPlay loop muted/>
        </div>
      </div>
      </div>
    </header>
  )
}

export default Header