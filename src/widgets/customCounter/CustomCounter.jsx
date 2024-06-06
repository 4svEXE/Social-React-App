import React, { Component } from "react";
import "./CustomCounter.scss";

export default class CustomCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  countVisualiser() {
    var visualiser = setInterval(() => {
      if (this.state.count >= this.props.count) {
        clearInterval(visualiser);
        return null;
      } else {
        this.setState({ count: this.state.count + 1 });
      }
    }, 100);
  }

  componentDidMount() {
    this.countVisualiser();
  }

  render() {
    return (
      <div className="CustomCounter p-4 md:p-1 flex flex-col justify-center content-center text-center">
        <strong className="text-purple text-6xl">{this.state.count}+</strong>
        <span className="text-black dark:text-white mt-4">
          {this.props.text}
        </span>
      </div>
    );
  }
}
