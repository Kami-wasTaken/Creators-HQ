import ReactDom from 'react-dom/client';
import App from './App';
import './index.css';


window.$user = "";
window.$filter = "";
window.$sentiment = "";

const root = ReactDom.createRoot(document.querySelector('#root'));

root.render(
    
        <App/>
    
    
        

);