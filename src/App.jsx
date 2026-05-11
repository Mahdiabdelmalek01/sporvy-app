import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import GroupsPage from './pages/GroupsPage';
import DashboardPage from './pages/DashboardPage';
import CommunityPage from './pages/CommunityPage';
import HostEventPage from './pages/HostEventPage';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/host-event" element={<HostEventPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
