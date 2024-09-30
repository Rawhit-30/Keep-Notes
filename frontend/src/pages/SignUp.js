import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:8000/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, username })
    });

    let data = await res.json();
    console.log(data);
    if (data.success) {
      alert("Registration successful");
      navigate("/login");
    } else {
      setError(data.message);
      alert(data.message);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <form onSubmit={handleSubmit} className='bg-white p-10 rounded-lg shadow-lg w-96'>
        <h3 className='text-center text-2xl font-semibold mb-6 text-gray-700'>Sign Up</h3>

        <div className="mb-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder='Username'
            className="border border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="mb-4">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='Name'
            className="border border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

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
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            className="border border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <button className="bg-blue-500 text-white p-4 rounded-md w-full hover:bg-blue-600 transition duration-200">Sign Up</button>

        <p className='mt-4 text-center text-gray-600'>Already Have An Account? <Link className='text-blue-500 font-semibold' to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
