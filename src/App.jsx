import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import AgentOrchestrator from './components/AgentOrchestrator'
import SuperagentOrchestrator from './components/SuperagentOrchestrator'
import TemplateShowcase from './showcase/TemplateShowcase'
import Inbox from './components/Inbox'
import InboxPrototype from './pages/InboxPrototype'
import DrivePage from './pages/DrivePage'
import MyAgentPage from './pages/MyAgentPage'
import PlaylistsPage from './pages/PlaylistsPage'
import PlaylistDetailPage from './pages/PlaylistDetailPage'
import PlaylistCreator from './components/PlaylistCreator'
import PlaylistEditor from './components/PlaylistEditor'
import PlaylistAddStories from './components/PlaylistAddStories'
import PlaylistMeetingMode from './components/PlaylistMeetingMode'
import { InboxProvider } from './contexts/InboxContext'
import { RoleProvider } from './contexts/RoleContext'
import './App.css'

// 🎯 AGENT SELECTION - Change these imports to switch agents
// Available agents: shopfloor, inventory, cfo
// Current: cfo
import { config } from './agents/cfo/config'
import { data } from './agents/cfo/data'

const Orchestrator = config.displayMode === 'superagent'
  ? SuperagentOrchestrator
  : AgentOrchestrator

function App() {
  return (
    <InboxProvider>
      <Router>
      <RoleProvider>
          <Routes>
            <Route path="/" element={<Orchestrator config={config} data={data} />} />
            <Route path="/drive" element={<DrivePage />} />
            <Route path="/my-agent" element={<MyAgentPage />} />
            <Route path="/templates" element={<TemplateShowcase />} />
            <Route path="/inbox" element={<InboxWrapper />} />
            <Route path="/prototype" element={<InboxPrototypeWrapper />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/playlists/create" element={<PlaylistCreatorWrapper />} />
            <Route path="/playlists/create/edit" element={<PlaylistEditorWrapper />} />
            <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
            <Route path="/playlists/:id/edit" element={<PlaylistEditorWrapper />} />
            <Route path="/playlists/:id/add-stories" element={<PlaylistAddStoriesWrapper />} />
            <Route path="/playlists/:id/meeting" element={<PlaylistMeetingMode />} />
          </Routes>
        </RoleProvider>
        </Router>
    </InboxProvider>
  )
}

function InboxWrapper() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };
  return <Inbox onClose={handleClose} />;
}

function InboxPrototypeWrapper() {
  return <InboxPrototype />;
}

function PlaylistCreatorWrapper() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/playlists');
  };
  return <PlaylistCreator onClose={handleClose} />;
}

function PlaylistEditorWrapper() {
  const { id } = useParams();
  return <PlaylistEditor playlistId={id} />;
}

function PlaylistAddStoriesWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <PlaylistAddStories playlistId={id} onClose={() => navigate(`/playlists/${id}`)} />;
}

export default App
