import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, HelpCircle, TrendingUp, Send, Heart, MessageSquare, ChevronRight, Users, Zap, Mountain } from 'lucide-react';
import { communityMessages, groupProgressFeed, groups, events, user } from '../data/mockData';
import { useApp } from '../context/AppContext';

const TABS = [
  { id: 'chat', label: 'Group Chat', icon: MessageCircle },
  { id: 'qa', label: 'Event Q&A', icon: HelpCircle },
  { id: 'feed', label: 'Progress Feed', icon: TrendingUp },
];

function ChatView({ messages, onSend }) {
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  }

  return (
    <div className="flex flex-col h-[520px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
            <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
            <div className={`max-w-[75%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className="flex items-center gap-2 mb-1">
                {!msg.isMe && <span className="text-xs font-semibold text-gray-700">{msg.sender}</span>}
                {msg.isOrganiser && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">Organiser</span>}
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.isMe
                  ? 'bg-gray-900 text-white rounded-tr-sm'
                  : msg.isOrganiser
                  ? 'bg-blue-50 text-blue-900 border border-blue-100 rounded-tl-sm'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex gap-3 items-center bg-white border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-gray-400 transition-colors">
          <img src={user.avatar} alt="Me" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message…"
            className="flex-1 text-sm focus:outline-none bg-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressCard({ activity, isMe }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img src={activity.avatar} alt={activity.user} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{isMe ? 'You' : activity.user}</p>
            <p className="text-xs text-gray-400">{new Date(activity.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
          </div>
          <div className="ml-auto">
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium capitalize">{activity.type === 'hyrox' ? 'HYROX' : 'Run'}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 bg-gray-50 rounded-xl p-3 mb-3">
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900">{activity.distance} km</p>
            <p className="text-xs text-gray-400">distance</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900">{activity.pace}</p>
            <p className="text-xs text-gray-400">pace</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900">{activity.duration}</p>
            <p className="text-xs text-gray-400">time</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900">{activity.heartRate}</p>
            <p className="text-xs text-gray-400">avg bpm</p>
          </div>
        </div>

        {activity.note && <p className="text-sm text-gray-600 mb-3">"{activity.note}"</p>}

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
            {activity.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <MessageSquare className="w-4 h-4" />
            {activity.comments}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { joinedGroups } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [chatMessages, setChatMessages] = useState({});

  const myGroups = groups.filter((g) => joinedGroups.has(g.id));
  const myEvents = events.filter((e) => [1, 2].includes(e.id)); // mock registered events

  // Init messages from mock data
  function getMessages(key) {
    if (chatMessages[key]) return chatMessages[key];
    return communityMessages[key] || [];
  }

  function sendMessage(key, text) {
    const newMsg = {
      id: Date.now(),
      sender: 'Me',
      avatar: user.avatar,
      text,
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      isMe: true,
    };
    setChatMessages((prev) => ({
      ...prev,
      [key]: [...(prev[key] || communityMessages[key] || []), newMsg],
    }));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Community</h1>
        <p className="text-gray-500 text-sm">Chat with your groups, ask event questions, and share your progress</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* ── GROUP CHAT TAB ─────────────────────────────────────────── */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Your Groups</p>
            {myGroups.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Join a group to start chatting</p>
                <button onClick={() => navigate('/groups')} className="mt-3 text-xs text-gray-900 underline">Browse groups →</button>
              </div>
            )}
            {myGroups.map((g) => {
              const key = `group_${g.id}`;
              const msgs = getMessages(key);
              const lastMsg = msgs[msgs.length - 1];
              const isSelected = selectedGroup?.id === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => { setSelectedGroup(g); setSelectedEvent(null); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${isSelected ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 hover:border-gray-200'}`}
                >
                  <img src={g.image} alt={g.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>{g.name}</p>
                    {lastMsg && <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{lastMsg.isMe ? 'You: ' : `${lastMsg.sender.split(' ')[0]}: `}{lastMsg.text}</p>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chat area */}
          <div className="lg:col-span-2">
            {!selectedGroup ? (
              <div className="bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center h-[520px] text-gray-400">
                <MessageCircle className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-medium text-gray-500">Select a group to start chatting</p>
                <p className="text-sm mt-1">Your conversations are private to group members</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <img src={selectedGroup.image} alt={selectedGroup.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{selectedGroup.name}</p>
                    <p className="text-xs text-gray-400">{selectedGroup.members} members · {selectedGroup.sport}</p>
                  </div>
                </div>
                <ChatView
                  messages={getMessages(`group_${selectedGroup.id}`)}
                  onSend={(text) => sendMessage(`group_${selectedGroup.id}`, text)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── EVENT Q&A TAB ──────────────────────────────────────────── */}
      {activeTab === 'qa' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event list */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Your Events</p>
            {myEvents.map((e) => {
              const isSelected = selectedEvent?.id === e.id;
              return (
                <button
                  key={e.id}
                  onClick={() => { setSelectedEvent(e); setSelectedGroup(null); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${isSelected ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 hover:border-gray-200'}`}
                >
                  <img src={e.image} alt={e.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>{e.name}</p>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{e.sport}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Q&A chat */}
          <div className="lg:col-span-2">
            {!selectedEvent ? (
              <div className="bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center h-[520px] text-gray-400">
                <HelpCircle className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-medium text-gray-500">Select an event to view Q&A</p>
                <p className="text-sm mt-1">Ask questions, get answers from organisers</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <img src={selectedEvent.image} alt={selectedEvent.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{selectedEvent.name}</p>
                    <p className="text-xs text-gray-400">Event Q&A · Organisers monitor this channel</p>
                  </div>
                </div>
                <ChatView
                  messages={getMessages(`event_${selectedEvent.id}`)}
                  onSend={(text) => sendMessage(`event_${selectedEvent.id}`, text)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PROGRESS FEED TAB ──────────────────────────────────────── */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Group selector */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Group Feed</p>
            {myGroups.map((g) => {
              const isSelected = selectedGroup?.id === g.id;
              const feed = groupProgressFeed[`group_${g.id}`] || [];
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroup(isSelected ? null : g)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${isSelected ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 hover:border-gray-200'}`}
                >
                  <img src={g.image} alt={g.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>{g.name}</p>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{feed.length} activities this week</p>
                  </div>
                </button>
              );
            })}
            {myGroups.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Join a group to see their progress</p>
              </div>
            )}
          </div>

          {/* Feed */}
          <div className="lg:col-span-2 space-y-4">
            {!selectedGroup ? (
              <div className="bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center h-64 text-gray-400">
                <TrendingUp className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-medium text-gray-500">Select a group to see their progress</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <img src={selectedGroup.image} alt={selectedGroup.name} className="w-8 h-8 rounded-lg object-cover" />
                  <p className="font-semibold text-gray-900">{selectedGroup.name} — recent activities</p>
                </div>
                {(groupProgressFeed[`group_${selectedGroup.id}`] || []).map((activity) => (
                  <ProgressCard key={activity.id} activity={activity} isMe={activity.user === 'Me'} />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
