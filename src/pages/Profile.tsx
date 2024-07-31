import React from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../components/TopCards";

const cardData = {
  allTime: [
    { title: "Time", value: "01:18:43" },
    { title: "Lessons", value: "133" },
    { title: "Top Speed", value: "54.7wpm" },
    { title: "Average Speed", value: "40.5wpm" },
    { title: "Top Accuracy", value: "100%" },
    { title: "Average Accuracy", value: "95.54%" },
  ],
  today: [
    { title: "Time", value: "00:00:00" },
    { title: "Lessons", value: "0" },
    { title: "Top Speed", value: "NA" },
    { title: "Average Speed", value: "NA" },
    { title: "Top Accuracy", value: "NA" },
    { title: "Average Accuracy", value: "NA" },
  ],
};
[
  { title: "Time", value: "01:18:43" },
  { title: "Lessons", value: "133" },
  { title: "Top Speed", value: "54.7wpm" },
  { title: "Average Speed", value: "40.5wpm" },
  { title: "Top Accuracy", value: "100%" },
  { title: "Average Accuracy", value: "95.54%" },
];

const Profile: React.FC = () => {
  return (
    <div>
      <Row>
        <h5 className="mb-4">All Time Statistics</h5>
        {cardData.allTime.map((card, index) => (
          <Col key={index} sm="4" lg="2">
            <TopCards
              title={card.title}
              value={card.value}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <h5 className="mb-4">Statistics for Today</h5>
        {cardData.today.map((card, index) => (
          <Col key={index} sm="4" lg="2">
            <TopCards
              title={card.title}
              value={card.value}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Profile;
