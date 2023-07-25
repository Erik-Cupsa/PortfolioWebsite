import { useEffect, useRef } from 'react'
import gsap from 'gsap-trial'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'
import Work from '../../../assets/images/Work.png'
import './index.scss'

const Logo1 = () => {
  const bgRef = useRef()
  const outlineLogoRef = useRef()
  const solidLogoRef = useRef()

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin)

    gsap
      .timeline()
      .to(bgRef.current, {
        duration: 1,
        opacity: 1,
      })
      .fromTo(
        outlineLogoRef.current,
        { drawSVG: '0%' },
        { drawSVG: '100%', delay: 1, duration: 5 }
      );

    gsap.fromTo(
      solidLogoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 3,
        duration: 4,
      }
    )
  }, [])

  return (
    <div className="job1-logo-container" ref={bgRef}>
      <img
        className="solid-logo"
        ref={solidLogoRef}
        src={Work}
        alt="Work Experience"
      />
      <svg className = "svg-container" version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="none">
        <path ref={outlineLogoRef} d="M1450 4458 c-33 -17 -51 -35 -67 -68 -21 -41 -23 -58 -23 -217 l0
        -173 120 0 120 0 0 55 c0 46 4 60 25 80 l24 25 351 0 351 0 24 -25 c21 -20 25
        -34 25 -80 l0 -55 120 0 120 0 0 173 c0 159 -2 176 -22 217 -17 33 -35 51 -68
        68 -44 22 -45 22 -550 22 -505 0 -506 0 -550 -22z M410 3818 c-33 -17 -51 -35 -67 -68 -23 -44 -23 -50 -23 -420 l1
        -375 159 -185 c154 -179 159 -187 160 -230 0 -35 7 -52 29 -76 62 -68 23 -64
        583 -64 l508 0 0 40 0 40 -55 0 c-46 0 -60 4 -80 25 -24 23 -25 31 -25 135 0
        104 1 112 25 135 l24 25 351 0 351 0 24 -25 c24 -23 25 -31 25 -135 0 -104 -1
        -112 -25 -135 -20 -21 -34 -25 -80 -25 l-55 0 0 -40 0 -40 400 0 400 0 0 295
        0 296 25 24 24 25 296 0 295 0 0 333 c0 325 -1 334 -22 377 -17 33 -35 51 -68
        68 l-44 22 -1546 0 -1546 0 -44 -22z M1803 2708 c-32 -16 -48 -61 -34 -97 19 -45 46 -51 231 -51 185 0
        212 6 231 51 15 37 -2 82 -37 98 -32 14 -361 14 -391 -1z M3483 2548 c-32 -16 -48 -61 -34 -97 15 -35 48 -51 106 -51 l45 0 0
        -176 c0 -110 5 -192 12 -218 16 -52 102 -141 146 -151 40 -8 41 -21 3 -30 -39
        -8 -107 -68 -134 -119 -20 -37 -22 -57 -25 -233 l-4 -193 -43 0 c-58 0 -91
        -16 -106 -51 -15 -37 2 -82 37 -98 35 -16 833 -16 868 0 35 16 52 61 37 98
        -15 35 -48 51 -106 51 l-43 0 -4 193 c-3 176 -5 196 -25 233 -27 51 -95 111
        -134 119 -38 9 -37 22 3 30 44 10 130 99 146 151 7 26 12 108 12 218 l0 176
        45 0 c58 0 91 16 106 51 15 37 -2 82 -37 98 -33 15 -839 14 -871 -1z m347
        -323 c26 -32 -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7 30 -15z m240 0
        c26 -32 -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7 30 -15z m-120 -160
        c26 -32 -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7 30 -15z m0 -400 c26
        -32 -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7 30 -15z m-120 -160 c26
        -32 -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7 30 -15z m240 0 c26 -32
        -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7 30 -15z"/>
        </g>
    </svg>
    </div>
  )
}

export default Logo1