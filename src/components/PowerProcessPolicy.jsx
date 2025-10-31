import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Line, ComposedChart } from 'recharts';

const PowerProcessPolicy = () => {
  const [policies, setPolicies] = useState([
    { power: 3, policy: 7, name: 'Healthcare Reform', color: '#3b82f6' },
    { power: 8, policy: 2, name: 'Tax Policy', color: '#ef4444' },
    { power: 5, policy: 9, name: 'Education Bill', color: '#22c55e' },
    { power: 2, policy: 4, name: 'Infrastructure', color: '#f59e0b' },
    { power: 9, policy: 6, name: 'Defense Budget', color: '#8b5cf6' },
    { power: 6, policy: 3, name: 'Trade Agreement', color: '#ec4899' },
  ]);

  const [newPolicy, setNewPolicy] = useState({ power: 5, policy: 5, name: '' });
  const [showFunction, setShowFunction] = useState(true);
  const [degree, setDegree] = useState(2);

  // Helper functions defined before useMemo
  const gaussianElimination = (A, b) => {
    const n = b.length;
    const Ab = A.map((row, i) => [...row, b[i]]);
    
    // Forward elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(Ab[k][i]) > Math.abs(Ab[maxRow][i])) {
          maxRow = k;
        }
      }
      [Ab[i], Ab[maxRow]] = [Ab[maxRow], Ab[i]];
      
      // Eliminate column
      for (let k = i + 1; k < n; k++) {
        const factor = Ab[k][i] / Ab[i][i];
        for (let j = i; j <= n; j++) {
          Ab[k][j] -= factor * Ab[i][j];
        }
      }
    }
    
    // Back substitution
    const x = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      x[i] = Ab[i][n];
      for (let j = i + 1; j < n; j++) {
        x[i] -= Ab[i][j] * x[j];
      }
      x[i] /= Ab[i][i];
    }
    
    return x;
  };

  const solveLinearSystem = (X, y, d) => {
    const n = X.length;
    const XtX = [];
    const Xty = [];
    
    // Calculate X^T * X
    for (let i = 0; i <= d; i++) {
      XtX[i] = [];
      for (let j = 0; j <= d; j++) {
        let sum = 0;
        for (let k = 0; k < n; k++) {
          sum += X[k][i] * X[k][j];
        }
        XtX[i][j] = sum;
      }
    }
    
    // Calculate X^T * y
    for (let i = 0; i <= d; i++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += X[k][i] * y[k];
      }
      Xty[i] = sum;
    }
    
    // Solve using Gaussian elimination
    return gaussianElimination(XtX, Xty);
  };

  // Polynomial regression to find best fit function
  const functionData = useMemo(() => {
    if (policies.length < 2) return [];

    // Sort policies by power for smooth line
    const sortedPolicies = [...policies].sort((a, b) => a.power - b.power);
    
    // Simple polynomial regression
    const n = sortedPolicies.length;
    const d = Math.min(degree, n - 1); // Degree can't exceed n-1
    
    // Create matrix for least squares
    const X = [];
    const y = [];
    
    sortedPolicies.forEach(p => {
      const row = [];
      for (let i = 0; i <= d; i++) {
        row.push(Math.pow(p.power, i));
      }
      X.push(row);
      y.push(p.policy);
    });
    
    // Solve using normal equations: coefficients = (X^T * X)^-1 * X^T * y
    // Simplified approach for small matrices
    const coefficients = solveLinearSystem(X, y, d);
    
    // Generate smooth curve points
    const curvePoints = [];
    for (let x = 0; x <= 10; x += 0.2) {
      let yValue = 0;
      for (let i = 0; i <= d; i++) {
        yValue += coefficients[i] * Math.pow(x, i);
      }
      curvePoints.push({ power: x, policy: yValue });
    }
    
    return curvePoints;
  }, [policies, degree]);

  const addPolicy = () => {
    if (newPolicy.name.trim()) {
      setPolicies([...policies, { 
        ...newPolicy, 
        color: `hsl(${Math.random() * 360}, 70%, 60%)` 
      }]);
      setNewPolicy({ power: 5, policy: 5, name: '' });
    }
  };

  const removePolicy = (index) => {
    setPolicies(policies.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Power → Process → Policy
          </h1>
          <p className="text-indigo-200 text-lg max-w-3xl mx-auto">
            A mathematical perspective: Each policy exists at exactly one point in the coordinate system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-indigo-300 border-opacity-30">
            <h3 className="text-xl font-bold text-indigo-300 mb-3">Power (Domain)</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              The <span className="font-semibold">input value</span> on the x-axis. Power is the ability to persuade an entity to do something. Each unit of power represents convincing one entity to act.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-purple-300 border-opacity-30">
            <h3 className="text-xl font-bold text-purple-300 mb-3">Process (Function)</h3>
            <p className="text-purple-100 text-sm leading-relaxed">
              The <span className="font-semibold">mathematical function</span> itself. Like electoral processes or execution processes, it transforms the input (power) into output (policy).
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-pink-300 border-opacity-30">
            <h3 className="text-xl font-bold text-pink-300 mb-3">Policy (Range)</h3>
            <p className="text-pink-100 text-sm leading-relaxed">
              The <span className="font-semibold">output value</span> on the y-axis. Each policy point is unique: one input can only produce one output—the core property of functions.
            </p>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">The Cartesian Space</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-indigo-200 text-sm">
                <input
                  type="checkbox"
                  checked={showFunction}
                  onChange={(e) => setShowFunction(e.target.checked)}
                  className="w-4 h-4"
                />
                Show Best Fit Function
              </label>
              {showFunction && (
                <div>
                  <label className="text-indigo-200 text-sm mr-2">Polynomial Degree: {degree}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={degree}
                    onChange={(e) => setDegree(parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
              )}
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis 
                type="number" 
                dataKey="power" 
                domain={[0, 10]}
                stroke="#818cf8"
                tick={{ fill: '#818cf8' }}
              >
                <Label 
                  value="Power (Domain/Input)" 
                  position="bottom" 
                  offset={40}
                  style={{ fill: '#818cf8', fontSize: '14px', fontWeight: 'bold' }}
                />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="policy" 
                domain={[0, 10]}
                stroke="#818cf8"
                tick={{ fill: '#818cf8' }}
                tickFormatter={(value) => Math.round(value)}
              >
                <Label 
                  value="Policy (Range/Output)" 
                  angle={-90} 
                  position="left"
                  offset={40}
                  style={{ fill: '#818cf8', fontSize: '14px', fontWeight: 'bold' }}
                />
              </YAxis>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1b4b', 
                  border: '1px solid #818cf8', 
                  borderRadius: '8px',
                  color: '#e0e7ff'
                }}
                formatter={(value, name) => [value.toFixed(1), name === 'policy' ? 'Policy' : 'Power']}
              />
              {showFunction && functionData.length > 0 && (
                <Line
                  data={functionData}
                  type="monotone"
                  dataKey="policy"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Process Function"
                />
              )}
              <Scatter 
                data={policies} 
                fill="#8884d8"
                shape={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={8} fill={payload.color} opacity={0.8} />
                      <circle cx={cx} cy={cy} r={8} fill={payload.color} opacity={0.3} stroke={payload.color} strokeWidth={2} />
                    </g>
                  );
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 bg-black bg-opacity-30 rounded-lg">
            <p className="text-indigo-100 text-sm leading-relaxed">
              <span className="font-semibold text-indigo-300">Key insight:</span> Each policy exists at exactly one coordinate. 
              When you exercise power (x-value), the process function determines where the policy appears (y-value). 
              Just like f(x) = y, one input of power produces one specific policy outcome.
            </p>
            {showFunction && functionData.length > 0 && (
              <p className="text-yellow-200 text-sm leading-relaxed mt-2">
                <span className="font-semibold text-yellow-300">Dashed line:</span> The polynomial function that best fits these policy points, 
                representing the underlying process that transforms power into policy outcomes.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Add Your Own Policy</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="text-indigo-200 text-sm mb-2 block">Policy Name</label>
              <input
                type="text"
                value={newPolicy.name}
                onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                placeholder="e.g., Climate Action"
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-indigo-300 border-opacity-30 rounded-lg text-white placeholder-indigo-300"
              />
            </div>
            <div>
              <label className="text-indigo-200 text-sm mb-2 block">Power: {newPolicy.power}</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={newPolicy.power}
                onChange={(e) => setNewPolicy({ ...newPolicy, power: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-indigo-200 text-sm mb-2 block">Policy: {newPolicy.policy}</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={newPolicy.policy}
                onChange={(e) => setNewPolicy({ ...newPolicy, policy: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
          <button
            onClick={addPolicy}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            Add Policy Point
          </button>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Current Policies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {policies.map((policy, index) => (
              <div 
                key={index}
                className="p-3 bg-black bg-opacity-30 rounded-lg border border-white border-opacity-20 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: policy.color }}
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">{policy.name}</div>
                    <div className="text-indigo-300 text-xs">
                      Power: {policy.power} → Policy: {policy.policy}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removePolicy(index)}
                  className="text-red-400 hover:text-red-300 text-xs px-2 py-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerProcessPolicy;

