import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import "./index.scss"

const TechList = () => {
  const [techs] = useState([
    { name: "scikit-learn", progress: 100, className: "postgre-progress", years: 3 },
    { name: "pandas", progress: 100, className: "springboot-progress", years: 3 },
    { name: "NumPy", progress: 100, className: "nlp-progress", years: 3 },
    { name: "MySQL & PostgreSQL", progress: 50, className: "react-progress", years: 1.5 }
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
