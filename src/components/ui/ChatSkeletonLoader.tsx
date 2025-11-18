function ChatSkeletonLoader() {
  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        .chat-loading {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div
        className="main__chats-groups main-groups chat-loading"
        style={{ filter: "blur(4px)" }}
      >
        <div className="main-groups__icon">
          <img
            className="main-groups__icon-avatar"
            src="https://static.vecteezy.com/system/resources/previews/060/605/418/non_2x/default-avatar-profile-icon-social-media-user-free-vector.jpg"
            alt="avatar"
          />
          <div className="main-groups__icon-active">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                fill="#2CC069"
                stroke="#F7F7FC"
              />
            </svg>
          </div>
        </div>
        <div className="main-groups__information">
          <div className="main-groups__information__name">John Doe</div>
          <div className="main-groups__information__lastmessage">
            How is it going today?
          </div>
        </div>
        <div className="main-groups__notifications main-notifications">
          <div className="main-notifications__days">17/6</div>
          <div className="main-notifications__count">3</div>
        </div>
      </div>
    </>
  );
}

export default ChatSkeletonLoader;
