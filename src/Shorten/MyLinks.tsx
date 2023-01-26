import React, { Component } from 'react'

export default class MyLinks extends Component<any, any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            error: null
        }
    }

    componentDidMount(): void {
        fetch("https://localhost:7161/api/Links/GetLinksForCurrentUser")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.urlList
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

  render() {
    const { items, isLoaded, error} = this.state;
    if (error){
        return <p> Error {error.message}</p>
    }
    return (
      <div>
        <h1>My links</h1>

<table className="table">
    <thead>
        <tr>
            <th>
                FullUrl
            </th>
            <th>
                ShortUrl
            </th>
            <th>
                IsPrivate
            </th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model.UrlList)
        {
            <tr>
                <td>
                    //FullUrl
                </td>
                <td>
                    //ShortUrl
                </td>
                <td>
                    //IsPrivate
                </td>
            </tr>
        }
    </tbody>
</table>

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
    )
  }
}
