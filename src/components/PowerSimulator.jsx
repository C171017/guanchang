import React, { useState, useEffect } from 'react';
import { Users, Zap, Scale, Gift, AlertTriangle, Shield } from 'lucide-react';

const PowerSimulator = () => {
  const [resources, setResources] = useState(50);
  const [legitimacy, setLegitimacy] = useState(50);
  const [incentives, setIncentives] = useState(50);
  const [coercion, setCoercion] = useState(50);
  const [resistance, setResistance] = useState(50);
  const [powerScore, setPowerScore] = useState(50);
  
  const scenarios = [
    {
      id: 1,
      title: "国际关系",
      actorA: "国家A",
      actorB: "国家B",
      action: "签署贸易协定",
      context: "国家A希望国家B签署有利的贸易协议"
    },
    {
      id: 2,
      title: "职场",
      actorA: "经理",
      actorB: "员工",
      action: "加班工作",
      context: "经理希望员工加班工作"
    },
    {
      id: 3,
      title: "社会运动",
      actorA: "活动家",
      actorB: "企业",
      action: "改变做法",
      context: "活动家希望企业采用可持续做法"
    }
  ];
  
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
  
  useEffect(() => {
    const influenceScore = (resources + legitimacy + incentives + coercion) / 4;
    const finalScore = influenceScore - (resistance * 0.5);
    setPowerScore(Math.max(0, Math.min(100, finalScore)));
  }, [resources, legitimacy, incentives, coercion, resistance]);
  
  const getPowerAssessment = () => {
    if (powerScore >= 75) {
      return {
        level: "高权力",
        text: currentScenario.actorA + "对" + currentScenario.actorB + "拥有强大的权力。资源、合法性和影响工具的结合使" + currentScenario.actorB + "很可能会服从。",
        color: "text-green-600",
        bgColor: "bg-green-100"
      };
    } else if (powerScore >= 50) {
      return {
        level: "中等权力",
        text: currentScenario.actorA + "拥有中等权力。" + currentScenario.actorB + "可能会服从，但结果不确定。其他因素可能会使天平向任何一方倾斜。",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100"
      };
    } else if (powerScore >= 25) {
      return {
        level: "低权力",
        text: currentScenario.actorA + "的权力有限。" + currentScenario.actorB + "的抵抗和" + currentScenario.actorA + "的弱势地位使得服从不太可能，除非发生重大变化。",
        color: "text-orange-600",
        bgColor: "bg-orange-100"
      };
    } else {
      return {
        level: "极小权力",
        text: currentScenario.actorA + "对" + currentScenario.actorB + "几乎没有权力。" + currentScenario.actorB + "极不可能做" + currentScenario.actorA + "想要的事情。",
        color: "text-red-600",
        bgColor: "bg-red-100"
      };
    }
  };
  
  const assessment = getPowerAssessment();
  
  const getComplianceAnimation = () => {
    if (powerScore >= 60) {
      return "translate-x-16";
    } else if (powerScore >= 40) {
      return "translate-x-8";
    } else {
      return "translate-x-0";
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">理解政治权力</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            探索罗伯特·达尔的定义：<span className="italic font-semibold">"A对B拥有权力，其程度取决于A能让B做B原本不会做的事情"</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">选择场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => setCurrentScenario(scenario)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentScenario.id === scenario.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`}
              >
                <h3 className="font-semibold text-slate-800 mb-1">{scenario.title}</h3>
                <p className="text-sm text-slate-600">{scenario.context}</p>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 overflow-hidden">
          <div className="flex items-center justify-center mb-8 px-4">
            <div className="text-center flex-shrink-0">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Users className="w-12 h-12 text-white" />
              </div>
              <p className="font-semibold text-slate-800">{currentScenario.actorA}</p>
              <p className="text-sm text-slate-500">想让B...</p>
            </div>
            
            <div className="mx-4 flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-1 bg-slate-300"></div>
                <Zap className={`w-6 h-6 mx-1.5 transition-all duration-500 ${
                  powerScore >= 50 ? 'text-yellow-500' : 'text-slate-300'
                }`} />
                <div className="w-8 h-1 bg-slate-300"></div>
              </div>
              <p className="text-center text-sm font-medium text-slate-700 mt-2 whitespace-nowrap">
                {currentScenario.action}
              </p>
            </div>
            
            <div className="text-center flex-shrink-0">
              <div className={`w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mb-2 mx-auto transition-transform duration-700 ${getComplianceAnimation()}`}>
                <Users className="w-12 h-12 text-white" />
              </div>
              <p className="font-semibold text-slate-800">{currentScenario.actorB}</p>
              <p className="text-sm text-slate-500">
                {powerScore >= 60 ? '正在服从' : powerScore >= 40 ? '不确定' : '正在抵抗'}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-slate-700">权力水平</h3>
              <span className={`font-bold text-xl ${assessment.color}`}>{Math.round(powerScore)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: powerScore + '%' }}
              >
                {powerScore > 10 && (
                  <span className="text-white text-xs font-semibold">{assessment.level}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className={assessment.bgColor + ' border-l-4 ' + assessment.color.replace('text', 'border') + ' p-4 rounded'}>
            <p className="text-slate-700">{assessment.text}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">调整权力因素</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <label className="font-medium text-slate-700">资源与能力</label>
                </div>
                <span className="text-slate-600 font-semibold">{resources}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={resources}
                onChange={(e) => setResources(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-slate-500 mt-1">物质资源、军事力量、经济实力</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  <label className="font-medium text-slate-700">合法性与权威</label>
                </div>
                <span className="text-slate-600 font-semibold">{legitimacy}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={legitimacy}
                onChange={(e) => setLegitimacy(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-slate-500 mt-1">B相信A有权提出要求</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-green-500" />
                  <label className="font-medium text-slate-700">激励与奖励</label>
                </div>
                <span className="text-slate-600 font-semibold">{incentives}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={incentives}
                onChange={(e) => setIncentives(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-slate-500 mt-1">A可以提供的奖励、利益、积极诱因</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <label className="font-medium text-slate-700">强制与威胁</label>
                </div>
                <span className="text-slate-600 font-semibold">{coercion}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={coercion}
                onChange={(e) => setCoercion(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-slate-500 mt-1">A可以使用的威胁、惩罚、武力</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <label className="font-medium text-slate-700">B的抵抗</label>
                </div>
                <span className="text-slate-600 font-semibold">{resistance}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-slate-500 mt-1">B拒绝服从的意愿和能力</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-semibold text-slate-800 mb-2">关键洞察</h3>
          <p className="text-slate-700">
            权力不是固定的属性——它是<span className="font-semibold">关系性的和情境性的</span>。同一个行为者在一种情况下可能拥有巨大的权力，而在另一种情况下却几乎没有权力。权力取决于A的能力、B的抵抗以及他们关系的具体情境之间的互动。
          </p>
        </div>
      </div>
    </div>
  );
};

export default PowerSimulator;

