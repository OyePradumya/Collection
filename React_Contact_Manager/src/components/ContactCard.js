import { React } from "react";
import {   Col, Container, Row } from "react-bootstrap";
import Avatar from "react-avatar";
import { Trash, PencilSquare } from "react-bootstrap-icons";

const ContactCard = (props) => {
  const { id, name, email, number } = props.contact;
  return (
    <div>
      <Container
        className="mx-1 py-2 container-sm p-1 "
        style={{
          border: "solid 1px",
          backgroundColor: "#EAEAEA",
          borderRadius: "10px",
        }}
      >
        <Row>
          <Col className="col-1 mx-0 my-0 px-0 py-0">
            <Avatar size={60} round={true} name={name} maxInitials={2}></Avatar>
          </Col>
          <Col className="mx-0 my-0 px-0 py-0">
            <Row style={{ fontSize: "15px" }}>
              <p style={{ textAlign: "center", margin: "0" }}>{name}</p>
              <a href={`mailto:${email}`} target="_blank">
                <p style={{ textAlign: "center", margin: "0" }}>{email}</p>{" "}
              </a>
              <a href={`tel:+91${number}`}>
                <p style={{ textAlign: "center", margin: "0" }}>{number}</p>
              </a>
            </Row>
          </Col>
          <Col
            className=" col-1 col-lg-2  mx-0 my-0 px-0 py-0"
            style={{ fontSize: "20px" }}
          >
            <PencilSquare
              style={{ color: "orange" }}
              onClick={() =>
                props.editClickHandler(JSON.stringify(props.contact))
              }
            ></PencilSquare>
            <Trash
              style={{ color: "red" }}
              onClick={() => props.deleteClickHandler(id)}
            ></Trash>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactCard;
