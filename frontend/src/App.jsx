import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountWork from "./Components/account/Accounts";
import Loader from "./Loader.jsx";
import Dashboard from "./Dashboard.jsx";
import Default from "./Components/default/DefaultPage.jsx";
import Chatting from "./Components/chatting/Chatting.jsx";
import PersonProvider from "./context/secondPerson.jsx";
import ChatsProvider from "./context/chatsContext.jsx";
import UserProvider from "./context/userContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
import Settings from "./Components/settings/Settings.jsx";
import BlockedUsers from "./Components/settings/BlockedUsers.jsx";
import Profile from "./Components/options/Profile.jsx";
import ContactProfile from "./Components/contactProfile/ContactProfile.jsx";

function App() {
  return (
    <SocketProvider>
      <UserProvider>
        <PersonProvider>
          <ChatsProvider>
            <BrowserRouter>
              <Loader />
              <Routes>
                <Route path="/" element={<Dashboard />}>
                  <Route index element={<Default />} />
                  <Route path="chatting">
                    <Route index element={<Chatting />} />
                    <Route path="contact-profile" element={<ContactProfile />} />
                  </Route>
                  <Route path="settings">
                    <Route index element={<Settings />} />
                    <Route path="blocked-users" element={<BlockedUsers />} />
                  </Route>
                  <Route path="your-profile" element={<Profile />} />
                </Route>
                <Route path="/account" element={<AccountWork />} />
              </Routes>
            </BrowserRouter>
          </ChatsProvider>
        </PersonProvider>
      </UserProvider>
    </SocketProvider>
  );
}

export default App;
