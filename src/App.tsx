import { Routes, Route, BrowserRouter } from "react-router-dom";

import { RegistrationPages } from "./pages/RegistrationPages";
import RegistrationPagesStepOne from "./pages/RegistrationPagesStepOne";
import RegistrationPagesAccount from "./pages/RegistrationPagesAccount";
import ChatsPage from "./pages/ChatsPage";
import ContactsPages from "./pages/ContactsPages";
import MorePage from "./pages/MorePage";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import PublicRoute from "./components/ui/PublicRoute";
import Account from "./pages/Account";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import Appearance from "./components/ui/Appearance";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <RegistrationPages />
              </PublicRoute>
            }
          />
          <Route
            path="/registrationStep1"
            element={
              <PublicRoute>
                <RegistrationPagesStepOne />
              </PublicRoute>
            }
          />
          <Route
            path="/registrationStepAccount"
            element={
              <PublicRoute>
                <RegistrationPagesAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <ChatsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <ContactsPages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/more"
            element={
              <ProtectedRoute>
                <MorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/more/accounts"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/more/privacy"
            element={
              <ProtectedRoute>
                <Privacy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/more/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />
          <Route
            path="/more/appearance"
            element={
              <ProtectedRoute>
                <Appearance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:profileName"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat-groups/:profileName"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
