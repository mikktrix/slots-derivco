import React from "react";
/* import Constants from "../config/Constants"; */
import ReelSet from "./ReelSet";
import "../styles/App.scss";

/* function spin() {
  console.log("spin event");
} */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.reelSet = null;
    this.state = {
      inputValue: '',
      reel1Symbol: "C",
      reel1Position: "1",
      reel2Symbol: "C",
      reel2Position: "1",
      reel3Symbol: "C",
      reel3Position: "1",
    };
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    }, () => this.updateScore(this.state.inputValue));
  }

  updateScore = (score) => {
    if(score > 0 && score < 5000){
      this.reelSet.setScore(score)
    }
  }

  changeForms = (field, value) => {
    if (field === "reel1Symbol"){
      this.setState({reel1Symbol: value}, () => this.reelSet.setFixed(0,this.state.reel1Symbol,this.state.reel1Position))
    }
    else if (field === "reel2Symbol"){
      this.setState({reel2Symbol: value}, () => this.reelSet.setFixed(1,this.state.reel2Symbol,this.state.reel2Position))
    }
    else if (field === "reel3Symbol"){
      this.setState({reel3Symbol: value}, () => this.reelSet.setFixed(2,this.state.reel3Symbol,this.state.reel3Position))
    }
    else if (field === "reel1Position"){
      this.setState({reel1Position: value}, () => this.reelSet.setFixed(0,this.state.reel1Symbol,this.state.reel1Position))
    }
    else if (field === "reel2Position"){
      this.setState({reel2Position: value}, () => this.reelSet.setFixed(1,this.state.reel2Symbol,this.state.reel2Position))
    }
    else if (field === "reel3Position"){
      this.setState({reel3Position: value}, () => this.reelSet.setFixed(2,this.state.reel3Symbol,this.state.reel3Position))
    }
  }

  render() {
    return (
      <>
      <form style={{marginTop: "50px"}}>
        <label htmlFor="scoreset">Set score:</label>
        <input type="number" id="scoreset" value={this.state.inputValue} onChange={e => this.updateInputValue(e)}></input>
      </form>
        <ReelSet
            ref={(ref) => {
              this.reelSet = ref;
            }}
          />
        
        <button
          className="spin-button"
          onClick={() => this.reelSet.spin(true)}>
          <h3>SPIN RANDOM</h3>
        </button>
        <button
          className="spin-button"
          onClick={() => this.reelSet.spin(false)}>
          <h3>SPIN FIXED</h3>
        </button>
        
        <form>
            <label htmlFor="reel1">Reel 1 symbol:</label>
            <select name="reel1" id="reel1"
              value={this.state.reel1Symbol} onChange={e => 
              this.changeForms("reel1Symbol", e.target.value)
            }
            >
              <option value="1">Bar</option>
              <option value="2">2xBar</option>
              <option value="3">3xBar</option>
              <option value="7">Seven</option>
              <option value="C">Cherry</option>
            </select>

            <label htmlFor="reel1Pos">Reel 1 position:</label>
            <select name="reel1Pos" id="reel1Pos" 
              value={this.state.reel1Position} onChange={e => 
              this.changeForms("reel1Position", e.target.value)
              }
            >
              <option value={1}>Top</option>
              <option value={2}>Middle</option>
              <option value={3}>Bottom</option>
            </select>
          </form>    

          <form>
          <label htmlFor="reel2">Reel 2 symbol:</label>
          <select name="reel2" id="reel2"
            value={this.state.reel2Symbol} onChange={e => 
            this.changeForms("reel2Symbol", e.target.value)}
          >
            <option value="1">Bar</option>
            <option value="2">2xBar</option>
            <option value="3">3xBar</option>
            <option value="7">Seven</option>
            <option value="C">Cherry</option>
          </select>

          <label htmlFor="reel2Pos">Reel 2 position:</label>
          <select name="reel2Pos" id="reel2Pos"
            value={this.state.reel2Position} onChange={e => 
            this.changeForms("reel2Position", e.target.value)}
          >
            <option value={1}>Top</option>
            <option value={2}>Middle</option>
            <option value={3}>Bottom</option>
          </select>
        </form>

        <form>
          <label htmlFor="reel3">Reel 3 symbol:</label>
          <select name="reel3" id="reel3"
            value={this.state.reel3Symbol} onChange={e => 
            this.changeForms("reel3Symbol", e.target.value)}
          >
            <option value="1">Bar</option>
            <option value="2">2xBar</option>
            <option value="3">3xBar</option>
            <option value="7">Seven</option>
            <option value="C">Cherry</option>
          </select>

          <label htmlFor="reel3Pos">Reel 3 position:</label>
          <select name="reel3Pos" id="reel3Pos"
            value={this.state.reel3Position} onChange={e => 
            this.changeForms("reel3Position", e.target.value)}
          >
            <option value={1}>Top</option>
            <option value={2}>Middle</option>
            <option value={3}>Bottom</option>
          </select>
        </form>
      </>
    );
  }
}
