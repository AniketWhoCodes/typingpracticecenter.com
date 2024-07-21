import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Keyboard.scss";
import PanZoomElement from "../pan-zoom-element/PanZoomElement";
import keyRows from "./KeyRows";

const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const timestamps: number[] = [];

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomKey = () => keys[getRandomNumber(0, keys.length - 1)];

const getTimestamp = () => Math.floor(Date.now() / 1000);

const Keyboard: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const keyPressed = String.fromCharCode(event.keyCode);
    const keyElement = document.getElementById(keyPressed);
    const highlightedKey = document.querySelector(".selected");

    if (keyElement) {
      keyElement.classList.add("hit");
      keyElement.addEventListener("animationend", () => {
        keyElement.classList.remove("hit");
      });
    }

    if (highlightedKey && keyPressed === highlightedKey.innerHTML) {
      timestamps.unshift(getTimestamp());
      const elapsedTime = timestamps[0] - timestamps[1];
      console.log(`Character per minute ${60 / elapsedTime}`);
      highlightedKey.classList.remove("selected");
      targetRandomKey();
    }
  }, []);

  const targetRandomKey = useCallback(() => {
    setSelectedKey(getRandomKey());
  }, []);

  useEffect(() => {
    timestamps.unshift(getTimestamp());
    targetRandomKey();
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp, targetRandomKey]);

  const keyRowsDetails = useMemo(() => keyRows, []);

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
