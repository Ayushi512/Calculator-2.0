import React, { Component } from "react";

const keys = [
  ["clear", "AC", "keyboard__key--twocolumns keyboard__key--ac"],
  ["divide", "/", "keyboard__key--light"],
  ["multiply", "*", "keyboard__key--light"],
  ["seven", "7", "keyboard__key--dark"],
  ["eight", "8", "keyboard__key--dark"],
  ["nine", "9", "keyboard__key--dark"],
  ["subtract", "-", "keyboard__key--light"],
  ["four", "4", "keyboard__key--dark"],
  ["five", "5", "keyboard__key--dark"],
  ["six", "6", "keyboard__key--dark"],
  ["add", "+", "keyboard__key--light"],
  ["one", "1", "keyboard__key--dark"],
  ["two", "2", "keyboard__key--dark"],
  ["three", "3", "keyboard__key--dark"],
  ["equals", "=", "keyboard__key--tworows keyboard__key--equal"],
  ["zero", "0", "keyboard__key--twocolumns keyboard__key--dark"],
  ["decimal", ".", "keyboard__key--dark"],
];

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all: "",
      buffer: 0,
    };
  }

  handleKey(event) {
    /* console.log(event);
    console.log(event.target.innerHTML); */
    let keyName = event.target.innerHTML;
    let areTwoOperators =
      this.state.all[this.state.all.length - 1] === "*" ||
      this.state.all[this.state.all.length - 1] === "/" ||
      this.state.all[this.state.all.length - 1] === "+" ||
      this.state.all[this.state.all.length - 1] === "-";
    let areThreeOperators =
      this.state.all[this.state.all.length - 1] === "-" &&
      (this.state.all[this.state.all.length - 2] === "*" ||
        this.state.all[this.state.all.length - 2] === "/" ||
        this.state.all[this.state.all.length - 2] === "+" ||
        this.state.all[this.state.all.length - 2] === "-");
    let beforeIsMult = this.state.all[this.state.all.length - 1] === "*";

    switch (keyName) {
      case "AC":
        this.setState({ all: "", buffer: 0 });
        break;
      case "=":
        if (this.state.all.includes("=")) {
          console.log(this.state.all.slice(this.state.all.indexOf("=") + 1));

          this.setState({
            all: eval(this.state.all.slice(this.state.all.indexOf("=") + 1)),
          });
        } else {
          this.setState({
            all: this.state.all + "=" + eval(this.state.all),
            buffer: eval(this.state.all),
          });
        }

        break;
      case "*":
        this.setState({
          all: areThreeOperators
            ? this.state.all.slice(0, this.state.all.length - 2) + keyName
            : areTwoOperators
            ? this.state.all.slice(0, this.state.all.length - 1) + keyName
            : this.state.all + keyName,
          buffer: keyName,
        });
        break;
      case "/":
        this.setState({
          all: areThreeOperators
            ? this.state.all.slice(0, this.state.all.length - 2) + keyName
            : areTwoOperators
            ? this.state.all.slice(0, this.state.all.length - 1) + keyName
            : this.state.all + keyName,
          buffer: keyName,
        });
        break;
      case "+":
        this.setState({
          all: areThreeOperators
            ? this.state.all.slice(0, this.state.all.length - 2) + keyName
            : areTwoOperators
            ? this.state.all.slice(0, this.state.all.length - 1) + keyName
            : this.state.all + keyName,
          buffer: keyName,
        });
        break;
      case "-":
        this.setState({
          all: areTwoOperators
            ? !beforeIsMult
              ? this.state.all.slice(0, this.state.all.length - 1) + keyName
              : this.state.all + keyName
            : this.state.all + keyName,
          buffer: keyName,
        });
        break;
      case "0":
        console.log(this.state.buffer[this.state.buffer.length - 1]);
        if (this.state.buffer[this.state.buffer.length - 1] !== undefined && this.state.buffer[this.state.buffer.length - 1] !== "0") {
          this.setState({
            buffer:
              this.state.buffer === 0 || this.state.buffer === "*" || this.state.buffer === "/" || this.state.buffer === "-" || this.state.buffer === "+"
                ? keyName
                : this.state.buffer + keyName,
            all: this.state.all + keyName,
          });
        } else {
          this.setState({
            buffer: keyName,
          });
        }
        break;
      case ".":
        /* console.log(this.state.buffer.includes(".")); */
        if (!this.state.buffer.includes(".")) {
          this.setState({
            buffer: this.state.buffer + keyName,
            all: this.state.all + keyName,
          });
        }

        break;
      default:
        /* if (!this.state.all.includes("=")) { */
        this.setState({
          buffer:
            this.state.buffer === 0 || this.state.buffer === "*" || this.state.buffer === "/" || this.state.buffer === "-" || this.state.buffer === "+"
              ? keyName
              : this.state.buffer + keyName,
          all: this.state.all + keyName,
        });
        /* } else {
          this.setState({
            buffer:
              this.state.buffer === 0 || this.state.buffer === "*" || this.state.buffer === "/" || this.state.buffer === "-" || this.state.buffer === "+"
                ? keyName
                : this.state.buffer + keyName,
            all: this.state.all + keyName,
          });
        } */
        break;
    }

    /*  if (keyName === "AC") {
      this.setState({
        all: "",
        buffer: 0,
      });
    } else if (keyName === "=") {
      let result = eval(this.state.all + this.state.buffer);
      this.setState({
        all: this.state.all + this.state.buffer + "=" + result,
        buffer: result,
      });
    } else if (keyName === "/" || keyName === "*" || keyName === "-" || keyName === "+") {
      this.setState({
        all: this.state.all + this.state.buffer,
        buffer: keyName,
      });
    } else {
      if (this.state.buffer === "/" || this.state.buffer === "*" || this.state.buffer === "-" || this.state.buffer === "+" || this.state.buffer === "=") {
        this.setState({
          all: this.state.all + this.state.buffer,
          buffer: keyName,
        });
      } else {
        this.setState({
          buffer: this.state.buffer + keyName,
        });
      }
    } */
  }

  render() {
    return (
      <div className="calculator">
        <div className="display">
          <div className="display__all">{this.state.all}</div>
          <div className="display__buffer" id="display">
            {this.state.buffer}
          </div>
        </div>
        <div className="keyboard">
          {keys.map((key) => (
            <div id={key[0]} key={key[1]} className={`keyboard__key ${key[2]}`} onClick={this.handleKey.bind(this)}>
              {key[1]}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
