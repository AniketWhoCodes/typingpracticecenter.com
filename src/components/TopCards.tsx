import { Card, CardBody } from "reactstrap";

type TopCardsProps = {
  value: string;
  title: string;
};

const TopCards = (props: TopCardsProps) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-center">
          <div className="ms-3 d-flex flex-column align-item-center">
            <h6 className="mb-0 font-weight-bold text-center">{props.value}</h6>
            <small className="text-muted text-center d-inline-block text-truncate">{props.title}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;

