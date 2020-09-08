import React from "react";
import Images from "../assets/images";

export default class PayLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  setActive = () => {
    this.setState((state) => {
      return {
        active: !state.active,
      }
      
    });
    setTimeout(() => {
      this.setState((state) => {
        return {
          active: !state.active,
        }
        
      });
    }, 800);
  };

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
      case "7oC":
        imgSource = Images.sevenOrCherry;
        imgAlt = "Seven or Cherry";
        break;
      case "AnyBar":
        imgSource = Images.anyBar;
        imgAlt = "Any Bar";
        break;
      default:
        imgSource = Images.cherry;
        imgAlt = "Cherry";
    }

    return { imgSource, imgAlt };
  };
  render() {
    let img = this.getImage();
    return (
      <>
        <div className="pay-row" style={{backgroundColor: this.state.active ? "#fff" : "#c2217f"}} >
          <span className="pay-column">
            <img
              className="pay-symbol"
              src={img.imgSource}
              alt={img.imgAlt}
              
            />
            <img
              className="pay-symbol"
              src={img.imgSource}
              alt={img.imgAlt}
              
            />
            <img
              className="pay-symbol"
              src={img.imgSource}
              alt={img.imgAlt}
              
            />
          </span>
          <span className="pay-column">
            <p><strong>{this.props.line}</strong></p>
          </span>
          <span className="pay-column">
          <p><strong>{this.props.payout}</strong></p>
          </span>
        </div>
      </>
    );
  }
}
