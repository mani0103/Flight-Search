import React, { Component } from 'react';
import { Table, Pager } from 'react-bootstrap';


class FlightsTable extends Component {
    render() {
      
      if (this.props.loading) return <div>Loading...</div>;
      if (this.props.error) return <div>Error :(</div>;
      //console.log(this.props)
      return (
        <div>
          <Table striped bordered condensed hover responsive>
            <thead>
              <tr>
                <th>Airlines</th>
                <th>Departure Time</th>
                <th>Departure Location</th>
                <th>Arrival Time</th>
                <th>Arrival Location</th>
                <th>Price</th>
                <th>Currency</th>
                <th>Flights</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.allFlights.edges.map((edge, index) => 
              <tr key={index}>
                <td key="airlines">{edge.node.airlines.map(a => a.name).join(', ')}</td>
                <td key="departure-time">{edge.node.departure.time}</td>
                <td key="departure-location">{edge.node.departure.airport.city.name}: {edge.node.departure.airport.name}</td>
                <td key="arrival-time">{edge.node.arrival.time}</td>
                <td key="arrival-location">{edge.node.arrival.airport.city.name}: {edge.node.arrival.airport.name}</td>
                <td key="price">{edge.node.price.amount}</td>
                <td key="currency">{edge.node.price.currency}</td>
                <td key="legs">{edge.node.legs.map(a => `${a.departure.airport.city.name} -> ${a.arrival.airport.city.name}`).join(', ')}</td>
              </tr>
              )
            }
            </tbody>
          </Table>
          <Pager>
            <Pager.Item disabled={!this.props.allFlights.pageInfo.hasPreviousPage}  >Previous</Pager.Item>{' '}
            <Pager.Item disabled={!this.props.allFlights.pageInfo.hasNextPage} onClick={this.props.nextPage}>Next</Pager.Item>
          </Pager>
        </div>
      )
    }
}

export default FlightsTable;