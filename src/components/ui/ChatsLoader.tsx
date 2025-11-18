import { useState } from "react";
import "../../style/pages/chat.css";
import { useNavigate } from "react-router-dom";

function ChatsLoader({ checkError }: { checkError: boolean }) {
  const navigate = useNavigate();
  const [isCheckError, setIsCheckError] = useState<boolean>(
    checkError || false
  );
  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .chat-loading {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
      <div>
        {isCheckError == true ? (
          <div className="chat">
            <div className="container">
              <header className="header-chat" style={{ filter: "blur(2px)" }}>
                <div
                  className="header-chat__arrow"
                  onClick={() => navigate(-1)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.28809 12L14.2981 18.01L15.7121 16.596L11.1121 11.996L15.7121 7.39599L14.2981 5.98999L8.28809 12Z"
                      fill="#F7F7FC"
                    />
                  </svg>
                </div>
                <div className="header-chat__name">
                  <div>
                    <div className="header-chat__name-group">
                      <img
                        className="header-chat__name-avatar"
                        src={`/assets/NoneUserAvatar.jpg`}
                        alt="avatar"
                      />
                    </div>
                  </div>
                </div>
                <div className="header-chat__settings">
                  <div className="header-chat__settings-search">
                    <div className="header-chat__settings-search-input">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="header-chat__settings-search-input-field"
                      />
                      <svg
                        className="header-chat__settings-search-input-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.677 19.607L12.962 13.891C10.4196 15.6984 6.91642 15.2563 4.90285 12.8739C2.88929 10.4915 3.03714 6.96358 5.24298 4.75799C7.44824 2.55144 10.9765 2.40295 13.3594 4.4164C15.7422 6.42986 16.1846 9.93344 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 4.99997C7.58868 4.99955 5.95267 6.33066 5.56745 8.18742C5.18224 10.0442 6.15369 11.9163 7.89366 12.6702C9.63362 13.4242 11.6639 12.8528 12.7552 11.302C13.8466 9.75126 13.699 7.64731 12.402 6.26399L13.007 6.86399L12.325 6.18399L12.313 6.17199C11.5648 5.41917 10.5464 4.99712 9.48498 4.99997Z"
                          fill="#F7F7FC"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </header>
              <main className="main-chats">
                <div
                  className="main-chats__chat"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "50px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "22px",
                      color: "#c82333",
                      marginBottom: "30px",
                      lineHeight: "1.5",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    We couldn't find any chats. Please go back and try again.
                  </p>

                  <button
                    onClick={() => navigate(-1)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 32px",
                      fontSize: "16px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(220, 53, 69, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLButtonElement;
                      target.style.backgroundColor = "#c82333";
                      target.style.transform = "translateY(-2px)";
                      target.style.boxShadow =
                        "0 4px 12px rgba(220, 53, 69, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLButtonElement;
                      target.style.backgroundColor = "#dc3545";
                      target.style.transform = "translateY(0)";
                      target.style.boxShadow =
                        "0 2px 8px rgba(220, 53, 69, 0.2)";
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </main>
              <footer className="footer">
                <div className="footer__container">
                  <div className="footer__plus-add-file">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        cursor: "pointer",
                        color: "blue",
                      }}
                    >
                      <path
                        d="M8 8V14H6V8H0V6H6V0H8V6H14V8H8Z"
                        fill="#ADB5BD"
                      />
                    </svg>
                    <input type="file" multiple style={{ display: "none" }} />
                  </div>
                  <div className="footer__emoji">
                    <img
                      src={"/assets/happy.png"}
                      alt="emoji"
                      className="footer__emoji-icon"
                    />
                    <div></div>
                  </div>
                  <div className="footer__input">
                    <input
                      id="messageInput"
                      name="message"
                      type="text"
                      className="footer__input-text"
                      placeholder="Type a message..."
                    />
                  </div>
                  <div className="footer__send">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.7825 0.21751C17.6813 0.116765 17.5534 0.0470131 17.4139 0.0164552C17.2744 -0.0141027 17.1291 -0.0041961 16.995 0.0450103L0.495001 6.04501C0.352702 6.09898 0.230191 6.19497 0.143739 6.32023C0.0572872 6.44548 0.0109863 6.59407 0.0109863 6.74626C0.0109863 6.89845 0.0572872 7.04704 0.143739 7.17229C0.230191 7.29755 0.352702 7.39354 0.495001 7.44751L6.9375 10.02L11.6925 5.25001L12.75 6.30751L7.9725 11.085L10.5525 17.5275C10.6081 17.6671 10.7043 17.7867 10.8286 17.8709C10.953 17.9552 11.0998 18.0002 11.25 18C11.4016 17.9969 11.5486 17.9479 11.6718 17.8596C11.795 17.7712 11.8885 17.6476 11.94 17.505L17.94 1.00501C17.9911 0.872318 18.0034 0.727833 17.9755 0.588403C17.9477 0.448973 17.8807 0.320343 17.7825 0.21751Z"
                        fill="#375FFF"
                      />
                    </svg>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        ) : (
          <>
            <div className="chat">
              <div className="container">
                <header className="header-chat" style={{ filter: "blur(2px)" }}>
                  <div
                    className="header-chat__arrow"
                    onClick={() => navigate(-1)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.28809 12L14.2981 18.01L15.7121 16.596L11.1121 11.996L15.7121 7.39599L14.2981 5.98999L8.28809 12Z"
                        fill="#F7F7FC"
                      />
                    </svg>
                  </div>
                  <div className="header-chat__name">
                    <div>
                      <div className="header-chat__name-group">
                        <img
                          className="header-chat__name-avatar"
                          src={`/assets/NoneUserAvatar.jpg`}
                          alt="avatar"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="header-chat__settings">
                    <div className="header-chat__settings-search">
                      <div className="header-chat__settings-search-input">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="header-chat__settings-search-input-field"
                        />
                        <svg
                          className="header-chat__settings-search-input-icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.677 19.607L12.962 13.891C10.4196 15.6984 6.91642 15.2563 4.90285 12.8739C2.88929 10.4915 3.03714 6.96358 5.24298 4.75799C7.44824 2.55144 10.9765 2.40295 13.3594 4.4164C15.7422 6.42986 16.1846 9.93344 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 4.99997C7.58868 4.99955 5.95267 6.33066 5.56745 8.18742C5.18224 10.0442 6.15369 11.9163 7.89366 12.6702C9.63362 13.4242 11.6639 12.8528 12.7552 11.302C13.8466 9.75126 13.699 7.64731 12.402 6.26399L13.007 6.86399L12.325 6.18399L12.313 6.17199C11.5648 5.41917 10.5464 4.99712 9.48498 4.99997Z"
                            fill="#F7F7FC"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </header>
                <main className="main-chats">
                  <div className="main-chats__chat">
                    <div
                      className={"main-chats__chat-you"}
                      style={{ filter: "blur(2px)" }}
                    >
                      <img
                        className="main-chats__chat-avatar"
                        src={`/assets/NoneUserAvatar.jpg`}
                        alt="avatar"
                      />

                      <div className={"chat-you"}>
                        <div className={"chat-you__message"}>
                          <div className={"chat-you__message__name"}>
                            User Name
                          </div>

                          <div
                            className={"chat-you__message__block-main"}
                          ></div>

                          <div className={"chat-you__message__content"}>
                            This is a sample message content.
                          </div>
                        </div>
                        <div className={"chat-you__footer-block-message"}>
                          <div className={"chat-you__emoji-likes"}></div>
                          <div className={"chat-you__message-time"}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
                <footer className="footer">
                  <div className="footer__container">
                    <div className="footer__plus-add-file">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          cursor: "pointer",
                          color: "blue",
                        }}
                      >
                        <path
                          d="M8 8V14H6V8H0V6H6V0H8V6H14V8H8Z"
                          fill="#ADB5BD"
                        />
                      </svg>
                      <input type="file" multiple style={{ display: "none" }} />
                    </div>
                    <div className="footer__emoji">
                      <img
                        src={"/assets/happy.png"}
                        alt="emoji"
                        className="footer__emoji-icon"
                      />
                      <div></div>
                    </div>
                    <div className="footer__input">
                      <input
                        id="messageInput"
                        name="message"
                        type="text"
                        className="footer__input-text"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="footer__send">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.7825 0.21751C17.6813 0.116765 17.5534 0.0470131 17.4139 0.0164552C17.2744 -0.0141027 17.1291 -0.0041961 16.995 0.0450103L0.495001 6.04501C0.352702 6.09898 0.230191 6.19497 0.143739 6.32023C0.0572872 6.44548 0.0109863 6.59407 0.0109863 6.74626C0.0109863 6.89845 0.0572872 7.04704 0.143739 7.17229C0.230191 7.29755 0.352702 7.39354 0.495001 7.44751L6.9375 10.02L11.6925 5.25001L12.75 6.30751L7.9725 11.085L10.5525 17.5275C10.6081 17.6671 10.7043 17.7867 10.8286 17.8709C10.953 17.9552 11.0998 18.0002 11.25 18C11.4016 17.9969 11.5486 17.9479 11.6718 17.8596C11.795 17.7712 11.8885 17.6476 11.94 17.505L17.94 1.00501C17.9911 0.872318 18.0034 0.727833 17.9755 0.588403C17.9477 0.448973 17.8807 0.320343 17.7825 0.21751Z"
                          fill="#375FFF"
                        />
                      </svg>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChatsLoader;
