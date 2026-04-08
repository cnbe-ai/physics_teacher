import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { Card, CardBody } from '../components/ui/Card';
import { diagnosisAreas, scoreInterpretations } from '../data/diagnosisData';

export default function DiagnosisPage({ onOpenChat }) {
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalQuestions = diagnosisAreas.reduce((acc, a) => acc + a.questions.length, 0);
  const answeredCount = Object.keys(scores).length;
  const isComplete = answeredCount === totalQuestions;

  const getAreaScore = (areaId) => {
    const area = diagnosisAreas.find(a => a.id === areaId);
    return area.questions.reduce((sum, q) => sum + (scores[q.id] || 0), 0);
  };

  const totalScore = diagnosisAreas.reduce((sum, area) => sum + getAreaScore(area.id), 0);
  const maxScore = totalQuestions * 5;

  const radarData = diagnosisAreas.map((area) => ({
    subject: area.label.replace('에 대한 ', '\n').replace('에 대한', '\n'),
    fullSubject: area.label,
    score: getAreaScore(area.id),
    fullMark: 15,
    icon: area.icon,
  }));

  const interpretation = scoreInterpretations.find(
    (s) => totalScore >= s.min && totalScore <= s.max
  );

  const handleSetScore = (questionId, value) => {
    setScores((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (isComplete) setSubmitted(true);
  };

  const handleReset = () => {
    setScores({});
    setSubmitted(false);
  };

  const handleAIAdvice = () => {
    const resultText = diagnosisAreas.map((area) => {
      const score = getAreaScore(area.id);
      return `${area.label}: ${score}/15점`;
    }).join(', ');

    if (onOpenChat) {
      onOpenChat(
        `자기진단 결과를 바탕으로 맞춤 조언해주세요.\n\n[진단 결과]\n총점: ${totalScore}/${maxScore}점 (${interpretation?.label})\n${resultText}\n\n특히 낮은 영역에 대해 구체적인 개선 방법을 알려주세요.`
      );
    }
  };

  return (
    <div className="page-enter space-y-8">
      {/* Header */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          📋 물리교육과 적응 자기진단
        </h2>
        <p className="text-slate-500 mb-4">
          5개 영역, 총 15문항입니다. 각 문항을 1(전혀 그렇지 않다) ~ 5(매우 그렇다)로 평가해주세요.
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%`, backgroundColor: '#0ea5e9' }}
            />
          </div>
          <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
            {answeredCount}/{totalQuestions} 완료
          </span>
        </div>
      </section>

      {/* Questionnaire */}
      {!submitted && (
        <div className="space-y-6">
          {diagnosisAreas.map((area) => (
            <Card key={area.id} topColor={area.color}>
              <CardBody>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{area.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-800">영역 {area.id}: {area.label}</h3>
                    <p className="text-xs text-slate-400">3문항 · 최대 15점</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {area.questions.map((q, qIdx) => (
                    <div key={q.id}>
                      <p className="text-sm font-medium text-slate-700 mb-3">
                        <span className="text-xs text-slate-400 mr-2">{q.id}</span>
                        {q.text}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400 mr-2 w-20 text-right">전혀 아님</span>
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleSetScore(q.id, val)}
                            className="w-9 h-9 rounded-lg text-sm font-bold transition-all duration-150 border-2"
                            style={{
                              backgroundColor: scores[q.id] === val ? area.color : 'transparent',
                              borderColor: scores[q.id] === val ? area.color : '#e2e8f0',
                              color: scores[q.id] === val ? '#ffffff' : '#94a3b8',
                              transform: scores[q.id] === val ? 'scale(1.1)' : 'scale(1)',
                            }}
                          >
                            {val}
                          </button>
                        ))}
                        <span className="text-xs text-slate-400 ml-2">매우 그렇다</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className="flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: isComplete ? '#1a3a6b' : '#94a3b8' }}
            >
              {isComplete ? '📊 결과 확인하기' : `${totalQuestions - answeredCount}개 문항이 남았습니다`}
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-3.5 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {submitted && (
        <div className="space-y-6 page-enter">
          {/* Score summary */}
          <div
            className="rounded-2xl p-6 text-white"
            style={{ background: `linear-gradient(135deg, ${interpretation?.color || '#1a3a6b'}, ${interpretation?.color || '#1a3a6b'}aa)` }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white/70 text-sm mb-1">총점</p>
                <div className="text-4xl font-bold">{totalScore} <span className="text-2xl font-normal">/ {maxScore}</span></div>
                <div className="text-lg font-semibold mt-1">{interpretation?.label}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 max-w-xs">
                <p className="text-sm text-white/90 leading-relaxed">{interpretation?.message}</p>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <Card>
            <CardBody>
              <h3 className="font-bold text-slate-800 mb-4 text-center">영역별 점수 프로파일</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'Noto Sans KR, sans-serif' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 15]}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickCount={4}
                  />
                  <Radar
                    dataKey="score"
                    stroke="#1a3a6b"
                    fill="#1a3a6b"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    formatter={(value, name, props) => [`${value}/15점`, props.payload.fullSubject]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* Area breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diagnosisAreas.map((area) => {
              const score = getAreaScore(area.id);
              const pct = (score / 15) * 100;
              const isLow = score < 9;
              return (
                <Card key={area.id} topColor={area.color}>
                  <CardBody>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{area.icon}</span>
                      <span className="font-semibold text-slate-700 text-sm">{area.label}</span>
                      {isLow && (
                        <span className="ml-auto text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">집중 필요</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: area.color }}
                        />
                      </div>
                      <span className="text-sm font-bold" style={{ color: area.color }}>{score}/15</span>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {/* AI Advice Button */}
          <div className="flex gap-3">
            <button
              onClick={handleAIAdvice}
              className="flex-1 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #1a3a6b, #0ea5e9)' }}
            >
              🤖 AI에게 맞춤 조언 받기
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-4 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              재진단
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
