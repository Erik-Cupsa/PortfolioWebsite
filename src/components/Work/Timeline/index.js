import React, { useState } from 'react';
import './index.scss';

const Timeline = () => {
  const [events, setEvents] = useState([
    {
      date: 'May-September 2023',
      title: 'TRC Companies, Inc.',
      description: [
        'Designed <b>30+ Lambda Functions in AWS</b> increasing the processing speed by <b>35% </b>and enhanced reusability by <b>50%.</b>',
        'Implemented <b>15+ serverless workflows using Step Functions</b>, seamlessly integrating <b>REST APIs </b>and automatically storing outputs into a <b>DynamoDB database. </b>',
        'Developed a Python script to download <b>Lambda, Step Functions, and API </b>code for publication to <b>Git</b>, saving <b>2 hours</b> per deployment.',
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
