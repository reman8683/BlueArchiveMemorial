import React, {useEffect, useState} from "react";

export default function Size() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    let WH = '';
    WH += width > 1280 ? '' : ' width';
    WH += height > 720 + 62.5 ? '' : ' height';

    let NS = '';
    NS += width > 1280 ? '' : ' narrow';
    NS += height > 720 + 62.5 ? '' : ' short';
    return (
        <div className={`cover cover-${WH.length > 0 ? 'on' : 'off'}`}>
            <div>
                <span className="blue">Screen</span>
                <span className="white"> is too{NS.replace("w s", "w and s")}.<br/>Please</span>
                <span className="blue"> increase the{WH.replace("h h", "h and h")}</span>
                <span className="white"> of your browser.</span>
            </div>
        </div>
    );
}