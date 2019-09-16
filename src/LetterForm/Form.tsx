import React from "react";
import "./Form.css";

type State = {
  definition: string;
};

type Props = {};

class LetterForm extends React.Component {
  state: State;
  private letters: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = { definition: "" };
    this.letters = React.createRef();
  }

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
              name="letters"
              placeholder="Scrabble letters"
              ref={this.letters}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.definition}
      </>
    );
  }

  getDefinition = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!this.letters.current) {
      return;
    }
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("crossDomain", "true");
    const api = `http://localhost:4000/api/nearest-neighbor?word=${
      this.letters.current.value
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
