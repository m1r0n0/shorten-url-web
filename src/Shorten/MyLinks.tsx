import React, { Component } from "react";
import Table from "../Table";
import { API, SHORTEN, GET_ALL_LINKS } from "../JS/routeConstants";

export default class MyLinks extends Component {
  public state = {
    items: [],
    isLoaded: false,
    error: null,
  };

  private getAllLinksURI: string = `${API}/${SHORTEN}/${GET_ALL_LINKS}`;

  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount(): void {
    fetch(this.getAllLinksURI)
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
    const { items } = this.state;
    return Object.keys(items[0]);
  };

  render() {
    const { items, isLoaded } = this.state;
    var table = Object.keys(items);
    if (!isLoaded) {
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
