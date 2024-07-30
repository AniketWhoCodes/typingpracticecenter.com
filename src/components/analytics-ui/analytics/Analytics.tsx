import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";
import AnalyticsBadge from "../analyticsBadge/AnalyticsBadge";
import "./Analytics.scss";

type AnalyticsProps = {
  totalLessonCount: number;
  correctKeyPressed: number;
  elapsedTime: number;
  incorrectPositions: number;
  isLessonCompleted: boolean;
};

const Analytics: React.FC<AnalyticsProps> = ({
  totalLessonCount,
  correctKeyPressed,
  elapsedTime,
  incorrectPositions,
  isLessonCompleted,
}) => {
  const [accuracy, setAccuracy] = useState<string>("0.0");
  const [wpm, setWpm] = useState<string>("0.0");
  const [score, setScore] = useState<string>("0.0");
  const [wpmDelta, setWpmDelta] = useState<string>("0.0");
  const [accuracyDelta, setAccuracyDelta] = useState<string>("0.0");
  const [scoreDelta, setScoreDelta] = useState<string>("0.0");

  useEffect(() => {
    if (isLessonCompleted) {
      const calculateMetrics = () => {
        const minutes = elapsedTime / 60;
        const grossWPM = correctKeyPressed / 5 / minutes;
        const penalty = incorrectPositions / 5 / minutes;
        const netWPM = grossWPM - penalty;
        const normalizedWPM = Math.max(
          0,
          Math.min((netWPM - 10) / (250 - 10), 1)
        );

        const newWpm = isNaN(netWPM) ? "0.0" : netWPM.toFixed(1);
        setWpm(newWpm);

        const accuracyCalc = (
          (correctKeyPressed / totalLessonCount) *
          100
        ).toFixed(1);
        const normalizedAccuracy = Math.max(
          0,
          Math.min(parseFloat(accuracyCalc) / 100, 1)
        );

        const newAccuracy = isNaN(parseFloat(accuracyCalc))
          ? "0.0"
          : accuracyCalc;
        setAccuracy(newAccuracy);

        const weightWPM = 0.4;
        const weightAccuracy = 0.6;
        const finalScore =
          (normalizedWPM * weightWPM + normalizedAccuracy * weightAccuracy) *
          10000;
        const newScore = isNaN(finalScore) ? "0.0" : finalScore.toFixed(0);
        setScore(newScore);

        updateDeltas(newWpm, newAccuracy, newScore);
      };
      calculateMetrics();
    }
  }, [
    isLessonCompleted,
    elapsedTime,
    correctKeyPressed,
    totalLessonCount,
    incorrectPositions,
  ]);

  const updateDeltas = (
    newWpm: string,
    newAccuracy: string,
    newScore: string
  ) => {
    updateDelta("lastWpm", newWpm, setWpmDelta);
    updateDelta("lastAccuracy", newAccuracy, setAccuracyDelta);
    updateDelta("lastScore", newScore, setScoreDelta);
  };

  const updateDelta = (
    key: string,
    newValue: string,
    setDelta: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const lastValue = localStorage.getItem(key);
    if (lastValue && newValue !== "0.0") {
      const parsedLastValue = parseFloat(lastValue);
      const parsedNewValue = parseFloat(newValue);
      if (!isNaN(parsedLastValue) && !isNaN(parsedNewValue)) {
        const delta = (parsedNewValue - parsedLastValue).toFixed(1);
        setDelta(
          delta !== "0.0"
            ? `${
                parseFloat(delta) > 0
                  ? `↑${delta}`
                  : `↓${Math.abs(parseFloat(delta)).toFixed(1)}`
              }`
            : "0.0"
        );
      } else {
        setDelta("0.0");
      }
    } else {
      setDelta("0.0");
    }
    if (newValue !== "0.0") {
      localStorage.setItem(key, newValue);
    }
  };

  return (
    <div className="analytics-wrapper">
      <div className="d-flex justify-content-between">
        <AnalyticsBadge
          label="Speed"
          value={`${wpm} wpm`}
          delta={`${wpmDelta} %`}
        />
        <AnalyticsBadge
          label="Accuracy"
          value={`${accuracy}%`}
          delta={`${accuracyDelta}%`}
        />
        <AnalyticsBadge label="Score" value={score} delta={scoreDelta} />
      </div>
      <div className="d-flex justify-content-between">
        <AnalyticsBadge label="Last speed" value="30.3wpm" delta="86%" />
        <AnalyticsBadge label="Top speed" value="30.3wpm" delta="86%" />
        <AnalyticsBadge label="Learning rate" value="+0.2wpm/lesson" />
      </div>
      <Progress
        animated
        className="my-3"
        color="success"
        style={{ height: "5px" }}
        value={parseFloat(score) / 10}
      />
    </div>
  );
};

export default Analytics;
