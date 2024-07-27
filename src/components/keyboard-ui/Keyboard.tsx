import React, { useEffect, useCallback, useMemo } from "react";
import "./Keyboard.scss";
import PanZoomElement from "../pan-zoom-element/PanZoomElement";
import keyRows from "./KeyRows";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  const keyRowsDetails = useMemo(() => keyRows, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keyPressed = event.code.toLowerCase();
      onKeyPress(keyPressed);
      const keyElement = document.getElementById(keyPressed.toUpperCase());
      if (keyElement) {
        keyElement.classList.add("hit");
        keyElement.addEventListener("animationend", () => {
          keyElement.classList.remove("hit");
        });
      }
    },
    [onKeyPress]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="keyboard-wrapper">
      <PanZoomElement>
        <div className="keyboard">
          {keyRowsDetails.map((row, rowIndex) => (
            <ul key={rowIndex} className={`key-row row-${rowIndex}`}>
              {row.map((key, keyIndex) => (
                <li key={keyIndex} className={key.className} id={key.id}>
                  {key.label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </PanZoomElement>
    </div>
  );
};

export default Keyboard;
