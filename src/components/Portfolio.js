import React, { Component } from 'react';

class Portfolio extends Component {
  render() {
    if(this.props.data) {
      var projects = this.props.data.projects.map(function(projects){
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title} target="_blank" without rel="noopener noreferrer">
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="freelancing">
        <div className="row">
          <h2>Hire my freelance services</h2>
          <br></br>
          <div className="twelve columns collapsed">
              <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                  {projects}
              </div>
            </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
