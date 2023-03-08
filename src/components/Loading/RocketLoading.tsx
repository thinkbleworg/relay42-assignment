import * as React from "react";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";

const RocketSVGLoader = (props: SvgIconProps) => (
    <SvgIcon
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x={0}
        y={0}
        viewBox="0 0 500 500"
        xmlSpace="preserve"
        {...props}
    >
        <style>
            {
                ".st0{clip-path:url(#mask_1_)}.st1{fill:none;stroke:#0f0f0f;stroke-width:10;stroke-miterlimit:10}.st2{fill:#DCD6D6}.st3{fill:#BE7C5A}.st7{fill:#E3E3E3}.star{fill:#fff}"
            }
        </style>
        <defs>
            <circle id="mask" cx={250} cy={250} r={196.5} />
        </defs>
        <use
            xlinkHref="#mask"
            style={{
                overflow: "visible",
                fill: "#000"
            }}
        />
        <clipPath id="mask_1_">
            <use
                xlinkHref="#mask"
                style={{
                    overflow: "visible"
                }}
            />
        </clipPath>
        <g id="linePattern" className="st0">
            <path
                className="st1"
                d="M-186.2 183 317 686.2M-167.7 164.6l503.1 503.1M-149.2 146.1l503.1 503.1M-130.8 127.7l503.1 503.1M-112.3 109.2l503.1 503.1M-93.9 90.7l503.2 503.2M-75.4 72.3l503.1 503.1M-56.9 53.8l503.1 503.1M-38.5 35.4l503.1 503.1M-20 16.9 483.1 520M-1.6-1.6l503.2 503.2M16.9-20 520 483.1M35.4-38.5l503.1 503.1M53.8-56.9l503.1 503.1M72.3-75.4l503.1 503.1M90.7-93.9l503.2 503.2M109.2-112.3l503.1 503.1M127.7-130.8l503.1 503.1M146.1-149.2l503.1 503.1M164.6-167.7l503.1 503.1M183-186.2 686.2 317"
            />
        </g>
        <g className="st0">
            <circle className="star" cx={280} cy={10} r={6}>
                <animate
                    attributeName="cx"
                    attributeType="XML"
                    from={280}
                    to={10}
                    begin="0s"
                    dur="3s"
                    fill="remove"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cy"
                    attributeType="XML"
                    from={10}
                    to={280}
                    begin="0s"
                    dur="3s"
                    fill="remove"
                    repeatCount="indefinite"
                />
            </circle>
            <circle className="star" cx={490} cy={180} r={4}>
                <animate
                    attributeName="cx"
                    attributeType="XML"
                    from={490}
                    to={180}
                    begin="0s"
                    dur="5.5s"
                    fill="remove"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cy"
                    attributeType="XML"
                    from={180}
                    to={490}
                    begin="0s"
                    dur="5.5s"
                    fill="remove"
                    repeatCount="indefinite"
                />
            </circle>
            <circle className="star" cx={400} cy={10} r={3}>
                <animate
                    attributeName="cx"
                    attributeType="XML"
                    from={400}
                    to={10}
                    begin="0s"
                    dur="8s"
                    fill="remove"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cy"
                    attributeType="XML"
                    from={10}
                    to={400}
                    begin="0s"
                    dur="8s"
                    fill="remove"
                    repeatCount="indefinite"
                />
            </circle>
            <g id="rocket">
                <path className="st2" d="M206.9 284.1 140 600l-244-240z" />
                <path
                    className="st3"
                    d="m318.4 172.3-26.5 98.4-26.4 98.4-57.2-86.8-86.8-57.1 98.5-26.5z"
                />
                <path
                    style={{
                        fill: "#333"
                    }}
                    d="m169.5 293.7 10-37.6 37.6-10.1 27.6 27.5-10.1 37.6-37.6 10.1z"
                />
                <path
                    className="st3"
                    d="m193.6 297.6.5.5c-.3-.3-.4-.5-.5-.5-.1-.1-.1-.1 0 0zM350.3 203.2c9.6-34.9 11.8-67.7 8.5-71-3.3-3.3-35.7-1.1-70.5 8.4 13.8 4.8 26.7 12.7 37.8 23.8 11.4 11.4 19.4 24.7 24.2 38.8z"
                />
                <path
                    d="M313.9 275.5c17.1-17.1 28.9-45.3 36.3-72.2-4.7-14.1-12.8-27.5-24.1-38.8-11.1-11.1-24.1-19-37.8-23.8-27.1 7.4-55.5 19.3-72.7 36.5-39.3 39.3-49.2 93.1-22.2 120.3l.6.6c27.3 26.5 80.8 16.5 119.9-22.6z"
                    style={{
                        fill: "#EC6637"
                    }}
                />
                <circle
                    transform="rotate(-45.001 282.605 208.04)"
                    cx={282.6}
                    cy={208}
                    style={{
                        fill: "#FCAB8F"
                    }}
                    r={30.4}
                />
                <animateMotion
                    path="M10,-8 C 12,-8 14,-12 12,-8 Z"
                    begin="0s"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </g>
            <g id="cloud1">
                <path
                    className="st7"
                    d="M33.5 424.6c-24.8 0-47.9-11.8-62.5-31.7-15.4-4.3-29.4-13.3-39.5-25.8-11.2-13.8-17.4-31.1-17.4-48.9 0-12.6 3.1-25 8.9-36.1-1.4-5.5-2.1-11.2-2.1-17 0-37.7 30.7-68.4 68.4-68.4 4.4 0 8.9.4 13.2 1.3 9.8-4.3 20.3-6.5 31.1-6.5 28.5 0 54.9 15.9 68.4 40.9 25.9 13.2 42.4 39.9 42.4 69.1 0 26.5-13.6 51.1-35.8 65.3-9 33.8-39.8 57.8-75.1 57.8z"
                />
                <path
                    id="cloud2"
                    className="st2"
                    d="M134.3 301.5c0-27.4-16.3-51-39.8-61.6-10.9-22.7-34.1-38.5-61-38.5-10.8 0-20.9 2.5-30 7-4.6-1.2-9.4-1.8-14.4-1.8-32.2 0-58.4 26.1-58.4 58.4 0 6.4 1 12.5 2.9 18.2-6.1 10.2-9.7 22.1-9.7 34.8 0 32.3 22.7 59.3 53 66 12.1 18.4 32.8 30.5 56.5 30.5 32.7 0 60-23.2 66.2-54.1 20.8-11.5 34.7-33.5 34.7-58.9z"
                />
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="360 20 300"
                    to="0 20 300"
                    begin="0s"
                    dur="5s"
                    repeatCount="indefinite"
                    additive="sum"
                />
            </g>
            <g>
                <path
                    className="st7"
                    d="M200.5 573.6c-24.8 0-47.9-11.8-62.5-31.7-15.4-4.3-29.4-13.3-39.5-25.8-11.2-13.8-17.4-31.1-17.4-48.9 0-12.6 3.1-25 8.9-36.1-1.4-5.5-2.1-11.2-2.1-17 0-37.7 30.7-68.4 68.4-68.4 4.4 0 8.9.4 13.2 1.3 9.8-4.3 20.3-6.5 31.1-6.5 28.5 0 54.9 15.9 68.4 40.9 25.9 13.2 42.4 39.9 42.4 69.1 0 26.5-13.6 51.1-35.8 65.3-9 33.8-39.8 57.8-75.1 57.8z"
                />
                <path
                    className="st2"
                    d="M301.3 450.5c0-27.4-16.3-51-39.8-61.6-10.9-22.7-34.1-38.5-61-38.5-10.8 0-20.9 2.5-30 7-4.6-1.2-9.4-1.8-14.4-1.8-32.2 0-58.4 26.1-58.4 58.4 0 6.4 1 12.5 2.9 18.2-6.1 10.2-9.7 22.1-9.7 34.8 0 32.3 22.7 59.3 53 66 12.1 18.4 32.8 30.5 56.5 30.5 32.7 0 60-23.2 66.2-54.1 20.8-11.5 34.7-33.5 34.7-58.9z"
                />
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 200 450"
                    to="360 200 450"
                    begin="0s"
                    dur="5s"
                    repeatCount="indefinite"
                    additive="sum"
                />
            </g>
        </g>
        <use
            xlinkHref="#mask"
            style={{
                overflow: "visible",
                fill: "none",
                stroke: "#fefefe",
                strokeWidth: 5,
                strokeMiterlimit: 10
            }}
        />
    </SvgIcon>
);

export default RocketSVGLoader;
