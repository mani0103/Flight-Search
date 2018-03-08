import React, { Component } from 'react';
import { Table } from 'react-bootstrap';


class FlightsTable extends Component {
    render() {
      
      if (this.props.data.loading) return <div>Loading...</div>;
      if (this.props.data.error) return <div>Error :(</div>;
      console.log(this.props.data)
      return (
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>departure</th>
              <th>arrival</th>
              <th>price</th>
              <th>currency</th>
              <th>legs</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.data.allFlights.edges.map((edge, index) => 
            <tr key={index}>
              <td key="departure">{edge.node.departure.time}</td>
              <td key="arrival">{edge.node.arrival.time}</td>
              <td key="price">{edge.node.price.amount}</td>
              <td key="currency">{edge.node.price.currency}</td>
              <td key="legs">{edge.node.legs.length}</td>
            </tr>
            )
          }
          </tbody>
        </Table>
      )
    }
}

export default FlightsTable;