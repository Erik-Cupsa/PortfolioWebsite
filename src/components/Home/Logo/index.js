import LogoE from '../../../assets/images/E.png';
import './index.scss';

const Logo = () => {

  return (
    <div className="logo-container">
      <img className="solid-logo animate" src={LogoE} alt="JavaScript, Developer" />
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="274.000000pt"
        height="230.000000pt"
        viewBox="0 0 274.000000 230.000000"
        preserveAspectRatio="xMidYMid meet"
        className="svg-container"
      >
        <g transform="translate(0.000000,230.000000) scale(0.100000,-0.100000)" fill="none">
          <path
            className="svg-path"
            d="M922 1884 l3 -376 65 -3 c36 -2 146 -4 245 -5 99 -1 171 -5 160 -7
              -11 -3 -22 -9 -25 -13 -3 -4 -3 -132 0 -284 4 -239 3 -276 -10 -280 -8 -2 -4
              -4 9 -5 l24 -1 -23 -20 c-21 -19 -37 -20 -221 -20 -108 0 -204 -3 -213 -6 -14
              -5 -16 -50 -16 -395 l0 -389 890 0 890 0 0 320 0 320 -575 0 -575 0 0 75 0 75
              445 0 445 0 0 315 -1 315 -445 0 -444 0 0 60 0 60 575 0 575 0 0 320 0 320
              -890 0 -890 0 2 -376z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
