import React from "react";
import PanZoomElement from "../pan-zoom-element/PanZoomElement";
import { Card, CardText, Col } from "reactstrap";

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
      <Col md="6" lg="8">
        <Card body className="text-center">
          <CardText
            style={{
              textAlign: "left",
              fontSize: "22px",
              letterSpacing: "1px",
            }}
          >
            {text.split("").map((char, index) => {
              const isIncorrect = incorrectPositions.includes(index);
              return (
                <span
                  key={index}
                  style={{
                    color:
                      isIncorrect && index !== currentPosition
                        ? "red"
                        : index < currentPosition
                        ? "grey"
                        : "black",
                    textDecoration:
                      index === currentPosition ? "underline" : "none",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </CardText>
        </Card>
      </Col>
    </PanZoomElement>
  );
};

export default Lesson;
