import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { LogOut, Play, SkipForward, CheckCircle, Users, Clock, AlertCircle, Sun, Moon, Calendar } from 'lucide-react';

const Dashboard = () => {
    const [session, setSession] = useState(null);
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clinicId, setClinicId] = useState(localStorage.getItem('clinic_id'));

    // Time inputs state with AM/PM
    const [startHour, setStartHour] = useState("09");
    const [startMinute, setStartMinute] = useState("00");
    const [startPeriod, setStartPeriod] = useState("AM");
    const [endHour, setEndHour] = useState("12");
    const [endMinute, setEndMinute] = useState("00");
    const [endPeriod, setEndPeriod] = useState("PM");
    const [sessionType, setSessionType] = useState("Morning"); // Morning or Evening

    // Helper to convert 12-hour to 24-hour format
    const to24Hour = (hour, period) => {
        let h = parseInt(hour);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        return h.toString().padStart(2, '0');
    };

    const navigate = useNavigate();

    // Check for active session on load
    useEffect(() => {
        if (!clinicId) return;
        const fetchActiveSession = async () => {
            try {
                const response = await api.get(`/queue/active/${clinicId}`);
                if (response.data.success) {
                    setSession(response.data.session);
                }
            } catch (error) {
                console.error("Error checking active session:", error);
            }
        };
        fetchActiveSession();
    }, [clinicId]);

    // Polling for queue updates
    useEffect(() => {
        if (!session) return;

        const fetchQueue = async () => {
            try {
                const response = await api.get(`/queue/${session.id}`);
                if (response.data.success) {
                    setQueue(response.data.queue);
                }
            } catch (error) {
                console.error("Error fetching queue:", error);
            }
        };

        fetchQueue();
        const interval = setInterval(fetchQueue, 5000);
        return () => clearInterval(interval);
    }, [session]);

    const handleCreateSession = async (name) => {
        try {
            // Set preset times based on session type
            let sessionStart, sessionEnd;

            if (name === 'Morning') {
                sessionStart = "09:00"; // 9 AM
                sessionEnd = "14:00";   // 2 PM
            } else if (name === 'Evening') {
                sessionStart = "17:00"; // 5 PM
                sessionEnd = "22:00";   // 10 PM
            } else {
                // Custom session - convert AM/PM to 24-hour format
                const start24 = to24Hour(startHour, startPeriod);
                const end24 = to24Hour(endHour, endPeriod);
                sessionStart = `${start24}:${startMinute}`;
                sessionEnd = `${end24}:${endMinute}`;
            }

            const response = await api.post('/queue/session', {
                clinicId,
                sessionName: name,
                startTime: sessionStart,
                endTime: sessionEnd
            });
            if (response.data.success) {
                setSession(response.data.session);
            }
        } catch (error) {
            console.error("Error creating session:", error);
            alert("Failed to start session");
        }
    };

    const handleAction = async (action) => {
        if (!session) return;
        try {
            await api.post(`/queue/${action}`, { sessionId: session.id });
            // Immediate refresh
            const response = await api.get(`/queue/${session.id}`);
            if (response.data.success) {
                setQueue(response.data.queue);
            }
        } catch (error) {
            console.error(`Error performing ${action}:`, error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const waitingPatients = queue.filter(p => p.status === 'waiting');
    const currentPatient = queue.find(p => p.status === 'called');
    const totalPatients = queue.length; // All patients joined this session

    if (!clinicId) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                        <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">QueueCare Dashboard</h1>
                        {session && <p className="text-sm text-slate-500">{session.session_name} Session • {session.start_time?.slice(0, 5)} - {session.end_time?.slice(0, 5)}</p>}
                    </div>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition px-4 py-2 hover:bg-red-50 rounded-lg">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {!session ? (
                    <div className="flex flex-col items-center justify-center h-[70vh] space-y-8 animate-in fade-in zoom-in duration-500">
                        <h2 className="text-3xl font-bold text-slate-700">Start a New Session</h2>

                        {/* Time Controls with AM/PM */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
                            <p className="text-center text-slate-400 text-sm">Or set custom times:</p>
                            <div className="flex gap-8 items-center justify-center">
                                {/* Start Time */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Start Time</label>
                                    <div className="flex gap-2 items-center">
                                        <select value={startHour} onChange={(e) => setStartHour(e.target.value)}
                                            className="text-xl font-bold text-slate-800 bg-slate-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                            {[...Array(12)].map((_, i) => <option key={i} value={(i + 1).toString().padStart(2, '0')}>{i + 1}</option>)}
                                        </select>
                                        <span className="text-xl text-slate-400">:</span>
                                        <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}
                                            className="text-xl font-bold text-slate-800 bg-slate-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                            <option value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                        <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)}
                                            className="text-lg font-bold text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="text-2xl text-slate-300">→</div>

                                {/* End Time */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">End Time</label>
                                    <div className="flex gap-2 items-center">
                                        <select value={endHour} onChange={(e) => setEndHour(e.target.value)}
                                            className="text-xl font-bold text-slate-800 bg-slate-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                            {[...Array(12)].map((_, i) => <option key={i} value={(i + 1).toString().padStart(2, '0')}>{i + 1}</option>)}
                                        </select>
                                        <span className="text-xl text-slate-400">:</span>
                                        <select value={endMinute} onChange={(e) => setEndMinute(e.target.value)}
                                            className="text-xl font-bold text-slate-800 bg-slate-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                            <option value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                        <select value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)}
                                            className="text-lg font-bold text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCreateSession('Custom')}
                                className="mx-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition"
                            >
                                Start Custom Session
                            </button>
                        </div>

                        {/* Session Type and Start Button */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                <label className="text-slate-600 font-medium">Session Type:</label>
                                <select
                                    value={sessionType}
                                    onChange={(e) => setSessionType(e.target.value)}
                                    className="text-xl font-bold text-slate-800 bg-slate-50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="Morning">☀️ Morning (9 AM - 2 PM)</option>
                                    <option value="Evening">🌙 Evening (5 PM - 10 PM)</option>
                                    <option value="Custom">⚙️ Custom Times</option>
                                </select>
                            </div>

                            <button
                                onClick={() => handleCreateSession(sessionType)}
                                className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-2xl font-bold transition shadow-lg hover:shadow-xl transform active:scale-95 flex items-center gap-3"
                            >
                                <Play className="w-8 h-8" />
                                Start Session
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Controls & Current Status */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Current Patient Card */}
                            <div className="bg-white rounded-3xl shadow-lg p-8 border-l-8 border-emerald-500 relative overflow-hidden h-64 flex flex-col justify-center">
                                <div className="absolute -right-10 -bottom-10 opacity-5">
                                    <Users className="w-64 h-64" />
                                </div>
                                <h3 className="text-slate-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    Now Serving
                                </h3>
                                {currentPatient ? (
                                    <div className="animate-in slide-in-from-bottom-5 duration-300">
                                        <div className="text-8xl font-black text-slate-900 mb-2 tracking-tighter">
                                            #{currentPatient.token_number}
                                        </div>
                                        <div className="text-2xl text-slate-600 font-mono bg-slate-100 inline-block px-4 py-2 rounded-lg">
                                            {currentPatient.patient_phone}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-4xl font-bold text-slate-300 py-8">
                                        Waiting for Next...
                                    </div>
                                )}
                            </div>

                            {/* Big Buttons */}
                            <div className="grid grid-cols-3 gap-6">
                                <button
                                    onClick={() => handleAction('next')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl py-8 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl transform active:scale-[0.98] transition group border-b-4 border-emerald-800"
                                >
                                    <Play className="w-12 h-12 group-hover:rotate-12 transition" />
                                    <span className="text-2xl font-bold">CALL NEXT</span>
                                </button>

                                <button
                                    onClick={() => handleAction('skip')}
                                    className="bg-amber-500 hover:bg-amber-600 text-white rounded-3xl py-8 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl transform active:scale-[0.98] transition group border-b-4 border-amber-700"
                                >
                                    <SkipForward className="w-12 h-12 group-hover:translate-x-1 transition" />
                                    <span className="text-2xl font-bold">SKIP</span>
                                </button>

                                <button
                                    onClick={() => handleAction('complete')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl py-8 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl transform active:scale-[0.98] transition group border-b-4 border-blue-800"
                                >
                                    <CheckCircle className="w-12 h-12 group-hover:scale-110 transition" />
                                    <span className="text-2xl font-bold">DONE</span>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Waiting</p>
                                        <p className="text-3xl font-bold text-slate-900">{waitingPatients.length}</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Total Patients</p>
                                        <p className="text-3xl font-bold text-slate-900">{totalPatients}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Queue List */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 h-[80vh] overflow-hidden flex flex-col border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <div className="bg-emerald-100 p-2 rounded-lg"><Users className="w-5 h-5 text-emerald-600" /></div>
                                Waiting Queue
                            </h3>
                            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                {waitingPatients.length === 0 ? (
                                    <div className="text-center text-slate-400 py-20 flex flex-col items-center gap-4">
                                        <Users className="w-12 h-12 opacity-20" />
                                        <p>Queue is empty</p>
                                    </div>
                                ) : (
                                    waitingPatients.map((p) => (
                                        <div key={p.id} className="p-4 bg-slate-50 hover:bg-white rounded-xl border border-slate-100 hover:shadow-md transition flex justify-between items-center group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
                                                    #{p.token_number}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-slate-900 font-medium">Patient</div>
                                                    <div className="text-slate-500 font-mono text-xs">{p.patient_phone}</div>
                                                </div>
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition"></div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
