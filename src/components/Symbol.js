import React from "react";
import Images from "../assets/images";
import Constants from "../config/Constants";

export default class Symbol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  getImage = () => {
    let imgSource;
    let imgAlt;
    switch (this.props.symbol) {
      case "1":
        imgSource = Images.bar;
        imgAlt = "Bar";
        break;
      case "2":
        imgSource = Images.twobar;
        imgAlt = "2 x Bar";
        break;
      case "3":
        imgSource = Images.threebar;
        imgAlt = "3 x Bar";
        break;
      case "C":
        imgSource = Images.cherry;
        imgAlt = "Cherry";
        break;
      case "7":
        imgSource = Images.seven;
        imgAlt = "Seven";
        break;
      default:
        imgSource = Images.cherry;
        imgAlt = "Cherry";
    }

    return { imgSource, imgAlt };
  };

  setActive = (active) => {
    this.setState({
      active: active,
    });
  };

  render() {
    let img = this.getImage();

    return (
      <>
        <div className="symbol">
          <img
            src={img.imgSource}
            alt={img.imgAlt}
            style={{
              width: `${Constants.SYMBOL_HEIGHT - Constants.SYMBOL_PAD}px`,
              height: `${Constants.SYMBOL_HEIGHT - Constants.SYMBOL_PAD}px`,
              margin: `${Constants.SYMBOL_PAD / 2}px`,
              backgroundColor: this.state.active ? "#fff" : ""
            }}
          />
        </div>
      </>
    );
  }
}
