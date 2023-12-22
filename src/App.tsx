import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import Home from './pages/Home';
import Habbits from './pages/Habbits';
import Chat from './pages/Chat';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import ProtectedRoute from './features/authentication/ProtectedRoute';
import Contacts from './features/chat/Contacts';
import ChatContacts from './features/chat/ChatContacts';
import ChatGroups from './features/chat/ChatGroups';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/" element={<Home />} />
                        <Route path="/habbits" element={<Habbits />} />

                        {/* <Route path="/chat" element={<Chat />} /> */}

                        <Route path="/chat" element={<Chat />}>
                            <Route
                                index
                                element={<Navigate replace to={'messages'} />}
                            />
                            <Route path="messages" element={<Contacts />} />
                            <Route path="contacts" element={<ChatContacts />} />
                            <Route path="groups" element={<ChatGroups />} />
                        </Route>
                        {/* <Route path="/habbits" element={<Habbits />} />
                        <Route path="/resolutions" element={<Resolutions />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/leaderbord" element={<Home />} /> */}
                        <Route path="*" element={<h2>Not found</h2>} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
