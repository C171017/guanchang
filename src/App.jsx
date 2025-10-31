import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PowerSimulator from './components/PowerSimulator';
import PowerProcessPolicy from './components/PowerProcessPolicy';
import { Zap, TrendingUp } from 'lucide-react';

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 mt-20">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">Power Analysis</h1>
          <p className="text-xl text-slate-600">Explore political power through interactive visualizations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/power-simulator"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">理解政治权力</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Explore Robert Dahl's definition of power. Adjust resources, legitimacy, incentives, coercion, and resistance to see how power dynamics change.
            </p>
            <div className="mt-4 text-blue-600 font-semibold">
              Explore → 
            </div>
          </Link>

          <Link
            to="/power-process"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-indigo-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Power → Process → Policy</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              A mathematical perspective on how power transforms into policy through processes. Visualize policy points in a Cartesian coordinate system.
            </p>
            <div className="mt-4 text-indigo-600 font-semibold">
              Explore → 
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/power-simulator" element={<PowerSimulator />} />
        <Route path="/power-process" element={<PowerProcessPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

