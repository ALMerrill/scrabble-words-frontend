import React from "react";
import "./Form.css";

type State = {
  word: string;
  definition: string;
};

type Props = {};

class LetterForm extends React.Component {
  state: State;
  private letters: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = { word: "", definition: "" };
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
        {this.state.word && `${this.state.word}: ${this.state.definition}`}
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
    const api = `http://localhost:4000/api/definition?letters=${this.letters.current.value}`;
    fetch(api, {
      method: "get",
      mode: "cors",
      headers: requestHeaders
    })
      .then(result => result.json())
      .then(json_result => {
        const word = json_result["word"]
          .split(" ")
          .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
        this.setState({
          definition: json_result["definition"],
          word: word
        });
      })
      .catch(error => {
        throw new Error(error);
      });
  };
}

export default LetterForm;
