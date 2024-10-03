import React from 'react';

const CheckBox = ({ check, setCheck, title }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <input
        type="checkbox"
        checked={check}
        onChange={() => setCheck(!check)}
        className="w-[20px] h-[20px] cursor-pointer"
      />
      <p>{title}</p>
    </div>
  );
};

export default CheckBox;
