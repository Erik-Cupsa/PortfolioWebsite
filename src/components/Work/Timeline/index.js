import React, { useState } from 'react';
import './index.scss';

const Timeline = () => {
  const [events, setEvents] = useState([
    {
      date: 'May-September 2024',
      title: 'TRC Consutling, Inc.',
      description: [
        'Engineered Large Language Models (LLMs), including <b>BERT</b> and <b>Attention Models</b>, to analyze <b>software engineering requirements</b> and generate accurate dependency lists, improving project planning efficiency by <b>37%</b>',
        'Analyzed 1200+ <b>software requirements</b> monthly using <b>scikit-learn</b> (classification models), <b>spaCy</b>, and <b>NLTK</b> in <b>Python</b>, saving the company $20,000 annually by decreasing project lead times',
        'Integrated <b>TF-IDF</b> vectorization to detect similarities in <b>software requirements</b>, focusing on preprocessing, model training, hyperparameter tuning and clustering to optimize <b>NLP</b> analysis processes',
      ],
      expanded: false,
    },
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
        'Programmed and deployed a <b>Python-based data migration pipeline</b> on <b>Azure</b>, achieving a <b>50%</b> reduction in transfer time for <b>100+ terabytes</b> of critical business data',
        'Centralized a <b>SQL database infrastructure</b> on <b>Azure</b>, enhancing data accessibility and security for <b>50+</b> stakeholders, resulting in a <b>30%</b> improvement in query performance across the organization',
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
