import '../Register/Register.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export var currentUser = ""

const Login = () => {

  
  const [error, setError] = useState(false);
  const[email, setEmail] = useState('');
  const navigate = useNavigate();
  const[password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  }
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='website_name'>Creator's HQ</span>
            <span className='register_title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" value = {email} placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                <input type="password" value = {password} placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>  
                <button onClick={async () => {
                  const accData = { email, password };
                  const response = await fetch("http://localhost:5000/login", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(accData)})
                  .then(function(response) {
                    return response.json();
                   })
                   .then(function(data) {
                    
                    if (data.message === "password is correct"){
                      window.$user = data.username;
                      
                      
                      navigate('/home', { replace: true });
                    }
                    else if (data.message === "there was an error"){
                      setError(true);
                    }
                   })}}>
                  Sign In</button>
                  {error && <span>email or password is wrong</span>}
            </form>
            <div className='register_nav'><p>Don't have an account?</p><Link to="/register">Register</Link></div>
        </div>
    </div>
  )
}

export default Login
