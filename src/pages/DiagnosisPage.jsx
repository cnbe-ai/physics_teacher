import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { Card, CardBody } from '../components/ui/Card';
import { diagnosisAreas, scoreInterpretations } from '../data/diagnosisData';

const S = {
  section: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  sectionTitle: { marginBottom: '0.375rem' },
  sectionDesc: { color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' },
};

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
    subject: area.label,
    score: getAreaScore(area.id),
    fullMark: 15,
    fullSubject: area.label,
  }));

  const interpretation = scoreInterpretations.find(s => totalScore >= s.min && totalScore <= s.max);

  const handleSetScore = (questionId, value) => {
    setScores(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => { if (isComplete) setSubmitted(true); };
  const handleReset = () => { setScores({}); setSubmitted(false); };

  const handleAIAdvice = () => {
    const resultText = diagnosisAreas.map(area => {
      const score = getAreaScore(area.id);
      return `${area.label}: ${score}/15점`;
    }).join(', ');
    if (onOpenChat) {
      onOpenChat(`자기진단 결과를 바탕으로 맞춤 조언해주세요.\n\n[진단 결과]\n총점: ${totalScore}/${maxScore}점 (${interpretation?.label})\n${resultText}\n\n특히 낮은 영역에 대해 구체적인 개선 방법을 알려주세요.`);
    }
  };

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Header */}
      <section>
        <h2 style={S.sectionTitle}>📋 물리교육과 적응 자기진단</h2>
        <p style={S.sectionDesc}>
          5개 영역, 총 15문항입니다. 각 문항을 1(전혀 그렇지 않다) ~ 5(매우 그렇다)로 평가해주세요.
        </p>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            flex: 1, height: '10px', backgroundColor: '#e2e8f0',
            borderRadius: '999px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: '999px',
              width: `${(answeredCount / totalQuestions) * 100}%`,
              backgroundColor: '#0ea5e9',
              transition: 'width 0.5s ease',
            }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#475569', whiteSpace: 'nowrap' }}>
            {answeredCount} / {totalQuestions} 완료
          </span>
        </div>
      </section>

      {/* Questionnaire */}
      {!submitted && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {diagnosisAreas.map((area) => (
            <Card key={area.id} topColor={area.color}>
              <CardBody>
                {/* Area header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '3rem', height: '3rem', borderRadius: '0.75rem', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                    backgroundColor: `${area.color}15`,
                    border: `2px solid ${area.color}30`,
                  }}>
                    {area.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.0625rem', color: '#0f172a' }}>
                      영역 {area.id}: {area.label}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: '#94a3b8', marginTop: '0.125rem' }}>
                      3문항 · 최대 15점
                    </p>
                  </div>
                </div>

                {/* Questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {area.questions.map((q) => (
                    <div key={q.id}>
                      <p style={{
                        fontWeight: 600, fontSize: '1rem', color: '#1e293b',
                        lineHeight: 1.65, marginBottom: '1rem',
                      }}>
                        <span style={{
                          display: 'inline-block', marginRight: '0.5rem',
                          fontSize: '0.75rem', fontWeight: 700, color: area.color,
                          backgroundColor: `${area.color}15`,
                          padding: '0.125rem 0.4rem', borderRadius: '0.25rem',
                        }}>
                          {q.id}
                        </span>
                        {q.text}
                      </p>

                      {/* Rating buttons */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        flexWrap: 'wrap',
                      }}>
                        <span style={{ fontSize: '0.8125rem', color: '#94a3b8', minWidth: '4rem', textAlign: 'right' }}>
                          전혀 아님
                        </span>
                        {[1, 2, 3, 4, 5].map((val) => {
                          const selected = scores[q.id] === val;
                          return (
                            <button
                              key={val}
                              onClick={() => handleSetScore(q.id, val)}
                              style={{
                                width: '2.75rem', height: '2.75rem',
                                borderRadius: '0.5rem',
                                fontSize: '1rem', fontWeight: 700,
                                border: `2px solid ${selected ? area.color : '#cbd5e1'}`,
                                backgroundColor: selected ? area.color : '#ffffff',
                                color: selected ? '#ffffff' : '#64748b',
                                transform: selected ? 'scale(1.12)' : 'scale(1)',
                                boxShadow: selected ? `0 4px 12px ${area.color}40` : 'none',
                                transition: 'all 0.15s ease',
                                cursor: 'pointer',
                              }}
                            >
                              {val}
                            </button>
                          );
                        })}
                        <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>매우 그렇다</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}

          {/* Submit buttons */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              style={{
                flex: 1, padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 700, fontSize: '1.0625rem', color: '#ffffff',
                backgroundColor: isComplete ? '#1a3a6b' : '#94a3b8',
                border: 'none',
                boxShadow: isComplete ? '0 4px 14px rgba(26,58,107,0.35)' : 'none',
                cursor: isComplete ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              {isComplete ? '📊 결과 확인하기' : `아직 ${totalQuestions - answeredCount}개 문항이 남았습니다`}
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 600, fontSize: '0.9375rem',
                color: '#475569',
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              초기화
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {submitted && (
        <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Score banner */}
          <div style={{
            borderRadius: '1.125rem', padding: '2rem',
            background: `linear-gradient(135deg, ${interpretation?.color || '#1a3a6b'}, ${interpretation?.color || '#1a3a6b'}bb)`,
            color: '#ffffff',
            boxShadow: `0 8px 24px ${interpretation?.color || '#1a3a6b'}40`,
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>총점</p>
                <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>
                  {totalScore}
                  <span style={{ fontSize: '1.5rem', fontWeight: 400, marginLeft: '0.25rem' }}>/ {maxScore}</span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.5rem' }}>{interpretation?.label}</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '0.875rem',
                padding: '1.125rem 1.25rem', maxWidth: '320px',
              }}>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.92)' }}>
                  {interpretation?.message}
                </p>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <Card>
            <CardBody>
              <h3 style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '1.0625rem' }}>
                영역별 점수 프로파일
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 12, fill: '#475569', fontFamily: 'Noto Sans KR, sans-serif' }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 15]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickCount={4} />
                  <Radar dataKey="score" stroke="#1a3a6b" fill="#1a3a6b" fillOpacity={0.25} strokeWidth={2.5} />
                  <Tooltip formatter={(value, name, props) => [`${value}/15점`, props.payload.fullSubject]} />
                </RadarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* Area breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {diagnosisAreas.map((area) => {
              const score = getAreaScore(area.id);
              const pct = (score / 15) * 100;
              const isLow = score < 9;
              return (
                <Card key={area.id} topColor={area.color}>
                  <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                      <span style={{ fontSize: '1.375rem' }}>{area.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#1e293b', flex: 1 }}>{area.label}</span>
                      {isLow && (
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 700,
                          backgroundColor: '#fef2f2', color: '#ef4444',
                          padding: '0.2rem 0.5rem', borderRadius: '2rem',
                        }}>
                          집중 필요
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        flex: 1, height: '8px', backgroundColor: '#f1f5f9',
                        borderRadius: '999px', overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%', borderRadius: '999px',
                          width: `${pct}%`, backgroundColor: area.color,
                          transition: 'width 0.7s ease',
                        }} />
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: area.color, minWidth: '3rem', textAlign: 'right' }}>
                        {score}/15
                      </span>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <button
              onClick={handleAIAdvice}
              style={{
                flex: 1, padding: '1.125rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 700, fontSize: '1.0625rem', color: '#ffffff',
                background: 'linear-gradient(135deg, #1a3a6b, #0ea5e9)',
                border: 'none',
                boxShadow: '0 4px 14px rgba(26,58,107,0.35)',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
            >
              🤖 AI에게 맞춤 조언 받기
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '1.125rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 600, fontSize: '0.9375rem',
                color: '#475569',
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                cursor: 'pointer',
              }}
            >
              재진단
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
