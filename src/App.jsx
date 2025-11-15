import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PowerSimulator from './components/PowerSimulator';
import PowerProcessPolicy from './components/PowerProcessPolicy';

function Homepage() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Political Theory Section */}
        <Link to="/political-theory" className="group relative flex-1 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl block cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
          <img 
            src="/images/political-theory.jpg" 
            alt="Political Theory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent z-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Political Theory</h2>
          </div>
        </Link>

        {/* USSR Section */}
        <div className="group relative flex-1 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
          <img 
            src="/images/ussr.jpg" 
            alt="USSR"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent z-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">USSR</h2>
          </div>
        </div>

        {/* PRC Section */}
        <div className="group relative flex-1 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
          <img 
            src="/images/prc.jpg" 
            alt="PRC"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent z-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">PRC</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function PoliticalTheoryPage() {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Header with back button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2 text-slate-700 font-semibold hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>
      
      {/* Two divided sections - each linking to a component */}
      <div className="flex h-full">
        {/* Left Section - Power Simulator Link */}
        <Link 
          to="/power-simulator" 
          className="group relative flex-1 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl block cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="text-center z-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">理解政治权力</h2>
              <p className="text-xl text-white/90">Power Simulator</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
        </Link>
        
        {/* Divider */}
        <div className="w-1 bg-gradient-to-b from-slate-300 to-slate-400 flex-shrink-0"></div>
        
        {/* Right Section - Power Process Policy Link */}
        <Link 
          to="/power-process" 
          className="group relative flex-1 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl block cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <div className="text-center z-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Power → Process → Policy</h2>
              <p className="text-xl text-white/90">Mathematical Perspective</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
        </Link>
      </div>
    </div>
  );
}

function PowerSimulatorPage() {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/political-theory')}
          className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2 text-slate-700 font-semibold hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Political Theory
        </button>
      </div>
      <PowerSimulator />
    </div>
  );
}

function PowerProcessPage() {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/political-theory')}
          className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2 text-slate-700 font-semibold hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Political Theory
        </button>
      </div>
      <PowerProcessPolicy />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/political-theory" element={<PoliticalTheoryPage />} />
        <Route path="/power-simulator" element={<PowerSimulatorPage />} />
        <Route path="/power-process" element={<PowerProcessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

