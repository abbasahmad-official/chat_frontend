import React from 'react';
import './css/loader.css';

const Loader = () => (
  <div className="svg-frame">
    {/* Outer Circle with Stroke Draw Animation */}
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="#000000ff"
        strokeWidth="4"
        fill="none"
        strokeDasharray="565.48"  /* circumference = 2πr */
        strokeDashoffset="565.48"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="565.48;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>

    {/* Rotating Masked Shape */}
    <svg width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <mask id="mask">
          <rect width="200" height="200" fill="white" />
          <circle cx="100" cy="100" r="50" fill="black" />
        </mask>
      </defs>
      <g mask="url(#mask)">
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#000000ff"
          strokeWidth="8"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>

    {/* Pulsing Center Dot */}
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="10" fill="#020202ff">
        <animate
          attributeName="r"
          values="10;20;10"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          values="1;0.3;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export default Loader;
