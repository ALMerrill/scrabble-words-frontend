import React from "react";
import "./Form.css";

type State = {
  letters: string;
  definition: string;
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
            <input
              type="text"
              onChange={this.handleChange}
              name="letters"
              placeholder="Scrabble letters"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.definition}
      </>
    );
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ letters: e.target.value });
  };

  getDefinition = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("crossDomain", "true");
    const api = `http://localhost:4000/api/nearest-neighbor?word=${
      this.state.letters
    }&N=${10}`;
    fetch(api, {
      method: "get",
      mode: "cors",
      headers: requestHeaders
    })
      .then(result => result.json())
      .then(definition => this.setState({ definition }))
      .catch(error => {
        throw new Error(error);
      });
  };
}

export default LetterForm;
