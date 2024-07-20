import React from "react";
import user1 from "../assets/images/users/user1.jpg";
import user2 from "../assets/images/users/user2.jpg";
import user3 from "../assets/images/users/user3.jpg";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

const highScoreData = [
  {
    avatar: user1,
    name: "Emma Watson",
    layout: "English/United States",
    typingSpeed: "111wpm / 554cpm",
    score: 119112,
  },
  {
    avatar: user2,
    name: "Alan Walker",
    layout: "English/United States",
    typingSpeed: "100wpm / 554cpm",
    score: 119000,
  },
  {
    avatar: user3,
    name: "Billie Eilish",
    layout: "English/United States",
    typingSpeed: "99wpm / 554cpm",
    score: 118990,
  },
];

interface HighScoreProps {}

const HighScore: React.FC<HighScoreProps> = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5">High Scores</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  The table of the fastest typists for the last few days,
                  arranged by their scores from best to worst. Typing score is
                  measured from typing speed, text length, the number of
                  different characters in the text, and the number of errors.
                  The formula is designed in such a way to reward for a faster
                  speed, longer text and a larger alphabet, but to punish for
                  the number of errors.
                </CardSubtitle>

                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Layout</th>
                      <th>Typing Speed</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highScoreData.map((tdata, index) => (
                      <tr key={index} className="border-top">
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <img
                              src={tdata.avatar}
                              className="rounded-circle"
                              alt="avatar"
                              width="45"
                              height="45"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0">{tdata.name}</h6>
                              <span className="text-muted"></span>
                            </div>
                          </div>
                        </td>
                        <td>{tdata.layout}</td>
                        <td>{tdata.typingSpeed}</td>
                        <td>{tdata.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HighScore;
