import React from "react";
import Reel from "./Reel";
import Constants from "../config/Constants";
import PayTable from "./PayTable";

export default class ReelSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reels: Array.from({ length: Constants.REELS }, (_, index) => index),
      width: "200px",
      height: "200px",
      score: 60,
      spinning: false,
      fixedOffset: [28,28,28]
    };
    this.reels = [];
    this.reelsInMotion = null;
    this.spinResults = []; // [[reel1 results], [eel2 results], [reel3 results]]
    this.winningLines = []; // [lineIdx, symbol]
    this.payTable=null;
  }

  spin = (mode) => {
    
    if(this.state.spinning) return

    // Pay for the spin, set mode
    this.setState((state) => {return {...state, score: state.score - Constants.SPIN_COST, spinning: true}})

    // Mark all reels spinning
    this.reelsInMotion = Constants.REELS;


    for (let i = 0; i < Constants.REELS; i++) {
      let min =
        (Constants.REEL_RERUNS - 7) * Array.from(this.reels[i].symbols).length + 1; // 3 * 5 = 15
      let max =
        (Constants.REEL_RERUNS - 4) * Array.from(this.reels[i].symbols).length; // 3 * 5 = 15
      
      if(mode){
        this.reels[i].scrollByOffset(
          this.randomBetween(min, max),
          (reelIdx, results) => {
            
            //Mark reel not spinning
            this.reelsInMotion -= 1;

            // results = [...]
            // spinResults = [ [reel1 results], [reel2 results], [reel3 results] ]
            this.spinResults[reelIdx] = results;
            
            //When all reels stop spinning, evaluate
            if (this.reelsInMotion === 0) {
                setTimeout(()=> this.evaluateResults(), 1000) 
            }
          }
        )
      }else{
        this.reels[i].scrollToDestination(
          this.state.fixedOffset[i],
          (reelIdx, results) => {
            
            //Mark reel not spinning
            this.reelsInMotion -= 1;

            // results = [...]
            // spinResults = [ [reel1 results], [reel2 results], [reel3 results] ]
            this.spinResults[reelIdx] = results;
            
            //When all reels stop spinning, evaluate
            if (this.reelsInMotion === 0) {
                setTimeout(()=> this.evaluateResults(), 1000) 
            }
          }
        )
      }
    }
  };
  
  evaluateResults = () => {

    this.winningLines = []
    
    // For each defined line sequence, check how long a streak a symbol has in that sequence.
    for(let lineIdx = 0; lineIdx < Constants.LINES.length; lineIdx++) {
      let streak  = 0;
      let currentSymbol = null;
      
      for (let coordIdx = 0; coordIdx < Constants.LINES[lineIdx].length; coordIdx++){
        
        let coords = Constants.LINES[lineIdx][coordIdx] // 0 0 , [0,0]
        let symbolAtCoords = this.spinResults[coords[0]][coords[1]-1]
        
        // Start checking from left to right
        if (coordIdx === 0){
          if (symbolAtCoords == null) break
          currentSymbol = symbolAtCoords
          streak = 1
        }else{
          if ((currentSymbol === "C" || currentSymbol === "7oC") && symbolAtCoords === "7") {
            currentSymbol="7oC" 
          }
          else if ((currentSymbol === "7" || currentSymbol === "7oC") && symbolAtCoords === "C") {
            currentSymbol="7oC" 
          }
          else if ((currentSymbol === "1" || currentSymbol === "AnyBar") && (symbolAtCoords === "2" || symbolAtCoords === "3" )) {
            currentSymbol="AnyBar"
          }
          else if ((currentSymbol === "2" || currentSymbol === "AnyBar") && (symbolAtCoords === "1" || symbolAtCoords === "3" )) {
            currentSymbol="AnyBar"
          }
          else if ((currentSymbol === "3" || currentSymbol === "AnyBar") && (symbolAtCoords === "2" || symbolAtCoords === "1" )) {
            currentSymbol="AnyBar"
          }
          else if(symbolAtCoords !== currentSymbol) break

          streak++    
        }
      }

      if (streak >= 3){this.winningLines.push([lineIdx, currentSymbol])}
    }

    this.highlightWinningLines(0)
    this.setState((state) => {return {...state, spinning: false}})
  }
  
  highlightWinningLines = (currentIdx) => {
    if (!this.winningLines.length) return;
    
    // Turn off the previous highlight
    if(currentIdx > 0) {
      Constants.LINES[this.winningLines[currentIdx -1][0]].map((el)=> {
        this.reels[el[0]].highlightAtIndex(Math.floor(el[1] / 2), false)
      })
      
    }

    if (currentIdx > this.winningLines.length -1) return;
    
    Constants.LINES[this.winningLines[currentIdx][0]].map((el)=> {
      this.reels[el[0]].highlightAtIndex(Math.floor(el[1] / 2), true)
    })

    
    this.payTable.highlightPayOutLines(this.winningLines[currentIdx][1], Constants.LINES[this.winningLines[currentIdx][0]][0][1] )
    this.addScore(this.winningLines[currentIdx][1], Constants.LINES[this.winningLines[currentIdx][0]][0][1])

    // Time the next function iteration
    setTimeout(() => {
      this.highlightWinningLines(currentIdx + 1)
    }, 800);
  }
  
  //Random number between and including Min/Max
  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  addScore = (symbol, line) => {
    if (symbol === "C" && line === 1) {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[0][2] }})}
    if (symbol === "C" && line === 2) {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[1][2] }})}
    if (symbol === "C" && line === 3) {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[2][2] }})}
    if (symbol === "7") {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[3][2] }})}
    if (symbol === "7oc") {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[4][2] }})}
    if (symbol === "3") {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[5][2] }})}
    if (symbol === "2") {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[6][2] }})}
    if (symbol === "1") {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[7][2] }})}
    if (symbol === "AnyBar") {this.setState((state) => { return { ...state, score: state.score + Constants.PAYOUT_COMBINATIONS[8][2] }})}
  }

  setScore = (score) => {
    this.setState((state) => { return { ...state, score: score}})
  }

  setFixed = (reel, symbol, position) => {
    /* console.log(`Reel: ${reel}, Symbol: ${symbol}, position: ${position}`) */

    let results1 = this.state.fixedOffset[0]
    let results2 = this.state.fixedOffset[1]
    let results3 = this.state.fixedOffset[2]
    let results = []

    if (symbol === "C") {
      let newDestination = 29 - parseInt(position)

      if (reel === 0) results=[newDestination, results2, results3]
      if (reel === 1) results=[results1, newDestination, results3]
      if (reel === 2) results=[results1, results2, newDestination]
      
      this.setState((state) => { return {...state, fixedOffset: results}})
    }
    else if (symbol === "7") {
      let newDestination = 27 - parseInt(position)
      
      if (reel === 0) results=[newDestination, results2, results3]
      if (reel === 1) results=[results1, newDestination, results3]
      if (reel === 2) results=[results1, results2, newDestination]
      
      this.setState((state) => { return {...state, fixedOffset: results}})
    }
    else if (symbol === "2") {
      let newDestination = 25 - parseInt(position) 
     
      if (reel === 0) results=[newDestination, results2, results3]
      if (reel === 1) results=[results1, newDestination, results3]
      if (reel === 2) results=[results1, results2, newDestination]
      
      this.setState((state) => { return {...state, fixedOffset: results}})
    }
    else if (symbol === "1") {
      let newDestination = 23 - parseInt(position) 
      
      if (reel === 0) results=[newDestination, results2, results3]
      if (reel === 1) results=[results1, newDestination, results3]
      if (reel === 2) results=[results1, results2, newDestination]
      
      this.setState((state) => { return {...state, fixedOffset: results}})
    }
    else if (symbol === "3") {
      let newDestination = 21 - parseInt(position) 
      
      if (reel === 0) results=[newDestination, results2, results3]
      if (reel === 1) results=[results1, newDestination, results3]
      if (reel === 2) results=[results1, results2, newDestination]
      
      this.setState((state) => { return {...state, fixedOffset: results}})
    }

  }

  renderReels = () => {
    return (
      <>
        {this.state.reels.map((reel, idx) => {
          return (
            <Reel
              key={idx}
              index={idx}
              width={this.state.width}
              height={this.state.height}
              ref={(ref) => {
                this.reels[idx] = ref;
              }}
            />
          );
        })}
      </>
    );
  };

  render() {
    return (
    <>
    <div className="score"><h2>Score: {this.state.score}</h2></div>
    <div style={{display: "flex", flexDirection: "row"}}>
    <div className="paytable">
      <PayTable ref={(ref) => {
              this.payTable = ref;
            }}/> 
    </div>
      <div className="screen">{this.renderReels()}</div>
    </div> 
    
    </>
    )
  }
}

