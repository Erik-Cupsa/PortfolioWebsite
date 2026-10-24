import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import "./index.scss"

const TechList = () => {
  const [devs] = useState([
    { name: "Git", progress: 100, className: "aws-progress", years: 1 },
    { name: "Looker", progress: 50, className: "postman-progress", years: 0.5 },
    { name: "PowerBI", progress: 50, className: "github-progress", years: 0.5 }
  ]);

  return (
    <div>
      <h2>Development Tools</h2>
      <ul>
        {devs.map((dev, index) => (
          <li key={index}>
            <span>{dev.name}: {`${dev.years} years`}</span>
            <ProgressBar progress={dev.progress} className={dev.className} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechList;
