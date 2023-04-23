import Inputform from './form';

import React, { useState } from 'react';

const MyComponent = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <button onClick={toggleFormVisibility}>Open Form</button>

      {isFormVisible && (
        <div>
          {<Inputform/>}
          <button onClick={toggleFormVisibility}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
