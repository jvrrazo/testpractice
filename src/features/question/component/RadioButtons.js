import React, { useState } from 'react';

const RadioButtons = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    console.log(event.target);
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleOptionChange}
        />
        <span
          style={{
            color: selectedOption === 'option1' ? 'red' : 'black',
          }}
        >
          Option 1
        </span>
      </label>
      <label>
        <input
          type="radio"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
        <span
          style={{
            color: selectedOption === 'option2' ? 'red' : 'black',
          }}
        >
          Option 2
        </span>
      </label>
      <label>
        <input
          type="radio"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={handleOptionChange}
        />
        <span
          style={{
            color: selectedOption === 'option3' ? 'red' : 'black',
          }}
        >
          Option 3
        </span>
      </label>
    </div>
  );
};

export default RadioButtons;