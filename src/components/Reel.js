import React from "react";
import Symbol from "./Symbol";
import Constants from "../config/Constants";
import { motion } from "framer-motion";

export default class Reel extends React.Component {
  constructor(props) {
    super(props);
    this.symbols = Constants.SYMBOL_SEQUENCE[this.props.index]
    this.reelSymbols = this.symbols.repeat(Constants.REEL_RERUNS);
    this.symbolHeight = this.props.height;

    this.symbolRefs = [];

    this.position = this.reelSymbols.length * 2 - this.symbols.length * 4; // Starting num in reel. Start from reel 2. Theres 2 positions for every symbol.

    this.initialScrollHeight =
      this.position * (Constants.SYMBOL_HEIGHT / 2) * -1; // Add Height Position He. Push reel to top.

    this.state = {
      scrollHeight: 0,
      positionNum: this.position,
      spin: false,
      results: [], // [pos1, pos2, pos3]
    };
  }


  scrollToDestination = (destination, callback) => {
    let offset = this.state.positionNum - destination;
    this.scrollByOffset(offset, callback)
  }
  
  scrollByOffset = (offset, callback) => {
    

    this.setState(
      (state) => {
        return {
          spin: true,
          scrollHeight:
            state.scrollHeight + (offset * Constants.SYMBOL_HEIGHT) / 2,
          positionNum: state.positionNum - offset,
          results: [],
        };
      },
      () => this.returnToReelTwo(callback)
    );

  };

  returnToReelTwo = (callback) => {
    setTimeout(
      () => this.afterRoll(callback),
      Constants.SPIN_SPEED * 1000 + this.props.index * 570
    );
    
  };

  afterRoll = (callback) => {
    
    //find current position in reel -> 10 - 65 % 10 = 5
    let posNumInReel =
      this.symbols.length * 2 -
      (this.state.positionNum % (this.symbols.length * 2));

    // ScrollHeight in equivalent position in second reel -> 5 *
    let backToSecondReel = posNumInReel * (Constants.SYMBOL_HEIGHT / 2) - 1000;

    let posInReelTwo =
      this.reelSymbols.length * 2 - posNumInReel - this.symbols.length * 2;

    this.setState((state) => {
      return {
        spin: false,
        scrollHeight: backToSecondReel,
        positionNum: posInReelTwo,
      };
    });

    this.setResults();
    //this.setVisibleActive(false);
   
    callback(this.props.index, this.state.results)
  };

  setVisibleActive = (active) => {
    // Set visible symbols from active to false. If position is even, then theres 2 visible symbols. If odd, then 3.
    if (this.state.positionNum % 2 !== 0) {
      for (let i = 0; i <= Constants.NUM_SYMBOLS; i++) {
        this.symbolRefs[Math.floor(this.state.positionNum / 2) + i].setActive(
          active
        );
      }
    } else if (this.state.positionNum % 2 === 0) {
      for (let i = 0; i < Constants.NUM_SYMBOLS; i++) {
        this.symbolRefs[Math.floor(this.state.positionNum / 2) + i].setActive(
          active
        );
      }
    }
  };

  setResults = () => {
    // If position is even, then theres 2 visible results. If odd, then 1.
    if (this.state.positionNum % 2 !== 0) {
      this.setState((state) => {
        return {
          ...state, 
          results: [null, this.reelSymbols[Math.floor(this.state.positionNum / 2) + 1], null ]}
      })
      
    } else if (this.state.positionNum % 2 === 0) {
      this.setState((state) => {
        return {
          ...state, 
          results: [this.reelSymbols[Math.floor(this.state.positionNum / 2)], null, this.reelSymbols[Math.floor(this.state.positionNum / 2) + 1] ]}
      })
      
    }
  };
  
  highlightAtIndex = (index, highlight) => {
    this.symbolRefs[Math.floor(this.state.positionNum / 2) + index].setActive(highlight)
  }

  render() {
    let transition;
    this.state.spin
      ? (transition = {
          duration: Constants.SPIN_SPEED,
          delay: this.props.index * 0.5,
        })
      : (transition = { duration: 0, delay: this.props.index * 0.5 });

    return (
      <div className="reel">
        <motion.div
          transition={transition}
          animate={{ y: this.state.scrollHeight }}
          style={{
            width: this.props.width,
            height: `${Constants.SYMBOL_HEIGHT * this.reelSymbols.length}px`,
            position: "relative",
            top: `${this.initialScrollHeight}px`,
          }}>
          {Array.from(this.reelSymbols).map((symbol, idx) => {
            return (
              <Symbol
                key={idx}
                index={idx}
                symbol={symbol}
                ref={(ref) => {
                  //fill this.symbolRef with refs to symbols
                  this.symbolRefs[idx] = ref;
                }}
              />
            );
          })}
        </motion.div>
      </div>
    );
  }
}
