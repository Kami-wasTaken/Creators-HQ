import './Register.scss'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';




import { useState  } from 'react';




const Register = () => {

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setUsername('');
  }

 

  
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='website_name'>Creator's HQ</span>
            <span className='register_title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" value = {username} placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
                <input type="email" value = {email} placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                <input type="password" value = {password} placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>
                <div className="age_checker"><input type="checkbox"/><p>are you above the age of 13?</p></div>
                

                <button onClick={async () => {
                  const accData = { email, password, username };
                  const response = await fetch("http://localhost:5000/add_account", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(accData)})
                  .then(function(response) {
                    return response.json();
                   })
                   .then(function(data) {
                    console.log(data.message);
                    if(data.message === "registration successful") {
                      navigate('/home', { replace: true });
                      window.$user = data.username;
                    }
                    else
                    {
                      setError(true);
                     
                    }
                    
                   })
                 
                }}>Sign Up</button>
                {error && <span>email or username is already in use</span>}
            </form>
            <div className='register_nav'><p>Do you have an account already?</p><Link to="/">Login</Link></div>
        </div>
    </div>
  )
}

export default Register