import React from "react";
import PayLine from "./PayLine";
import Constants from "../config/Constants"

export default class PayTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        lines: Array.from({ length: Constants.PAYOUT_LINES }, (_, index) => index),
    };

    this.lines = []
  }

  highlightPayOutLines = (symbol, line) => {
    console.log(`Symbol: ${symbol}, Line: ${line}`)

    if (symbol === "C" && line === 1) {this.lines[0].setActive()}
    if (symbol === "C" && line === 2) {this.lines[1].setActive()}
    if (symbol === "C" && line === 3) {this.lines[2].setActive()}
    if (symbol === "7") {this.lines[3].setActive()}
    if (symbol === "7oC") {this.lines[4].setActive()}
    if (symbol === "3") {this.lines[5].setActive()}
    if (symbol === "2") {this.lines[6].setActive()}
    if (symbol === "1") {this.lines[7].setActive()}
    if (symbol === "AnyBar") {this.lines[8].setActive()}

  }

  renderLines = () => {
    return (
      <>
        {this.state.lines.map((line, idx) => {
          return (
            <PayLine
              key={idx}
              index={idx}
              ref={(ref) => {
                this.lines[idx] = ref;
              }}
              symbol={Constants.PAYOUT_COMBINATIONS[idx][0]}
              line={Constants.PAYOUT_COMBINATIONS[idx][1]}
              payout={Constants.PAYOUT_COMBINATIONS[idx][2]}
            />
          );
        })}
      </>
    );
  };
  render() {
    
    return (
      <>
        {this.renderLines()}
      </>
    );
  }
}
