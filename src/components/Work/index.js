import "./index.scss"; 
import AnimatedLetters from "../AnimatedLetters"
import { useEffect, useState } from "react";
import Loader from "react-loaders";
import Timeline from "./Timeline";
import Logo1 from "./Logo1";

const Work = () => {
    
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timerId = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 3000);
      
        return () => {
          clearTimeout(timerId);
        };
      }, []);

    return (
        <>
            <div className = "container work-page"> 
                <div className = "text-zone"> 
                    <h1>
                        <AnimatedLetters letterClass={letterClass}  strArray = {"Work Experience".split("")} idx={10}/>
                    </h1>
                    <Timeline />
                </div>
            </div>
            <Logo1/>
            <Loader type="pacman" />
        </>
    )
}
export default Work