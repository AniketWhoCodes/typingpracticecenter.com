import React from "react";
import PanZoomElement from "../pan-zoom-element/PanZoomElement";
import { Card, CardText, Col } from "reactstrap";
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
  return (
    <PanZoomElement>
        <Card body className="text-center lesson-container">
          <CardText
            style={{
              textAlign: "left",
              fontSize: "23px",
              letterSpacing: "1px",
            }}
          >
            {text.split("").map((char, index) => {
              const isIncorrect = incorrectPositions.includes(index);
              return (
                <span
                  key={index}
                  className={`${
                    isIncorrect && index !== currentPosition
                      ? "incorrect"
                      : index < currentPosition
                      ? "past"
                      : index === currentPosition
                      ? "current-letter"
                      : "lesson-char"
                  }`}
                >
                  {char===" " ? "␣" : char} 
                </span>
              );
            })}
          </CardText>
        </Card>
    </PanZoomElement>
  );
};

export default Lesson;
