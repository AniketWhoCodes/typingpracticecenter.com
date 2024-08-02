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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isLessonPaused, setIsLessonPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);

  const resetLesson = () => {
    setCurrentPosition(0);
    setIncorrectPositions([]);
    setSequenceCount(1);
    setElapsedTime(0);
    setIsLessonCompleted(false);
    setIsLessonPaused(false);
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (inactivityTimerRef.current !== null) {
      window.clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  const startInactivityTimer = () => {
    if (inactivityTimerRef.current !== null) {
      window.clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = window.setTimeout(() => {
      resetLesson();
    }, 10000);
  };

  useEffect(() => {
    if (currentPosition === 1) {
      startInactivityTimer();
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
      if (isLessonCompleted || isLessonPaused) return;
      const currentChar = lessonText[currentPosition];
      if (key === currentChar) {
        setCurrentPosition((prevPosition) => prevPosition + 1);
        setSequenceCount(1);
        if (currentPosition + 1 === lessonText.length) {
          setIsLessonCompleted(true);
        } else {
          startInactivityTimer();
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
    [
      currentPosition,
      lessonText,
      sequenceCount,
      isLessonCompleted,
      isLessonPaused,
    ]
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e
          .composedPath()
          .some(
            (el) =>
              el instanceof HTMLElement &&
              (el.classList.contains("lesson-container") ||
                el.classList.contains("keyboard-wrapper"))
          )
      ) {
        resetLesson();
      } else {
        setIsLessonPaused(true);
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (isLessonPaused && e.key === "Enter") {
        resetLesson();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isLessonPaused]);

  return (
    <div
      className="d-flex flex-column align-items-center overflow-hidden"
      style={{ height: "calc(100vh - 100px)" }}
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
        isLessonPaused={isLessonPaused}
      />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Practice;
