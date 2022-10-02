import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContact from "./EditContact";
import api from "./../api/contacts";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  const retrieveContacts = async () => {
    const resp = await api.get("/contacts");
    return resp.data;
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
  }, []);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts((PrevValue) => {
      return [...PrevValue, response.data];
    });
  };
  const editContactHandler = (contact) => {
    navigate(`/edit/${contact}`);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    setContacts(
      contacts.map((item) => {
        if (item.id === contact.id) {
          return response.data;
        } else {
          return item;
        }
      })
    );
  };

  const removeContactHandler = async (id) => {
    api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setSearchRes(newContacts);
    } else {
      setSearchRes(contacts);
    }
  };
  return (
    <Container className="px-0" style={{ maxWidth: "500px" }}>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ContactList
              contacts={searchTerm.length < 1 ? contacts : searchRes}
              deleteContactHandler={removeContactHandler}
              editContactHandler={editContactHandler}
              term={searchTerm}
              searchKeyword={searchHandler}
            />
          }
        />
        <Route
          path="/add"
          element={<AddContact addContactHandler={addContactHandler} />}
        />
        <Route
          path="/edit/:idData"
          element={<EditContact updateContactHandler={updateContactHandler} />}
        />
      </Routes>
    </Container>
  );
};

export default App;
