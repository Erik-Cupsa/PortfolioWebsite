import './index.scss'
import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faEnvelope, faSuitcase, faFolderOpen, faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import LogoE from '../../assets/images/E.png'
import LogoSubtitle from '../../assets/images/logo-sub.png'
import { faGithub, faLinkedin, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false)
    return(
        <div className = 'nav-bar'> 
            <Link className = "logo" to="/"> 
                <img src = {LogoE} alt="logo" />
                <img className="sub-logo" src = {LogoSubtitle} alt="slobodan" />
            </Link>
            <nav className={showNav ? 'mobile-show' : ""}>
                <NavLink exact="true" activeclassname = "active" to="/">
                    <FontAwesomeIcon icon = {faHome} color = "#4d4d4e" onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "about-link" to="/about">
                    <FontAwesomeIcon icon = {faUser} color = "#4d4d4e" onClick={() => setShowNav(false)}/>
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "work-link" to="/work">
                    <FontAwesomeIcon icon = {faSuitcase} color = "#4d4d4e" onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "portfolio-link" to="/portfolio">
                    <FontAwesomeIcon icon = {faFolderOpen} color = "#4d4d4e" onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "contact-link" to="/contact">
                    <FontAwesomeIcon icon = {faEnvelope} color = "#4d4d4e" onClick={() => setShowNav(false)}/>
                </NavLink>
                <FontAwesomeIcon icon = {faClose} color="#ffd700" size = "3x" className="close-icon" onClick={() => setShowNav(false)} />
            </nav>
            <ul>
                <li>
                    <a target = "_blank" rel = "noreferrer" href = "https://www.linkedin.com/in/erik-cupsa/">
                        <FontAwesomeIcon icon={faLinkedin} color = "#4d4d4e" />
                    </a>
                </li>
                <li>
                    <a target = "_blank" rel = "noreferrer" href = "https://github.com/Erik-Cupsa">
                        <FontAwesomeIcon icon={faGithub} color = "#4d4d4e" />
                    </a>
                </li>
                <li>
                    <a target = "_blank" rel = "noreferrer" href = "https://www.youtube.com/channel/UCgKFOz_KrMbmypWrawtzDQg">
                        <FontAwesomeIcon icon={faYoutube} color = "#4d4d4e" />
                    </a>
                </li>
                <li>
                    <a target = "_blank" rel = "noreferrer" href = "https://www.tiktok.com/@swerikcodes?lang=en">
                        <FontAwesomeIcon icon={faTiktok} color = "#4d4d4e" />
                    </a>
                </li>
            </ul>
            <FontAwesomeIcon onClick={() => setShowNav(true)} icon={faBars} color="#ffd700" size="3x" className="hamburger-icon" />
        </div>
    )
}

export default Sidebar 