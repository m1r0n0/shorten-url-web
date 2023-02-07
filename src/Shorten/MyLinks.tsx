import React, { Component } from "react";
import Table from "../Table";

export default class MyLinks extends Component<any, any, null> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount(): void {
    fetch("https://localhost:7161/api/Shorten/GetAllLinks")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.urlList,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  getHeadings = () => {
    const { items, isLoaded, error } = this.state;
    return Object.keys(items[0]);
  };

  render() {
    const { items, isLoaded, error } = this.state;
    var table = Object.keys(items);
    if (error) {
      return <p> Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <h1>My links</h1>
          <Table theadData={this.getHeadings()} tbodyData={items} />
        </div>
      );
    }
  }
}
