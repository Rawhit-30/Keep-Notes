import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login request to the backend
    let res = await fetch("http://localhost:8000/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    let data = await res.json();
    console.log(data);
    
    // Check if login was successful
    if (data.success) {
      alert("Login successful");
      
      // Save token and user ID in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userID", data.userID);

      // Redirect to the home page
      navigate("/"); 
    } else {
      setError(data.message); // Set error message
      alert(data.message); // Display error message
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <form onSubmit={handleSubmit} className='bg-white p-10 rounded-lg shadow-lg w-96'>
        <h3 className='text-center text-2xl font-semibold mb-6 text-gray-700'>Login</h3>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Display error if exists */}

        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Email'
            className="border border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='Password'
            className="border border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <button className="bg-blue-500 text-white p-4 rounded-md w-full hover:bg-blue-600 transition duration-200">Login</button>

        <p className='mt-4 text-center text-gray-600'>Don't Have An Account? <Link className='text-blue-500 font-semibold' to="/signUp">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
