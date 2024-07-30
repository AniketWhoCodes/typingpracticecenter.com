import React, { useState, useCallback, useEffect, useRef } from "react";
import Keyboard from "../components/keyboard-ui/keyboard/Keyboard";
import Lesson from "../components/lesson-ui/Lesson";
import Analytics from "../components/analytics-ui/analytics/Analytics";

const Practice: React.FC = () => {
  const lessonText =
    "nearer era earn ear eerie inner earn real lane ear area nearer lane linen eerie nearer era are lie earn lie era lean learn";
  const [currentPosition, setCurrentPosition] = useState(0);
  const [incorrectPositions, setIncorrectPositions] = useState<number[]>([]);
  const [sequenceCount, setSequenceCount] = useState(1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (currentPosition === 1) {
      setStartTime(Date.now());
    }
  }, [currentPosition]);

  useEffect(() => {
    if (currentPosition > 0 && currentPosition < lessonText.length) {
      if (timerRef.current === null) {
        timerRef.current = window.setInterval(() => {
          setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);
      }
    } else {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [currentPosition, lessonText.length]);

  const handleKeyPress = useCallback(
    (key: string) => {
      const currentChar = lessonText[currentPosition];
      if (key === currentChar) {
        setCurrentPosition((prevPosition) => prevPosition + 1);
        setSequenceCount(1);
        if (currentPosition + 1 === lessonText.length) {
          setIsLessonCompleted(true);
        }
      } else {
        setIncorrectPositions((prev) => {
          if (!prev.includes(currentPosition)) {
            return [...prev, currentPosition];
          }
          return prev;
        });

        const nextChar = lessonText[currentPosition + sequenceCount];
        if (key === nextChar) {
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
      <Analytics
        totalLessonCount={lessonText.length}
        correctKeyPressed={lessonText.length - incorrectPositions.length}
        elapsedTime={elapsedTime}
        incorrectPositions={incorrectPositions.length}
        isLessonCompleted={isLessonCompleted}
      />
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
