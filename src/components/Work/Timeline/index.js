import React, { useState } from 'react';
import './index.scss';

const Timeline = () => {
  const [events, setEvents] = useState([
    {
      date: 'May-September 2023',
      title: 'TRC Companies, Inc.',
      description: [
        'Designed <b>30+ AWS Lambda Functions in AWS</b>, increasing the processing speed by <b>35% </b>and reusability by <b>50%</b> through leveraging <b>Lambda layers.</b>',
        'Implemented <b>15+</b> serverless workflows using <b>AWS Step Functions</b>, seamlessly integrating <b>REST APIs </b>and rigorously tested using <b>Postman</b> to validate functionality and reliability.',
        'Crafted a <b>Spring Boot</b> application with a <b>Drools</b> logic engine, containerized it using <b>Docker</b>, and seamlessly deployed it on <b>AWS</b> using <b>EC2</b> and <b>Elastic Beanstalk</b> for enhanced scalability and reliability.',
      ],
      expanded: false,
    },
    {
      date: 'May-September 2022',
      title: 'Government of Canada',
      description: [
        'Automated documentation by creating a custom <b>Python pipeline </b> to convert PDF and word files to <b>Markdown</b> syntax, saving <b>95%</b> of wiki writing time.',
        'Collaborated with other coworkers using Python to extract <b>100+</b> codes from a <b>datalake</b> and placing in a <b>pipeline</b> for further extraction',
        'Centralized the code base for <b>15+</b> software developers on <b>Azure</b>, using <b>SQL</b> to manage databases',
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
