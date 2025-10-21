import React from "react";
import "../style/pages/chats.css";
import "../style/pages/header.css";
import "../style/pages/navbar.css";

import NavBar from "../components/ui/NavBar";
import Header from "../components/ui/Header";
import PeopleContacts from "../components/ui/PeopleContacts";
function ChatsPage() {
  return (
    <div className="chats">
      <div className="container">
        <Header Pages="chats" />
        <main className="main">
          <div className="main__story">
            <div className="main__story-separator"></div>
            <div className="main__story-block">
              <div className="main__story-item">
                <div className="main__story-item__circul"></div>
                <div className="main__story-item__icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z"
                      fill="#ADB5BD"
                    />
                  </svg>
                </div>
              </div>
              <div className="main__story-name">Your Story</div>
            </div>
          </div>
          <PeopleContacts Pages="chats" />
        </main>
        <NavBar Pages="chats" />
      </div>
    </div>
  );
}

export default ChatsPage;
