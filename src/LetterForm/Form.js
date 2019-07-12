import React from "react";
import "./Form.css";

class LetterForm extends React.Component {
  render() {
    return (
      <form>
        <label>
          <input type="text" name="letters" placeholder="Scrabble letters" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LetterForm;
