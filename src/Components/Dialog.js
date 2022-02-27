import React from "react";

const Dialog = () => {
  return (
    <div className="dialog-container">
      <form className="form-container" action="">
        <h1>Submit a New TDS reading for review</h1>
        <label htmlFor="state">
          Enter State:
          <input type="text" id="state" name="state" />
        </label>
        <label htmlFor="area">
          Enter Area :
          <input type="text" id="area" name="area" />
        </label>
        <label htmlFor="tds">
          Enter TDS:
          <input type="text" id="tds" name="tds" />
        </label>
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Dialog;
