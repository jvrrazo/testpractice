import React, { useState } from 'react';


const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

function MultiCheckboxSelect() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      // Uncheck
      setSelectedOptions(prevOptions => prevOptions.filter(item => item !== option));
    } else if (selectedOptions.length < 2) {
      // Check
      setSelectedOptions(prevOptions => [...prevOptions, option]);
    }
  }

  return (
    <div>
      {options.map(option => (
        <div key={option}>
          <label>
            <input 
              type="checkbox" 
              checked={selectedOptions.includes(option)} 
              onChange={() => handleCheckboxChange(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

export default MultiCheckboxSelect;