import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Note = ({ note, index, onDelete }) => {
  let navigate = useNavigate();
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const deleteNote = (id) => {
    fetch("http://localhost:8000/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ noteId: id })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          onDelete(id); // Call the onDelete function passed from Home
           alert("Note deleted successfully.");
        } else {
          alert("Failed to delete the note. Please try again.");
        }
      })
      .catch(err => {
        console.error("Error deleting note:", err);
        alert("An error occurred while deleting the note.");
      })
      .finally(() => {
        setIsDeleteModel(false); // Close the modal regardless of success or failure
      });
  };

  const editNote = (id) => {
    navigate(`/editNote/${id}`);
  };

  return (
    <>
      <div className="note relative" id={`note${index}`}>
        <div onClick={() => { navigate(`/singleNotePage/${note._id}`); }}>
          <div className="flex items-center justify-between">
            <p className='text-[gray]'>Note {index + 1}</p>
            {note.isImportant && (
              <p className='p-[3px] bg-green-500 text-white px-[10px] rounded-lg'>Important</p>
            )}
          </div>
          <h1 className='text-[#000] text-[20px] line-clamp-1 w-[80%]'>{note.title}</h1>
          <p className='text-[gray] line-clamp-4 w-[80%]'>{note.description}</p>
        </div>

        <div className="noteBottom absolute bottom-5 w-[93%] flex justify-between items-center">
          <p className='text-[gray]'>{new Date(note.date).toDateString()}</p>

          <div className='flex items-center gap-1'>
            <img className='w-[30px] h-[30px]' onClick={() => setIsDeleteModel(true)} src={require("../Images/delete.png")} alt="Delete" />
            <img className='w-[35px] h-[35px]' onClick={() => editNote(note._id)} src={require("../Images/edit.png")} alt="Edit" />
          </div>
        </div>
      </div>

      {isDeleteModel && (
        <div className="deleteNoteModalCon flex items-center justify-center flex-col fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,.1)] z-[100]">
          <div className="deleteNoteModalBody relative p-[15px] w-[30vw] h-[20vh] rounded-md bg-[#fff] shadow-lg">
            <h3 className='text-[20px]'>Delete Note “<span className='text-[#578df5]'>{note.title}</span>”</h3>
            <p className='m-0 p-0 text-[gray] text-[16px] leading-[1]'>Do You want To Delete This Note <br /> Yes / No</p>

            <div className="flex items-center gap-2 absolute bottom-[5%] w-full">
              <button onClick={() => deleteNote(note._id)} className="delete min-w-[46%] p-[8px] bg-[#f55757] text-[#fff] border-0 outline-0 cursor-pointer">Delete</button>
              <button onClick={() => { setIsDeleteModel(false); }} className="cancel min-w-[46%] p-[8px] bg-[#578df5] text-[#fff] border-0 outline-0 cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
