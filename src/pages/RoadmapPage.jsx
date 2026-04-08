import { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { curriculumData, pckData } from '../data/curriculumData';

function YearCard({ data, isOpen, onToggle }) {
  return (
    <div style={{
      borderRadius: '0.875rem',
      overflow: 'hidden',
      border: `1.5px solid ${isOpen ? data.color + '50' : '#e2e8f0'}`,
      boxShadow: isOpen ? `0 4px 16px ${data.color}20` : '0 1px 4px rgba(0,0,0,0.05)',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
          padding: '1.25rem 1.5rem',
          backgroundColor: isOpen ? `${data.color}08` : '#ffffff',
          textAlign: 'left', cursor: 'pointer', border: 'none',
          transition: 'background-color 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
          <div style={{
            width: '3.25rem', height: '3.25rem', borderRadius: '0.875rem', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem',
            backgroundColor: `${data.color}15`,
            border: `2px solid ${data.color}40`,
          }}>
            {data.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#0f172a', fontFamily: 'var(--font-serif)' }}>
                {data.year}
              </span>
              <span style={{
                fontSize: '0.8125rem', fontWeight: 700,
                padding: '0.2rem 0.625rem', borderRadius: '2rem',
                backgroundColor: `${data.color}20`, color: data.color,
              }}>
                {data.label}
              </span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.6 }}>{data.summary}</p>
          </div>
        </div>
        <ChevronDown
          size={22}
          style={{
            color: '#94a3b8', flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>

      {isOpen && (
        <div className="accordion-content" style={{
          borderTop: `1.5px solid ${data.color}25`,
          backgroundColor: '#fafbff',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          <div>
            <p style={{
              fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '0.875rem',
            }}>
              주요 과목
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {data.courses.map((course) => (
                <span key={course} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  fontSize: '0.9rem', fontWeight: 600,
                  padding: '0.375rem 0.75rem', borderRadius: '0.5rem',
                  backgroundColor: `${data.color}18`, color: data.color,
                  border: `1px solid ${data.color}30`,
                }}>
                  <CheckCircle size={13} />
                  {course}
                </span>
              ))}
            </div>
          </div>
          <div style={{
            borderLeft: `4px solid ${data.color}`,
            backgroundColor: `${data.color}08`,
            borderRadius: '0 0.625rem 0.625rem 0',
            padding: '1rem 1.25rem',
          }}>
            <p style={{ fontSize: '0.9375rem', color: '#334155', lineHeight: 1.75 }}>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>💡 Tip: </span>
              {data.tip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PCKDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg viewBox="0 0 420 300" style={{ width: '100%', maxWidth: '480px', fontFamily: 'Noto Sans KR, sans-serif' }}>
          <circle cx="155" cy="140" r="108" fill="#0ea5e918" stroke="#0ea5e9" strokeWidth="2.5" />
          <circle cx="265" cy="140" r="108" fill="#1a3a6b18" stroke="#1a3a6b" strokeWidth="2.5" />
          <ellipse cx="210" cy="140" rx="56" ry="82" fill="#f59e0b25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" />
          <text x="108" y="98"  textAnchor="middle" fill="#0284c7" fontSize="14" fontWeight="700">물리 내용 지식</text>
          <text x="108" y="116" textAnchor="middle" fill="#0284c7" fontSize="12">(CK)</text>
          <text x="312" y="98"  textAnchor="middle" fill="#1a3a6b" fontSize="14" fontWeight="700">교수법 지식</text>
          <text x="312" y="116" textAnchor="middle" fill="#1a3a6b" fontSize="12">(PK)</text>
          <text x="210" y="133" textAnchor="middle" fill="#b45309" fontSize="15" fontWeight="800">PCK</text>
          <text x="210" y="151" textAnchor="middle" fill="#92400e" fontSize="11">교수내용지식</text>
          <text x="210" y="270" textAnchor="middle" fill="#94a3b8" fontSize="11">Shulman (1986) PCK 모형</text>
        </svg>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {Object.entries(pckData).map(([key, data]) => (
          <Card key={key} topColor={data.color} hover>
            <CardBody>
              <h4 style={{ color: data.color, fontFamily: 'var(--font-serif)', fontSize: '1rem', marginBottom: '0.625rem' }}>
                {data.label}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '0.875rem' }}>
                {data.description}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {data.examples.map((ex) => (
                  <li key={ex} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                    <span style={{ color: data.color, flexShrink: 0 }}>▶</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const [openYear, setOpenYear] = useState(0);

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>🗺️ 4년 커리큘럼 로드맵</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          학년별 목표와 과목을 확인하고, 지금 내가 어디에 있는지 파악하세요.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {curriculumData.map((data, idx) => (
            <YearCard
              key={idx}
              data={data}
              isOpen={openYear === idx}
              onToggle={() => setOpenYear(openYear === idx ? -1 : idx)}
            />
          ))}
        </div>
      </section>

      <div style={{
        borderRadius: '1.125rem',
        background: 'linear-gradient(135deg, #1a3a6b 0%, #0ea5e9 100%)',
        padding: '2rem 2.25rem',
        color: '#ffffff',
      }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '2rem', flexShrink: 0 }}>🎯</span>
          <div>
            <h3 style={{ color: '#ffffff', fontFamily: 'var(--font-serif)', marginBottom: '0.625rem', fontSize: '1.125rem' }}>
              핵심 메시지
            </h3>
            <p style={{ color: '#bfdbfe', lineHeight: 1.8, fontSize: '1rem' }}>
              여러분은 물리를 배우는 학생이 아니라,{' '}
              <span style={{ color: '#fcd34d', fontWeight: 700 }}>물리를 가르치는 사람을 훈련받는 전문가</span>입니다.
              물리가 어렵게 느껴질 때, "나는 이것을 학생에게 어떻게 설명할까?"라는 질문을 스스로 던져보세요.
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>🧩 PCK란 무엇인가?</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          Shulman(1986)이 제안한 PCK(Pedagogical Content Knowledge)는 물리교육과의 존재 이유입니다.
        </p>
        <PCKDiagram />
      </section>
    </div>
  );
}
