import React, { useState, useCallback } from "react";
import Keyboard from "../components/keyboard-ui/Keyboard";
import Lesson from "../components/lesson-ui/Lesson";
import Analytics from "../components/analytics-ui/Analytics";

const Practice: React.FC = () => {
  const lessonText =
    "nearer era earn ear eerie inner earn real lane ear area nearer lane linen eerie nearer era are lie earn lie era lean learn";
  const [currentPosition, setCurrentPosition] = useState(0);
  const [incorrectPositions, setIncorrectPositions] = useState<number[]>([]);
  const [sequenceCount, setSequenceCount] = useState(1);

  const handleKeyPress = useCallback(
    (key: string) => {
      const currentChar = lessonText[currentPosition];
      if (key === currentChar) {
        setCurrentPosition((prevPosition) => prevPosition + 1);
        setSequenceCount(1);
      } else {
        setIncorrectPositions((prev) => {
          if (!prev.includes(currentPosition)) {
            return [...prev, currentPosition];
          }
          return prev;
        });

        const nextChar = lessonText[currentPosition + sequenceCount];
        if (key == nextChar) {
          setSequenceCount((prev) => prev + 1);
          if (sequenceCount === 3) {
            setCurrentPosition((prevPosition) => prevPosition + 4);
            setSequenceCount(1);
          }
        } else {
          setSequenceCount(1);
        }
      }
    },
    [currentPosition, lessonText, sequenceCount]
  );

  return (
    <div
      className="d-flex flex-column align-items-center overflow-hidden"
      style={{ height: "calc(100vh - 100px )" }}
    >
      <Analytics />
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
