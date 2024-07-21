import React from "react";
import PanZoomElement from "../pan-zoom-element/PanZoomElement";
import { Card, CardText, Col } from "reactstrap";

interface LessonProps {}

const Lesson: React.FC<LessonProps> = () => {
  return (
      <PanZoomElement>
        <Col md="6" lg="8">
          <Card body className="text-center">
            <CardText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Sapiente, eos ad. Accusantium, labore a eum quaerat itaque
              voluptates laborum suscipit alias
            </CardText>
          </Card>
        </Col>
      </PanZoomElement>
  );
};

export default Lesson;
