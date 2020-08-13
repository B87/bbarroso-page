import React, { Component } from 'react';
import Portfolio from './Portfolio'

class Freelancing extends Component {
  render() {

    if(this.props.data){
      var portfolio = this.props.data.portfolio
      
    }

    return (
        <section id="freelancing">
          
          <h2> Hire my freelance services </h2>

          <Portfolio data={portfolio}></Portfolio>
        </section>
    );
  }
}

export default Freelancing;
