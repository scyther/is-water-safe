import React, { useState } from "react";

const Form = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  return (
    <form action="#">
      <label for="state">State</label>
      <select name="states" id="state">
        <option value={state}>{state}</option>
      </select>

      <label for="district">Districts</label>
      <select name="districts" id="district">
        <option value={district}>{district}</option>
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
