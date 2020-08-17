import React, { Component } from 'react';

class Resume extends Component {
  render() {

    if(this.props.data){
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function(education) {
        return <div key={education.school}><h3>{education.school}</h3>
        <p className="info">{education.degree} <span>|</span><em className="date">{education.graduated}</em><span>|</span><a href={education.degree_url} target="_blank" rel="noopener noreferrer">Official webpage</a></p>
        <p>{education.description}</p></div>
      })
      var other_certs = this.props.data.other_certs.map(function(other_certs) {
        return (
          <div key={other_certs.cert_url}>
            <h3>{other_certs.name}</h3>
            <p className="info">{other_certs.organization} <span>|</span><em className="date">{other_certs.graduated}</em><span>|</span><a href={other_certs.cert_url} target="_blank" rel="noopener noreferrer"> Certificate </a></p>
            
          </div>
        )
      })
      var work = this.props.data.work.map(function(work){
        return <div key={work.company}><h3>{work.company}</h3>
            <p className="info">{work.title}<span>|</span> <em className="date">{work.years}</em></p>
            <p>{work.description}</p>
        </div>
      })
      var skills = this.props.data.skills.map(function(skills){
        var className = 'bar-expand '+skills.name.toLowerCase();
        return <li key={skills.name}><span style={{width:skills.level}}className={className}></span><em>{skills.name}</em></li>
      })
    }

    return (
      <section id="resume">

      <div className="row education">
         <div className="three columns header-col">
            <h1><span>Education</span></h1>
         </div>

         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                 {education}
               </div>
            </div>
         </div>
      </div>

      <br></br>

      <div className="row education">
         <div className="three columns header-col">
            <h1><span>Certifications</span></h1>
         </div>

         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                 {other_certs}
               </div>
            </div>
         </div>
      </div>

      <br></br>

      <div className="row work">
         <div className="three columns header-col">
            <h1><span>Work</span></h1>
         </div>
         <div className="nine columns main-col">{work}</div>
      </div>



      <div className="row skill">

         <div className="three columns header-col">
            <h1><span>Skills</span></h1>
         </div>

         <div className="nine columns main-col">

            <p>{skillmessage}
            </p>

				<div className="bars">
				   <ul className="skills">
					  {skills}
					</ul>
				</div>
			</div>
      </div>
   </section>
    );
  }
}

export default Resume;
