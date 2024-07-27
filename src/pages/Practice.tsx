import React, { useState, useCallback } from "react";
import Keyboard from "../components/keyboard-ui/Keyboard";
import Lesson from "../components/lesson-ui/Lesson";
import Analytics from "../components/analytics-ui/Analytics";

const Practice: React.FC = () => {
  const lessonText =
    "nearer era earn ear eerie inner earn real lane ear area nearer lane linen eerie nearer era are lie earn lie era lean learn";
  const [currentPosition, setCurrentPosition] = useState(0);
  const [incorrectPositions, setIncorrectPositions] = useState<number[]>([]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if ( key.endsWith(lessonText[currentPosition]) || (lessonText[currentPosition]==" " && key==="space")) {
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
    <div className="d-flex flex-column align-items-center overflow-hidden"
     style={{height:'calc(100vh - 100px )'}}>
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
