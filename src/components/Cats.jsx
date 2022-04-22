import React from "react";
import { useState, useCallback } from "react";
import _debounce from "lodash/debounce";
function Cats() {     
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [errorOccured, setErrorOccured] = useState(false);

  const handleDebounceFn = async (inputValue) => {
    setErrorOccured(false);
    try {
      const json = await fetch(`https://http.cat/${inputValue}`);
      const data =   await json.json();
      console.log(data);
      // Check again
      setData(data);
    } catch (error) {
      console.log(error);
      setErrorOccured(true);
      setData('https://http.cat/207');
    }
  };

  function handleChange(event) {
    // Validate there with regex for only numbers
    setValue(event.target.value);
    debounceFn(event.target.value);
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);
  console.log(data);
  return (
    <div className="App">
      <input type="number" onChange={(e) => handleChange(e)}></input>
      {/* Conditionally showing the image */}
      {data && <h3>This is default image which will be displayed when an error occured</h3> }
      {data && <img src={data} alt="cat" />}
      {/* Conditionally showing the error message */}
      {errorOccured && <p>error</p>}
    </div>
  );
}

export default Cats;
