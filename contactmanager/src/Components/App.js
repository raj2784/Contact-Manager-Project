import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { uuid } from 'uuidv4';
import './App.css';
import api from '../api/contacts';
import Header from './Header';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import Footer from './Footer';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([""]);


  const searchHandler = (search) => {
    setSearch(search);
    if (search !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(newContactList);
    }
    else {
      setSearchResult(contacts);
    }
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const { id, name, email } = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };
  // React Hooks to retrvie contact from api
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  // React Hooks to retrvie contact from local storage

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContact(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();

  }, []);

  // React Hooks to save contact to local storage
  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">

      <Router>
        <Header />
        <Switch>

          <Route path="/" exact render={(props) => (<ContactList {...props}
            contacts={search.length < 1 ? contacts : searchResult}
            getContactId={removeContactHandler}
            term={search} searchKeyword={searchHandler} />
          )}
          />

          <Route path="/add" render={(props) => (<AddContact {...props}
            addContactHandler={addContactHandler} />
          )}
          />

          <Route path="/edit" render={(props) => (<EditContact {...props}
            updateContactHandler={updateContactHandler} />
          )}
          />

          <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
