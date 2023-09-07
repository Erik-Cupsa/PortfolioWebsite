import React, { useState } from 'react';
import './index.scss';

const Timeline = () => {
  const [events, setEvents] = useState([
    {
      date: 'May-September 2023',
      title: 'TRC Consulting, Inc.',
      description: [
        'Designed <b>30+ AWS Lambda Functions in AWS</b>, strategically leveraging <b>Lambda layers</b> to increase processing speed by <b>35% </b>and re-usability by <b>52%</b>, resulting in cost savings of <b>$1,000</b> per large scale deployment',
        'Implemented <b>15+</b> serverless workflows using <b>AWS Step Functions</b>, seamlessly integrating <b>REST APIs </b>and rigorously tested with <b>Postman</b>, resulting in a <b>65%</b> reduction in execution time and enhanced operational efficiency',
        'Crafted a <b>Spring Boot</b> application with a <b>Drools</b> logic engine, containerized it using <b>Docker</b>, and seamlessly deployed it on <b>AWS</b> using <b>EC2</b>, strategically allocating cloud resources to ensure enhanced scalability and reliability',
      ],
      expanded: false,
    },
    {
      date: 'May-September 2022',
      title: 'Government Of Canada',
      description: [
        'Automated documentation on <b>Azure</b> by constructing a custom <b>Python pipeline</b> to convert PDF and word files to Markdown syntax, saving <b>95%</b> of wiki writing time',
        'Engineered <b>Python</b> code to efficiently extract and process <b>100+</b> codes from a <b>data lake</b>, seamlessly integrating them into a <b>pipeline</b> for subsequent extraction and analysis, streamlining data workflows and enhancing data utilization',
        'Centralized the code base for <b>15+</b> software developers on <b>Azure</b>, using <b>SQL</b> to manage databases, resulting in streamlined collaboration, efficient version control, and improved coordination',
      ],
      expanded: false,
    },
  ]);

  const handleItemClick = (index) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event, idx) => {
        if (idx === index) {
          return { ...event, expanded: !event.expanded };
        }
        return event;
      });
      return updatedEvents;
    });
  };

  return (
    <div className="timeline-container">
      {events.map((event, index) => (
        <div
          className={`timeline-item ${event.expanded ? 'expanded' : ''}`}
          key={index}
          onClick={() => handleItemClick(index)}
        >
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h2>{event.title}</h2>
            {event.expanded ? (
              <div>
                {event.description.map((desc, descIndex) => (
                  <p key={descIndex} dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
              </div>
            ) : (
              <>
                <div className="more">
                  <p>Click for more</p>
                </div>
                <div className="date">{event.date}</div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
