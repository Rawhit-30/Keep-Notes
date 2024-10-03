import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Footer from '../components/Footer';
import Oops from '../components/Oops';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);

  const getNotes = () => {
    fetch("http://localhost:8000/getNotes", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID")
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success === false) {
          setError(data.msg);
        } else {
          setData(data);
          console.log(data);
        }
      });
  };

  const getUserDetails = () => {
    fetch("http://localhost:8000/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID")
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success === false) {
          navigate("/login");
        } else {
          setUserData(data);
        }
      });
  };

  const handleDeleteNote = (id) => {
    setData((prevData) => prevData.filter(note => note._id !== id));
  };

  useEffect(() => {
    getNotes();
    getUserDetails();
  }, []);

  const handleAddNoteClick = () => {
    navigate("/addNewNote"); // Navigate to Add Note page
  };

  return (
    <>
      <Navbar />
      <div className='mt-[20px] flex items-center justify-between w-screen px-[50px]'>
        <h1 className='text-2xl font-semibold'>Hi, {userData ? userData.name : ""}</h1>
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="inputBox !w-[380px]">
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search?query=${query}`);
                }
              }}
              onChange={(e) => { setQuery(e.target.value); }}
              value={query}
              type="text"
              placeholder='Search Notes'
              className='!p-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>
          {/* Add Note Button */}
          <button 
            onClick={handleAddNoteClick} 
            className="btnNormal !min-w-[150px] px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="gridItems mt-5 mb-4 px-[50px]">
        {
          data && data.length > 0 ? data.map((el, index) => {
            return (
              <Note key={index} index={index} note={el} onDelete={handleDeleteNote} />
            );
          }) : (
            <Oops title={"No Note Found"} image={require("../Images/oops2.png")} buttonTitle={"Add Note"} buttonLink={"/addNewNote"} />
          )
        }
      </div>

      <Footer />
    </>
  );
};

export default Home;
