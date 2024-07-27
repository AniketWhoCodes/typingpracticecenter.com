import { Progress } from "reactstrap";
import AnalyticsBadge from "./AnalyticsBadge";
import React from "react";
import "./Analytics.scss";

const Analytics: React.FC = () => {
  return (
    <div className="analytics-wrapper">
      <div className="d-flex justify-content-between">
        <AnalyticsBadge label="Speed" value="45.8wpm" delta="↑+2.0wpm" />
        <AnalyticsBadge label="Accuracy" value="97.58%" delta="↑+6.44%" />
        <AnalyticsBadge label="Score" value="994" delta="↑+650" />
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
        value={45}
      />
    </div>
  );
};

export default Analytics;