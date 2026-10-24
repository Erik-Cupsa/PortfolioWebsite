import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import Logo from './Logo';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');

    const nameArray = " Anthony,".split("");
    const jobArray = "aspiring data scientist.".split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => clearTimeout(timerId);
    }, []);

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">

                    <h1>
                        <span className={`${letterClass} _8`}>H</span>
                        <span className={`${letterClass} _9`}>i</span>
                        <span className={`${letterClass} _9`}> </span>
                        <span className={`${letterClass} _9`}>👋</span>
                        <br />

                        <span className={`${letterClass} _10`}>I</span>
                        <span className={`${letterClass} _11`}>'m</span>

                        {/* REMOVE THE LOGO, JUST TEXT NOW */}
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={nameArray}
                            idx={12}
                        />

                        <br />

                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray}
                            idx={20}
                        />
                    </h1>

                    <h2>B.S Data Science</h2>

                    <h2>B.S Business Administration (Finance Concentration)</h2>

                    <h2>Minor in Interdisciplinary AI</h2>

                    <h2>Graduating Northeastern University 2027</h2>

                    <Link to="/contact" className="flat-button">
                        CONTACT ME
                    </Link>
                </div>

                <Logo className="Home" />
            </div>

            <Loader type="line-scale" />
        </>
    );
};

export default Home;