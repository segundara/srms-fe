import React, { useContext } from "react";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import "../commonStyle/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CustomToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <div
            onClick={decoratedOnClick}
            style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                fontSize: "1rem",
                fontWeight: "900",
                padding: "0.5rem 1rem",
                fontFamily: "sans-serif",
            }}
        >
            {children}
            <FontAwesomeIcon
                style={{ height: "auto" }}
                icon={isCurrentEventKey ? faAngleUp : faAngleDown}
            />
        </div>
    );
}

export default CustomToggle;