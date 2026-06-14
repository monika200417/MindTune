import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  BarChart3,
  BatteryMedium,
  Bell,
  Bluetooth,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  CloudSun,
  Headphones,
  HeartPulse,
  History,
  LaptopMinimalCheck,
  LayoutDashboard,
  Menu,
  Music2,
  Pause,
  Play,
  Plus,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Square,
  UserRound,
  Wifi,
  X,
  Zap
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  distribution,
  emotionMeta,
  initialReadings,
  musicOptions,
  sessions,
  weeklyTrend
} from "./data";
import type { Emotion, LiveReading } from "./types";

const navItems = [
  { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/dashboard/live", label: "Live session", icon: Activity },
  { path: "/dashboard/sessions", label: "Sessions", icon: History },
  { path: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/dashboard/music", label: "Music therapy", icon: Music2 },
  { path: "/dashboard/devices", label: "Devices", icon: Smartphone }
];

const pageTitles: Record<string, { title: string; eyebrow: string }> = {
  "/dashboard": { title: "Good morning, Abhi", eyebrow: "Wednesday, June 10" },
  "/dashboard/live": { title: "Live session", eyebrow: "Real-time EEG insights" },
  "/dashboard/sessions": { title: "Session history", eyebrow: "Your MindTune activity" },
  "/dashboard/analytics": { title: "Wellness trends", eyebrow: "Last 7 days" },
  "/dashboard/music": { title: "Music therapy", eyebrow: "Personalize your response" },
  "/dashboard/devices": { title: "Your devices", eyebrow: "Connection and setup" },
  "/dashboard/settings": { title: "Settings", eyebrow: "Profile and preferences" },
  "/dashboard/help": { title: "Help center", eyebrow: "Setup and troubleshooting" }
};

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const page = pageTitles[location.pathname] ?? {
    title: "MindTune",
    eyebrow: "Emotional wellness, in tune"
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="app-main">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
          </div>
          <div className="topbar-actions">
            <div className="device-pill">
              <span className="online-dot" />
              <span>MindTune One</span>
              <span className="desktop-only">online</span>
            </div>
            <div className="notification-wrap">
              <button
                className="icon-button notification-button"
                onClick={() => setNotificationsOpen((value) => !value)}
                aria-label="Notifications"
              >
                <Bell size={19} />
                <span className="notification-dot" />
              </button>
              {notificationsOpen && <Notifications onClose={() => setNotificationsOpen(false)} />}
            </div>
            <Link to="/dashboard/settings" className="avatar" aria-label="Open profile settings">
              AK
            </Link>
          </div>
        </header>

        <main className="page-container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/live" element={<LiveSession />} />
            <Route path="/dashboard/sessions" element={<Sessions />} />
            <Route path="/dashboard/sessions/:id" element={<SessionDetail />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/music" element={<MusicTherapy />} />
            <Route path="/dashboard/devices" element={<Devices />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div className={`mobile-scrim ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">
            <BrainCircuit size={25} />
          </div>
          <div>
            <strong>MindTune</strong>
            <span>emotional wellness</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="primary-nav">
          <p className="nav-label">Your space</p>
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/dashboard"}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
          <p className="nav-label nav-label-spaced">Support</p>
          <NavLink to="/dashboard/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </NavLink>
          <NavLink to="/dashboard/help" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <CircleHelp size={18} strokeWidth={1.8} />
            Help center
          </NavLink>
        </nav>

        <div className="sidebar-device">
          <div className="device-visual">
            <div className="device-ring">
              <Radio size={20} />
            </div>
          </div>
          <div>
            <div className="sidebar-device-title">
              <strong>MindTune One</strong>
              <span className="online-dot" />
            </div>
            <span>Signal strong · 76%</span>
          </div>
          <BatteryMedium size={21} />
        </div>
        <p className="prototype-note">Research prototype · Not a medical device</p>
      </aside>
    </>
  );
}

function Notifications({ onClose }: { onClose: () => void }) {
  return (
    <div className="notification-panel">
      <div className="panel-heading">
        <strong>Notifications</strong>
        <button className="text-button" onClick={onClose}>Close</button>
      </div>
      <div className="notification-item">
        <span className="notification-icon success"><Check size={16} /></span>
        <div><strong>Device connected</strong><span>MindTune One is ready for a session.</span></div>
      </div>
      <div className="notification-item">
        <span className="notification-icon"><Sparkles size={16} /></span>
        <div><strong>Weekly insight</strong><span>Your calm time increased by 12%.</span></div>
      </div>
    </div>
  );
}

function Overview() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const current = initialReadings.at(-1)!;

  return (
    <div className="page-stack">
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="hero-kicker"><CloudSun size={16} /> Your mind at a glance</span>
          <h2>You seem settled and focused.</h2>
          <p>MindTune is receiving a clear signal. Start a session whenever you’re ready.</p>
          <button className="primary-button" onClick={() => navigate("/dashboard/live")}>
            <Play size={17} fill="currentColor" />
            Start live session
          </button>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-core">
            <BrainCircuit size={38} />
          </div>
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard
          label="Current state"
          value={current.emotion}
          detail={`${current.confidence}% confidence`}
          icon={<HeartPulse />}
          tone="teal"
        />
        <MetricCard
          label="Signal quality"
          value="Excellent"
          detail={`${current.signalQuality}% · electrodes connected`}
          icon={<Signal />}
          tone="blue"
        />
        <MetricCard
          label="Today’s sessions"
          value="2"
          detail="42 minutes total"
          icon={<Clock3 />}
          tone="amber"
        />
        <MetricCard
          label="Mindful streak"
          value="6 days"
          detail="A steady rhythm"
          icon={<Zap />}
          tone="violet"
        />
      </section>

      <section className="content-grid content-grid-main">
        <Card className="chart-card">
          <CardHeader title="Your week in balance" subtitle="Emotion mix across recent sessions" action={<Link to="/dashboard/analytics">View analytics <ChevronRight size={15} /></Link>} />
          <div className="chart-large">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend} margin={{ top: 12, right: 6, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="calmArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f8f7a" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#1f8f7a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#e8e8e2" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#7d827d", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a0a39f", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e5df", boxShadow: "0 10px 28px rgba(29,45,39,.08)" }} />
                <Area type="monotone" dataKey="calm" stroke="#1f8f7a" strokeWidth={3} fill="url(#calmArea)" />
                <Line type="monotone" dataKey="happy" stroke="#d99b28" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <span><i className="legend-dot calm" /> Calm</span>
            <span><i className="legend-dot happy" /> Happy</span>
          </div>
        </Card>

        <Card className="now-playing">
          <CardHeader title="Therapy audio" subtitle="Selected for your current state" />
          <div className="album-art">
            <div className="album-sun" />
            <div className="album-wave wave-one" />
            <div className="album-wave wave-two" />
            <Headphones size={30} />
          </div>
          <div className="track-copy">
            <span>Now playing</span>
            <h3>Open Sky</h3>
            <p>Ambient · 6:42</p>
          </div>
          <div className="track-progress"><span style={{ width: "38%" }} /></div>
          <div className="player-controls">
            <button className="small-control"><ChevronLeft size={18} /></button>
            <button className="play-control" onClick={() => setIsPlaying((value) => !value)}>
              {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
            </button>
            <button className="small-control"><ChevronRight size={18} /></button>
          </div>
        </Card>
      </section>

      <section className="content-grid content-grid-main">
        <Card>
          <CardHeader title="Recent sessions" subtitle="A quick look at your latest activity" action={<Link to="/dashboard/sessions">See all <ChevronRight size={15} /></Link>} />
          <div className="session-list">
            {sessions.slice(0, 3).map((session) => <SessionRow key={session.id} session={session} />)}
          </div>
        </Card>
        <Card className="insight-card">
          <div className="insight-icon"><Sparkles /></div>
          <span className="eyebrow">Weekly insight</span>
          <h3>Your calm periods are growing.</h3>
          <p>You spent 12% more time in a calm state this week compared with last week.</p>
          <Link to="/dashboard/analytics" className="secondary-button">Explore your trends</Link>
        </Card>
      </section>
    </div>
  );
}

function LiveSession() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [readings, setReadings] = useState(initialReadings);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const current = readings.at(-1)!;
  const meta = emotionMeta[current.emotion];

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    const simulator = window.setInterval(() => {
      setReadings((items) => {
        const last = items.at(-1)!;
        const nextEmotion: Emotion = Math.random() > 0.83 ? (["Calm", "Happy", "Anxious", "Sad", "Angry"] as Emotion[])[Math.floor(Math.random() * 5)] : last.emotion;
        const vary = (value: number, amount = 5) => Math.max(5, Math.round(value + (Math.random() - 0.5) * amount));
        const now = new Date();
        return [...items.slice(-11), {
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          emotion: nextEmotion,
          confidence: Math.min(94, Math.max(67, vary(last.confidence, 8))),
          signalQuality: Math.min(98, Math.max(78, vary(last.signalQuality, 4))),
          bands: {
            delta: vary(last.bands.delta),
            theta: vary(last.bands.theta),
            alpha: vary(last.bands.alpha),
            beta: vary(last.bands.beta),
            gamma: vary(last.bands.gamma)
          }
        }];
      });
    }, 3000);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(simulator);
    };
  }, [running]);

  const startSession = () => {
    setElapsed(0);
    setRunning(true);
  };

  return (
    <div className="page-stack">
      <section className="live-toolbar">
        <div className="live-status">
          <span className={`live-pulse ${running ? "active" : ""}`} />
          <div>
            <strong>{running ? "Session in progress" : "Ready to begin"}</strong>
            <span>{running ? "Simulated device data is updating live" : "Your device and electrodes are connected"}</span>
          </div>
        </div>
        <div className="session-actions">
          <span className="session-timer">{formatTimer(elapsed)}</span>
          {running ? (
            <button className="stop-button" onClick={() => setRunning(false)}><Square size={15} fill="currentColor" /> End session</button>
          ) : (
            <button className="primary-button" onClick={startSession}><Play size={16} fill="currentColor" /> Start session</button>
          )}
        </div>
      </section>

      <section className="live-summary">
        <Card className="emotion-focus" style={{ "--emotion": meta.color, "--emotion-soft": meta.soft } as React.CSSProperties}>
          <span className="eyebrow">Current emotional state</span>
          <div className="emotion-orb"><Activity size={32} /></div>
          <h2>{current.emotion}</h2>
          <div className="confidence-row">
            <span>{current.confidence}% confidence</span>
            <div className="mini-progress"><span style={{ width: `${current.confidence}%` }} /></div>
          </div>
          <p>{meta.message}</p>
        </Card>

        <Card className="signal-card">
          <CardHeader title="Signal quality" subtitle="Live electrode contact" />
          <div className="signal-score">
            <div className="signal-gauge" style={{ "--score": `${current.signalQuality * 3.6}deg` } as React.CSSProperties}>
              <div><strong>{current.signalQuality}</strong><span>%</span></div>
            </div>
            <div className="signal-details">
              <strong>Excellent signal</strong>
              <span><Check size={14} /> Forehead electrode</span>
              <span><Check size={14} /> Temporal electrode</span>
              <span><Check size={14} /> Reference electrode</span>
            </div>
          </div>
        </Card>

        <Card className="live-track-card">
          <CardHeader title="Adaptive music" subtitle="Matched to your state" />
          <div className="mini-album"><Music2 size={23} /></div>
          <div className="live-track-title"><span>Now playing</span><h3>{meta.track}</h3><p>Ambient therapy</p></div>
          <button className="play-control" onClick={() => setMusicPlaying((value) => !value)}>
            {musicPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
          </button>
        </Card>
      </section>

      <section className="content-grid live-charts">
        <Card className="chart-card">
          <CardHeader
            title="Brainwave activity"
            subtitle="Relative power across EEG frequency bands"
            action={<span className="data-chip"><span className="live-pulse active" /> Live</span>}
          />
          <div className="chart-large brain-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readings} margin={{ top: 10, right: 8, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#e8e8e2" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#91958f", fontSize: 10 }} minTickGap={24} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a0a39f", fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e5df" }} />
                <Line type="monotone" dataKey="bands.alpha" name="Alpha" stroke="#1f8f7a" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="bands.theta" name="Theta" stroke="#7968a8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bands.beta" name="Beta" stroke="#d99b28" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <span><i className="legend-dot calm" /> Alpha</span>
            <span><i className="legend-dot violet" /> Theta</span>
            <span><i className="legend-dot happy" /> Beta</span>
          </div>
        </Card>

        <Card className="band-card">
          <CardHeader title="Band power" subtitle="Latest reading" />
          <div className="band-list">
            {(Object.entries(current.bands) as Array<[keyof typeof current.bands, number]>).map(([band, value], index) => (
              <div className="band-row" key={band}>
                <div><strong>{band}</strong><span>{["0.5–4 Hz", "4–8 Hz", "8–13 Hz", "13–30 Hz", "30+ Hz"][index]}</span></div>
                <div className="band-track"><span style={{ width: `${Math.min(value * 1.45, 100)}%` }} /></div>
                <b>{value}</b>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card>
        <CardHeader title="Emotion timeline" subtitle="State changes in this session" />
        <div className="timeline-strip">
          {readings.map((reading, index) => (
            <div
              key={`${reading.time}-${index}`}
              className="timeline-segment"
              style={{ background: emotionMeta[reading.emotion].color, flex: Math.max(1, reading.confidence / 40) }}
              title={`${reading.time}: ${reading.emotion}`}
            />
          ))}
        </div>
        <div className="timeline-labels"><span>{readings[0].time}</span><span>Now</span></div>
      </Card>
    </div>
  );
}

function Sessions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | Emotion>("All");
  const filtered = sessions.filter((session) =>
    (filter === "All" || session.dominantEmotion === filter) &&
    `${session.date} ${session.dominantEmotion}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-stack">
      <section className="stat-strip">
        <div><span>Total sessions</span><strong>18</strong><small>+4 this week</small></div>
        <div><span>Total mindful time</span><strong>7h 24m</strong><small>Last 30 days</small></div>
        <div><span>Average session</span><strong>24m</strong><small>Your sweet spot</small></div>
        <div><span>Most frequent state</span><strong>Calm</strong><small>44% of readings</small></div>
      </section>
      <Card>
        <div className="table-toolbar">
          <div className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search sessions" /></div>
          <div className="filter-buttons">
            {(["All", "Calm", "Happy", "Anxious", "Sad", "Angry"] as const).map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""}>{item}</button>
            ))}
          </div>
        </div>
        <div className="sessions-table">
          <div className="table-head">
            <span>Session</span><span>Dominant state</span><span>Duration</span><span>Confidence</span><span>Signal</span><span />
          </div>
          {filtered.map((session) => (
            <Link to={`/dashboard/sessions/${session.id}`} className="table-row" key={session.id}>
              <span><strong>{session.date}</strong><small>{session.time} · {session.id}</small></span>
              <span><EmotionBadge emotion={session.dominantEmotion} /></span>
              <span>{session.duration}</span>
              <span>{session.confidence}%</span>
              <span className="signal-inline"><Signal size={15} /> {session.signal}%</span>
              <ChevronRight size={17} />
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty-state"><Search /><h3>No sessions found</h3><p>Try a different state or search term.</p></div>}
      </Card>
    </div>
  );
}

function SessionDetail() {
  const { id } = useParams();
  const session = sessions.find((item) => item.id === id) ?? sessions[0];
  const meta = emotionMeta[session.dominantEmotion];
  const navigate = useNavigate();

  return (
    <div className="page-stack">
      <button className="back-button" onClick={() => navigate("/dashboard/sessions")}><ChevronLeft size={17} /> Back to sessions</button>
      <section className="detail-hero" style={{ "--emotion": meta.color, "--emotion-soft": meta.soft } as React.CSSProperties}>
        <div><span className="eyebrow">Session {session.id}</span><h2>{session.date} at {session.time}</h2><p>A {session.duration} MindTune session with a clear, stable signal.</p></div>
        <EmotionBadge emotion={session.dominantEmotion} />
      </section>
      <section className="metric-grid">
        <MetricCard label="Dominant state" value={session.dominantEmotion} detail="44% of session" icon={<HeartPulse />} tone="teal" />
        <MetricCard label="Average confidence" value={`${session.confidence}%`} detail="Reliable classification" icon={<Sparkles />} tone="violet" />
        <MetricCard label="Signal quality" value={`${session.signal}%`} detail="No contact warnings" icon={<Signal />} tone="blue" />
        <MetricCard label="Therapy track" value={session.track} detail="Played for 16 min" icon={<Music2 />} tone="amber" />
      </section>
      <section className="content-grid content-grid-main">
        <Card>
          <CardHeader title="Session rhythm" subtitle="Brainwave activity over the session" />
          <div className="chart-large">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={initialReadings} margin={{ top: 12, right: 8, left: -25 }}>
                <defs><linearGradient id="detailArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={meta.color} stopOpacity=".28" /><stop offset="100%" stopColor={meta.color} stopOpacity="0" /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#e8e8e2" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#8b908a", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a0a39f", fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="bands.alpha" stroke={meta.color} strokeWidth={3} fill="url(#detailArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Emotion mix" subtitle="Share of classified readings" />
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart><Pie data={distribution} dataKey="value" innerRadius={60} outerRadius={86} paddingAngle={3}>{distribution.map((item) => <Cell key={item.name} fill={item.fill} />)}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="donut-center"><strong>24</strong><span>minutes</span></div>
          </div>
          <div className="distribution-list">{distribution.slice(0, 3).map((item) => <span key={item.name}><i style={{ background: item.fill }} />{item.name}<b>{item.value}%</b></span>)}</div>
        </Card>
      </section>
      <Card className="session-note">
        <div className="insight-icon"><Sparkles /></div>
        <div><span className="eyebrow">Session reflection</span><h3>You settled into a calm state after the first six minutes.</h3><p>Signal quality stayed consistently high while “{session.track}” was playing.</p></div>
        <button className="secondary-button">Add a personal note</button>
      </Card>
    </div>
  );
}

function Analytics() {
  const [range, setRange] = useState("7 days");
  return (
    <div className="page-stack">
      <div className="page-actions">
        <div className="segmented-control">
          {["7 days", "30 days", "3 months"].map((item) => <button key={item} onClick={() => setRange(item)} className={range === item ? "active" : ""}>{item}</button>)}
        </div>
        <button className="secondary-button"><CalendarDays size={16} /> Jun 4 – Jun 10</button>
      </div>
      <section className="metric-grid">
        <MetricCard label="Calm time" value="44%" detail="+12% from previous period" icon={<HeartPulse />} tone="teal" />
        <MetricCard label="Average confidence" value="81%" detail="+3% from previous period" icon={<Sparkles />} tone="violet" />
        <MetricCard label="Mindful time" value="2h 48m" detail="Across 7 sessions" icon={<Clock3 />} tone="amber" />
        <MetricCard label="Signal consistency" value="92%" detail="Excellent overall" icon={<Signal />} tone="blue" />
      </section>
      <section className="content-grid content-grid-main">
        <Card className="chart-card">
          <CardHeader title="Emotional balance" subtitle={`Daily distribution over ${range.toLowerCase()}`} />
          <div className="chart-large">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrend} margin={{ top: 10, right: 6, left: -24 }}>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#e8e8e2" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#7d827d", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a0a39f", fontSize: 11 }} />
                <Tooltip cursor={{ fill: "#f6f7f3" }} />
                <Bar dataKey="calm" stackId="a" fill="#1f8f7a" radius={[0, 0, 4, 4]} />
                <Bar dataKey="happy" stackId="a" fill="#d99b28" />
                <Bar dataKey="elevated" stackId="a" fill="#7968a8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend"><span><i className="legend-dot calm" /> Calm</span><span><i className="legend-dot happy" /> Happy</span><span><i className="legend-dot violet" /> Elevated arousal</span></div>
        </Card>
        <Card>
          <CardHeader title="Overall mix" subtitle="All readings in this period" />
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart><Pie data={distribution} dataKey="value" innerRadius={66} outerRadius={94} paddingAngle={3}>{distribution.map((item) => <Cell key={item.name} fill={item.fill} />)}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="donut-center"><strong>318</strong><span>readings</span></div>
          </div>
          <div className="distribution-list">{distribution.map((item) => <span key={item.name}><i style={{ background: item.fill }} />{item.name}<b>{item.value}%</b></span>)}</div>
        </Card>
      </section>
      <section className="insights-grid">
        <article><span className="insight-icon"><CloudSun /></span><div><strong>Your calmest time</strong><p>Morning sessions between 8–10 AM show 18% more calm readings.</p></div></article>
        <article><span className="insight-icon amber"><Music2 /></span><div><strong>Music response</strong><p>“Open Sky” is associated with your fastest shift toward calm.</p></div></article>
        <article><span className="insight-icon violet"><Zap /></span><div><strong>Consistency</strong><p>Six consecutive mindful days is your longest rhythm this month.</p></div></article>
      </section>
    </div>
  );
}

function MusicTherapy() {
  const [selected, setSelected] = useState<Record<Emotion, string>>({
    Calm: "Open Sky",
    Happy: "Golden Hour",
    Sad: "Morning Light",
    Anxious: "Quiet Current",
    Angry: "Slow Tides",
    Focused: "Deep Focus",
    Stressed: "Ease Mind",
    Tired: "Morning Boost"
  });
  const [playing, setPlaying] = useState<string | null>("Open Sky");

  return (
    <div className="page-stack">
      <section className="music-intro">
        <div><span className="hero-kicker"><Headphones size={16} /> Personalized response</span><h2>Choose what helps you shift, settle, or stay.</h2><p>MindTune uses these preferences when your device detects a change in emotional state.</p></div>
        <button className="secondary-button"><SlidersHorizontal size={16} /> Reset recommendations</button>
      </section>
      <section className="music-grid">
        {(Object.keys(musicOptions) as Emotion[]).map((emotion) => {
          const meta = emotionMeta[emotion];
          return (
            <Card key={emotion} className="music-preference" style={{ "--emotion": meta.color, "--emotion-soft": meta.soft } as React.CSSProperties}>
              <div className="music-card-head"><div className="emotion-icon"><Activity size={18} /></div><div><span>When I feel</span><h3>{emotion}</h3></div><EmotionBadge emotion={emotion} /></div>
              <p>{meta.message}</p>
              <label>Therapy track</label>
              <div className="select-wrap">
                <select value={selected[emotion]} onChange={(event) => setSelected((value) => ({ ...value, [emotion]: event.target.value }))}>
                  {musicOptions[emotion].map((track) => <option key={track}>{track}</option>)}
                </select>
                <ChevronDown size={16} />
              </div>
              <div className="track-preview">
                <div className="mini-album"><Music2 size={20} /></div>
                <div><strong>{selected[emotion]}</strong><span>Ambient therapy · 6:42</span></div>
                <button className="small-play" onClick={() => setPlaying(playing === selected[emotion] ? null : selected[emotion])}>
                  {playing === selected[emotion] ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </button>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

function Devices() {
  const [pairOpen, setPairOpen] = useState(false);
  const [step, setStep] = useState(1);
  return (
    <div className="page-stack">
      <section className="device-hero">
        <div className="large-device">
          <div className="device-led" />
          <BrainCircuit size={42} />
          <span>MINDTUNE</span>
        </div>
        <div className="device-main-copy">
          <div className="status-line"><span className="online-dot" /> Connected</div>
          <h2>MindTune One</h2>
          <p>Your device is online, calibrated, and ready for a session.</p>
          <div className="device-meta"><span><Wifi size={16} /> Home Wi-Fi</span><span><BatteryMedium size={17} /> 76%</span><span><Radio size={16} /> Firmware 4.2</span></div>
        </div>
        <Link to="/dashboard/live" className="primary-button"><Play size={16} fill="currentColor" /> Start session</Link>
      </section>
      <section className="content-grid device-grid">
        <Card>
          <CardHeader title="Connection health" subtitle="Live device diagnostics" />
          <div className="health-list">
            <HealthItem icon={<Wifi />} title="Wi-Fi" detail="Strong · 192.168.1.42" status="Connected" />
            <HealthItem icon={<Bluetooth />} title="Bluetooth audio" detail="CL-790 Headphones" status="Connected" />
            <HealthItem icon={<Signal />} title="EEG electrodes" detail="All three contacts detected" status="Excellent" />
            <HealthItem icon={<BatteryMedium />} title="Battery" detail="About 3h 12m remaining" status="76%" />
          </div>
        </Card>
        <Card>
          <CardHeader title="Device details" subtitle="Hardware and software" />
          <dl className="detail-list"><div><dt>Device ID</dt><dd>MT-ESP32-001</dd></div><div><dt>Last seen</dt><dd>Just now</dd></div><div><dt>Firmware</dt><dd>Version 4.2</dd></div><div><dt>Sample rate</dt><dd>256 Hz</dd></div><div><dt>Storage</dt><dd>SD card · 58% free</dd></div></dl>
          <button className="secondary-button full-width">Check for updates</button>
        </Card>
      </section>
      <Card className="add-device-card">
        <div className="add-icon"><Plus /></div>
        <div><h3>Add another MindTune device</h3><p>Pair a new device using its six-character setup code.</p></div>
        <button className="secondary-button" onClick={() => { setPairOpen(true); setStep(1); }}>Pair device</button>
      </Card>
      {pairOpen && (
        <div className="modal-scrim">
          <div className="modal">
            <button className="modal-close" onClick={() => setPairOpen(false)}><X size={19} /></button>
            <span className="eyebrow">Step {step} of 2</span>
            {step === 1 ? (
              <>
                <div className="modal-icon"><Smartphone /></div><h2>Pair a MindTune device</h2><p>Enter the setup code shown in your device’s Serial Monitor.</p>
                <input className="code-input" defaultValue="MT-001" aria-label="Device setup code" />
                <button className="primary-button full-width" onClick={() => setStep(2)}>Find device</button>
              </>
            ) : (
              <>
                <div className="modal-icon success"><Check /></div><h2>Device found</h2><p>MindTune One is online and ready to be added to your account.</p>
                <div className="found-device"><BrainCircuit /><div><strong>MindTune One</strong><span>ESP32 · Signal strong</span></div></div>
                <button className="primary-button full-width" onClick={() => setPairOpen(false)}>Add device</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState({ reminders: true, weekly: true, sound: false, rawData: false });
  const toggle = (key: keyof typeof settings) => setSettings((value) => ({ ...value, [key]: !value[key] }));
  return (
    <div className="settings-layout">
      <Card>
        <CardHeader title="Profile" subtitle="Your personal MindTune account" />
        <div className="profile-row"><div className="large-avatar">AK</div><div><strong>Abhi Kumar</strong><span>abhi@example.com</span></div><button className="secondary-button">Change photo</button></div>
        <div className="form-grid"><label>Display name<input defaultValue="Abhi Kumar" /></label><label>Time zone<select defaultValue="Asia/Kolkata"><option>Asia/Kolkata</option><option>UTC</option></select></label></div>
        <button className="primary-button">Save changes</button>
      </Card>
      <Card>
        <CardHeader title="Notifications" subtitle="Choose how MindTune checks in" />
        <ToggleRow title="Session reminders" detail="A gentle reminder on days you usually use MindTune" active={settings.reminders} onClick={() => toggle("reminders")} />
        <ToggleRow title="Weekly wellness summary" detail="Receive a concise overview of your trends" active={settings.weekly} onClick={() => toggle("weekly")} />
        <ToggleRow title="Device sounds" detail="Play status tones during connection and calibration" active={settings.sound} onClick={() => toggle("sound")} />
      </Card>
      <Card>
        <CardHeader title="Privacy and data" subtitle="Your EEG insights remain yours" />
        <ToggleRow title="Store raw EEG samples" detail="Off by default. Processed band values are enough for this prototype." active={settings.rawData} onClick={() => toggle("rawData")} />
        <div className="privacy-actions"><button className="secondary-button">Download my data</button><button className="danger-button">Delete my data</button></div>
      </Card>
    </div>
  );
}

function Help() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    ["How do I place the electrodes?", "Place one active electrode on the forehead, one on the temporal region, and the reference electrode on the earlobe. The live screen will confirm contact quality."],
    ["Why is my signal quality low?", "Check that each electrode has full skin contact, move away from electrical noise, and sit still during calibration."],
    ["Does MindTune diagnose mental health conditions?", "No. MindTune is a research wellness prototype. Its classifications are informational and are not medical diagnoses."],
    ["Can I use MindTune without internet?", "EEG processing and local SD/Bluetooth music can work offline. The web dashboard needs a network connection to receive telemetry."],
    ["How often does the emotion update?", "The documented firmware classifies a new EEG window approximately every five seconds."]
  ];
  return (
    <div className="page-stack">
      <section className="help-hero">
        <span className="hero-kicker"><CircleHelp size={16} /> MindTune support</span>
        <h2>What can we help you with?</h2>
        <div className="help-search"><Search size={19} /><input placeholder="Search setup, signal, music, or privacy" /></div>
      </section>
      <section className="help-topics">
        <article><span><LaptopMinimalCheck /></span><h3>Get started</h3><p>Set up the device and complete your first calibration.</p><button>View guide <ChevronRight size={15} /></button></article>
        <article><span><Signal /></span><h3>Improve signal</h3><p>Check electrode placement and reduce interference.</p><button>Troubleshoot <ChevronRight size={15} /></button></article>
        <article><span><ShieldCheck /></span><h3>Safety & privacy</h3><p>Understand how your processed EEG data is handled.</p><button>Learn more <ChevronRight size={15} /></button></article>
      </section>
      <Card>
        <CardHeader title="Frequently asked questions" subtitle="Quick answers about the MindTune prototype" />
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <button className={`faq-item ${open === index ? "open" : ""}`} key={question} onClick={() => setOpen(open === index ? null : index)}>
              <span><strong>{question}</strong>{open === index && <p>{answer}</p>}</span><ChevronDown size={18} />
            </button>
          ))}
        </div>
      </Card>
      <div className="safety-note"><ShieldCheck /><div><strong>MindTune is not an emergency or medical service.</strong><p>If you are in immediate danger or crisis, contact local emergency services or a qualified healthcare professional.</p></div></div>
    </div>
  );
}

function Card({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <article className={`card ${className}`} style={style}>{children}</article>;
}

function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="card-header"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action && <div className="card-action">{action}</div>}</div>;
}

function MetricCard({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: ReactNode; tone: string }) {
  return <Card className="metric-card"><span className={`metric-icon ${tone}`}>{icon}</span><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></Card>;
}

function EmotionBadge({ emotion }: { emotion: Emotion }) {
  const meta = emotionMeta[emotion];
  return <span className="emotion-badge" style={{ color: meta.color, background: meta.soft }}><i style={{ background: meta.color }} />{emotion}</span>;
}

function SessionRow({ session }: { session: (typeof sessions)[number] }) {
  return <Link to={`/dashboard/sessions/${session.id}`} className="session-row"><span className="session-date"><strong>{session.date.split(",")[0]}</strong><small>{session.time}</small></span><EmotionBadge emotion={session.dominantEmotion} /><span className="session-duration">{session.duration}</span><ChevronRight size={17} /></Link>;
}

function HealthItem({ icon, title, detail, status }: { icon: ReactNode; title: string; detail: string; status: string }) {
  return <div className="health-item"><span className="health-icon">{icon}</span><div><strong>{title}</strong><span>{detail}</span></div><b><Check size={13} /> {status}</b></div>;
}

function ToggleRow({ title, detail, active, onClick }: { title: string; detail: string; active: boolean; onClick: () => void }) {
  return <div className="toggle-row"><div><strong>{title}</strong><span>{detail}</span></div><button className={`toggle ${active ? "active" : ""}`} onClick={onClick} aria-label={`Toggle ${title}`}><span /></button></div>;
}

export default App;
