import React from "react";
import "./Form.css";
import ReactLoading from "react-loading";
import "./Form.css";

type State = {
  word: string;
  definition: string;
  loading: boolean;
};

type Props = {};

class LetterForm extends React.Component {
  state: State;
  private letters: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = { word: "", definition: "", loading: false };
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
              maxLength={7}
              ref={this.letters}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="result">
          {this.state.loading && (
            <ReactLoading
              type={"spinningBubbles"}
              color={"#ffffff"}
              height={150}
              width={80}
            />
          )}
          {this.state.word && (
            <Result word={this.state.word} definition={this.state.definition} />
          )}
        </div>
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
    this.setState({ word: "", definition: "", loading: true });
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
        this.setState({ loading: false });
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

const Result = (props: { word: string; definition: string }) => (
  <div className="w3-container">
    <div className="w3-card-4">
      <header className="w3-container w3-blue">
        <h1>{props.word}</h1>
      </header>

      <div className="w3-container">
        <p>{props.definition}</p>
      </div>
    </div>
  </div>
);

export default LetterForm;
