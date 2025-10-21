import React from "react";
import Header from "../components/ui/Header";
import PeopleContacts from "../components/ui/PeopleContacts";
import NavBar from "../components/ui/NavBar";
import "../style/pages/contacts.css";
function ContactsPages() {
  return (
    <div className="contacts">
      <div className="container">
        <Header Pages="contacts" />
        <div className="main">
          <PeopleContacts Pages="contacts" />
        </div>
        <NavBar Pages="contacts" />
      </div>
    </div>
  );
}

export default ContactsPages;
