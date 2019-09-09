import React from "react";
import "./Form.css";

type State = {
  letters: String;
  definition: String;
};

class LetterForm extends React.Component {
  state: State = { letters: "", definition: "" };

  render() {
    return (
      <>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            this.getDefinition(event)
          }
        >
          <label>
            <input type="text" name="letters" placeholder="Scrabble letters" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.definition}
      </>
    );
  }

  getDefinition = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log(e);
    e.preventDefault();
    fetch(
      `localhost:4000/api/nearest-neighbor?word=${this.state.letters}&N=${10}`,
      {
        method: "GET"
      }
    )
      .then(result => result.json())
      .then(definition => this.setState({ definition }))
      .catch(error => {
        throw new Error(error);
      });
  };
}

export default LetterForm;
