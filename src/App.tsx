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
            path="/chat/:profileName"
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
