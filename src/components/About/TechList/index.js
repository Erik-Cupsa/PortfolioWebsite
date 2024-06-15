import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import "./index.scss"

const TechList = () => {
  const [techs] = useState([
    { name: "ReactJS", progress: 100, className: "react-progress", years: 3 },
    { name: "PostgreSQL", progress: 100, className: "postgre-progress", years: 2 },
    { name: "Spring Boot", progress: 100, className: "springboot-progress", years: 2 },
    { name: "Natural Language Processing", progress: 50, className: "nlp-progress", years: 1 },
    { name: "Large Language Models", progress: 50, className: "llm-progress", years: 1 },
    { name: "NodeJS", progress: 50, className: "node-progress", years: 1 },
    { name: "VueJS", progress: 50, className: "vue-progress", years: 1 },
  ]);

  return (
    <div>
      <h2>Frameworks & Technologies</h2>
      <ul>
        {techs.map((tech, index) => (
          <li key={index}>
            <span>{tech.name}: {`${tech.years} years`}</span>
            <ProgressBar progress={tech.progress} className={tech.className} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechList;
