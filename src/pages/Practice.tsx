import React, { useState, useCallback } from "react";
import Keyboard from "../components/keyboard-ui/Keyboard";
import Lesson from "../components/lesson-ui/Lesson";

const Practice: React.FC = () => {
  const lessonText =
    "nearer era earn ear eerie inner earn real lane ear area nearer lane linen eerie nearer era are lie earn lie era lean learn";
  const [currentPosition, setCurrentPosition] = useState(0);
  const [incorrectPositions, setIncorrectPositions] = useState<number[]>([]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (lessonText[currentPosition] === key) {
        setCurrentPosition((prevPosition) => prevPosition + 1);
      } else {
        setIncorrectPositions((prev) => {
          if (!prev.includes(currentPosition)) {
            return [...prev, currentPosition];
          }
          return prev;
        });
      }
    },
    [currentPosition, lessonText]
  );

  return (
    <div className="d-flex flex-column align-item-center">
      <Lesson
        text={lessonText}
        currentPosition={currentPosition}
        incorrectPositions={incorrectPositions}
      />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Practice;
