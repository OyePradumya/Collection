import { Button, Col, Container, Row } from "react-bootstrap";
import { React, useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const inputElement = useRef("");
  const getSearchTerm = () => {
    props.searchKeyword(inputElement.current.value);
  };

  const renderContacts = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        deleteClickHandler={props.deleteContactHandler}
        editClickHandler={props.editContactHandler}
      ></ContactCard>
    );
  });

  return (
    <Container>
      <Row
        className="my-1"
        style={{
          fontSize: "5px",
          fontFamily: "Comic Sans MS",
          fontWeight: "400",
          margin: "0",
          padding: "8px 4px",
        }}
      >
        <Col className="col-6">
          <h4>Contact List</h4>
        </Col>
        <Col className="col-6">
          <Link to="/add">
            <Button variant="secondary" style={{ fontSize: "16px" }}>
              Add Contact
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="my-2 mx-2 " style={{ color: "white" }}>
        <input
          className="form-control"
          type="text"
          placeholder="Search "
          aria-label="Search"
          value={props.term}
          onChange={getSearchTerm}
          ref={inputElement}
        />
      </Row>
      <Row>
        {props.contacts.length > 0 ? (
          renderContacts
        ) : (
          <p style={{ marginLeft: "9px" }}>No contacts available</p>
        )}
      </Row>
    </Container>
  );
};

export default ContactList;
