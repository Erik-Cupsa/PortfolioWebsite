import "./index.scss"; 
import AnimatedLetters from "../../AnimatedLetters"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loaders";
import DevList from "../DevList";

import pandasLogo from "../../../assets/images/pandas.svg";
import postgresLogo from "../../../assets/images/postgresql.png";
import powerbiLogo from "../../../assets/images/powerbi.png";
import excelLogo from "../../../assets/images/excel.png";
import lookerLogo from "../../../assets/images/looker.svg";
import sklearnLogo from "../../../assets/images/scikit.png";

const About = () => {
    
    const [letterClass, setLetterClass] = useState("text-animate");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000);
      
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <>
            <div className="container about-page"> 
                <div className="text-zone"> 
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={"About me".split("")}
                            idx={15}
                        />
                    </h1>
                    <p>
                        Ambitious data scientist & team player who solves problems creatively with statistics & data, to create direct business value. 
                        <br/>
                        <DevList />
                        <Link to="/about" className="flat-button">LANGUAGES</Link>
                        <br/>
                        <Link to="/about/tech" className="flat-button">FRAMEWORKS/TECHNOLOGIES</Link>
                    </p>
                </div>

                <div className="stage-cube-cont">
                    <div className="cubespinner">

                        <div className="face1">
                            <img src={pandasLogo} alt="pandas" style={{ width: "70%" }} />
                        </div>

                        <div className="face2">
                            <img src={postgresLogo} alt="postgresql" style={{ width: "70%" }} />
                        </div>

                        <div className="face3">
                            <img src={powerbiLogo} alt="powerbi" style={{ width: "70%" }} />
                        </div>

                        <div className="face4">
                            <img src={excelLogo} alt="excel" style={{ width: "70%" }} />
                        </div>

                        <div className="face5">
                            <img src={lookerLogo} alt="looker" style={{ width: "70%" }} />
                        </div>

                        <div className="face6">
                            <img src={sklearnLogo} alt="scikit-learn" style={{ width: "70%" }} />
                        </div>

                    </div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default About
