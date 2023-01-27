import React, { Component } from "react";
import Table from "../Table";

export default class MyLinks extends Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount(): void {
    fetch("https://localhost:7161/api/Links/GetAllLinks")
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
          {/* <thead>
              <tr>
                <th>FullUrl</th>
                <th>ShortUrl</th>
                <th>IsPrivate</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  for(var i; i<table.length; i++){

                  }
                   {items.map((item:any) => (
                    <tr key={item.FullUrl}> <td> {item.fullUrl}</td> </tr>
                  ))}
                  {items.map((item:any) => (
                    <td key={item.ShortUr}> <td>{item.shortUrl}</td></td>
                  ))}
                  {items.map((item:any) => (
                    <tr key={item.IsPrivate}> <td>{item.isPrivate}</td></tr>
                  ))} 
                </tr>
            </tbody>
          </table> */}

          {/* scripts {
    <script>
        $(function() {
            $('.toggle').change(function() {
                var self = $(this);
                var url = self.data('url');
                var id = self.attr('id');
                var value = self.prop('checked');

                $.ajax({
                    url: url,
                    data: { id: id },
                    type: 'PATCH',
                });
            });
        });
    </script> */}
        </div>
      );
    }
  }
}
