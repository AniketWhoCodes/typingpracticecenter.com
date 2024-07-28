import React from "react";
import PanZoomElement from "../pan-zoom-element/PanZoomElement";
import { Card, CardText } from "reactstrap";
import "./Lesson.scss";

interface LessonProps {
  text: string;
  currentPosition: number;
  incorrectPositions: number[];
}

const Lesson: React.FC<LessonProps> = ({
  text,
  currentPosition,
  incorrectPositions,
}) => {
  let runningCharIndex = 0;
  const words = text.split(" ");

  return (
    <PanZoomElement>
      <Card body className="text-center lesson-container">
        <CardText
          style={{
            textAlign: "left",
            fontSize: "23px",
            letterSpacing: "1px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {words.map((word, wordIndex) => {
            const wordWithSpace =
              wordIndex < words.length - 1 ? word + "␣" : word;
            const wordSpans = wordWithSpace.split("").map((char, charIndex) => {
              const absoluteCharIndex = runningCharIndex + charIndex;
              const isIncorrect =
                incorrectPositions.includes(absoluteCharIndex);
              return (
                <span
                  key={absoluteCharIndex}
                  className={`${
                    isIncorrect && absoluteCharIndex !== currentPosition
                      ? "incorrect"
                      : absoluteCharIndex < currentPosition
                      ? "past"
                      : absoluteCharIndex === currentPosition
                      ? "current-letter"
                      : "lesson-char"
                  }`}
                >
                  {char}
                </span>
              );
            });
            runningCharIndex += wordWithSpace.length;
            return <span key={wordIndex}>{wordSpans}</span>;
          })}
        </CardText>
      </Card>
    </PanZoomElement>
  );
};

export default Lesson;
