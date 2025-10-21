import { Routes, Route, BrowserRouter } from "react-router-dom";

import { RegistrationPages } from "./pages/RegistrationPages";
import RegistrationPagesStepOne from "./pages/RegistrationPagesStepOne";
import RegistrationPagesStepOneTelephone from "./pages/RegistrationPagesStepOneTelephone";
import RegistrationPagesStepTwoTelephone from "./pages/RegistrationPagesStepTwoTelephone";
import RegistrationPagesAccount from "./pages/RegistrationPagesAccount";
import ChatsPage from "./pages/ChatsPage";
import ContactsPages from "./pages/ContactsPages";
import MorePage from "./pages/MorePage";
import ChatPage from "./pages/ChatPage";
import RegistrationPagesStepOneEmail from "./pages/RegistrationPagesStepOneEmail";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPages />} />
          <Route
            path="/registrationStep1"
            element={<RegistrationPagesStepOne />}
          />
          <Route
            path="/registrationStep2Telephone"
            element={<RegistrationPagesStepOneTelephone />}
          />
          <Route
            path="/registrationStep3Telephone"
            element={<RegistrationPagesStepTwoTelephone />}
          />
          <Route
            path="/registrationStepAccount"
            element={<RegistrationPagesAccount />}
          />
          <Route
            path="/registrationStep2Email"
            element={<RegistrationPagesStepOneEmail />}
          />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/contacts" element={<ContactsPages />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/chat/:profileName" element={<ChatPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
