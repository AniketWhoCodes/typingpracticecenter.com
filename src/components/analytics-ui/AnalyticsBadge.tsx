import { Badge } from "reactstrap";
import React from "react";
import "./AnalyticsBadge.scss";

type AnalyticsBadgeProps = {
    label: string;
    value: string;
    delta?: string;
};

const AnalyticsBadge: React.FC<AnalyticsBadgeProps> = ({
    label,
    value,
    delta,
  }) => (
    <Badge className="text-dark" color="light">
      <span>{label}:</span> <span>{value}</span> {delta && <span>({delta})</span>}
    </Badge>
  );

export default AnalyticsBadge;
