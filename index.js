import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Layers, 
  CheckSquare, 
  AlertCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("General");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const [links] = useState([
    { name: "GitHub", url: "https://github.com", icon: "🐙", category: "Dev" },
    { name: "Vercel", url: "https://vercel.com", icon: "▲", category: "Dev" },
    { name: "ChatGPT", url: "https://chatgpt.com", icon: "🤖", category: "AI" },
    { name: "Claude", url: "https://claude.ai", icon: "🧠", category: "AI" },
  ]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("v2_center_tasks");
    if (savedTasks) {
      try { setTasks(JSON.parse(savedTasks)); } catch (e) { console.error(e); }
    } else {
      const initial = [
        { id: "1", title: "Review infrastructure blueprint", category: "Dev", priority: "High", completed: false },
        { id: "2", title: "Check Vercel deployment status", category: "Dev", priority: "Medium", completed: true },
      ];
      setTasks(initial);
      localStorage.setItem("v2_center_tasks", JSON.stringify(initial));
    }
  }, []);

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem("v2_center_tasks", JSON.stringify(updated));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      category: taskCategory,
      priority: taskPriority,
      completed: false
    };
    saveTasks([newTask, ...tasks]);
    setTaskTitle("");
  };

  const toggleTask = (id) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.length - completedCount;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              <Layers className="text-indigo-400 w-8 h-8" /> Command Center
            </h1>
            <p className="text-sm text-slate-400 mt-1">Task Stream & App Pipeline Launcher</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Target Connected
          </span>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active</p><h3 className="text-2xl font-bold mt-1">{activeCount} Tasks</h3></div>
            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400"><Clock /></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completed</p><h3 className="text-2xl font-bold mt-1">{completedCount} Tasks</h3></div>
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400"><CheckSquare /></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Velocity</p><h3 className="text-2xl font-bold mt-1">{completionRate}%</h3></div>
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400"><TrendingUp /></div>
          </div>
        </section>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="text-indigo-400 w-5 h-5" /> Add New Task</h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter explicit task objective..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none">
                    <option value="General">General</option><option value="Dev">Development</option><option value="Automation">Automation</option>
                  </select>
                  <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none">
                    <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Deploy Task
                </button>
              </form>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center gap-2"><CheckSquare className="text-indigo-400 w-5 h-5" /> Task Log</h2>
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {["All", "Active", "Completed"].map((type) => (
                    <button key={type} onClick={() => setFilter(type)} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${filter === type ? "bg-indigo-600 text-white" : "text-slate-400"}`}>{type}</button>
                  ))}
                </div>
              </div>
              <div className="divide-y divide-slate-800 max-h-[400px] overflow-y-auto">
                {filteredTasks.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center gap-2"><AlertCircle /><p className="text-sm">No tasks registered here.</p></div>
                ) : (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-850">
                      <div className="flex items-center gap-3 min-w-0">
                        <button onClick={() => toggleTask(task.id)} className="text-slate-400 hover:text-indigo-400 transition-colors">
                          {task.completed ? <CheckCircle2 className="w-5 h-5 text-indigo-500" /> : <Circle className="w-5 h-5" />}
                        </button>
                        <span className={`text-sm font-medium truncate ${task.completed ? "line-through text-slate-500" : "text-slate-200"}`}>{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">{task.priority}</span>
                        <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-rose-400 p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
              <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><Sparkles className="text-indigo-400 w-5 h-5" /> Quick Launcher</h2>
              <p className="text-xs text-slate-400 mb-4">Direct links to primary applications</p>
              <div className="space-y-2">
                {links.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500 hover:bg-slate-900 group transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{link.icon}</span>
                      <div><p className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">{link.name}</p></div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
