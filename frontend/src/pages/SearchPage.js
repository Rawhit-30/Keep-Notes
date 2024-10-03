import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Footer from '../components/Footer';
import Oops from '../components/Oops';
import oopsImg from "../Images/oops2.png";
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const myParam = searchParams.get('query');

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(myParam || ""); // Initialize with the search param

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      console.log('Filtered Data:', filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, searchQuery]); // Trigger filtering when data or searchQuery changes

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
    .then(responseData => {
      if (responseData.success === false) {
        setError(responseData.msg);
      } else {
        console.log('Fetched Data:', responseData);
        setData(responseData);  // Directly using the array of notes
      }
    })
    .catch(error => {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes.');
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  return (
    <>
      <Navbar/>
      <div className="div flex items-center pr-5 pt-4 justify-end">
        <div className="inputBox !w-[400px] !p-[5px]">
          <input
            type="text"
            placeholder='Search Notes'
            value={searchQuery}
            onChange={handleSearchChange} // Update search query on input change
          />
        </div>
      </div>
      <div className="gridItems gridOne">
        {
          error ? 
            <Oops title={error} image={oopsImg} buttonTitle="Go Back" buttonLink="/" /> :
            (!searchQuery || (filteredData && filteredData.length === 0)) ? 
              <Oops title={`No Search Results Found for "${searchQuery || ''}"`} image={oopsImg} buttonTitle="Go Back" buttonLink="/" /> :
              filteredData.map((el, index) => (
                <Note key={el._id} index={index} note={el} height="180px" />
              ))
        }
      </div>
      <Footer/>
    </>
  );
};

export default SearchPage;
