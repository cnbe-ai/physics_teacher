import { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { curriculumData, pckData } from '../data/curriculumData';

function YearCard({ data, isOpen, onToggle }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"
            style={{ backgroundColor: `${data.color}15`, border: `2px solid ${data.color}30` }}
          >
            {data.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-bold text-lg text-slate-800">{data.year}</span>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${data.color}20`, color: data.color }}
              >
                {data.label}
              </span>
            </div>
            <p className="text-sm text-slate-500">{data.summary}</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="accordion-content border-t border-slate-100 bg-slate-50 p-5 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">주요 과목</h4>
            <div className="flex flex-wrap gap-2">
              {data.courses.map((course) => (
                <span
                  key={course}
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium"
                  style={{ backgroundColor: `${data.color}15`, color: data.color }}
                >
                  <CheckCircle size={13} />
                  {course}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: data.color, backgroundColor: `${data.color}08` }}>
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-700">💡 Tip: </span>
              {data.tip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PCKDiagram() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="space-y-6">
      {/* SVG Diagram */}
      <div className="flex justify-center">
        <svg viewBox="0 0 400 320" className="w-full max-w-md" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
          {/* CK circle */}
          <circle cx="150" cy="130" r="100" fill="#0ea5e920" stroke="#0ea5e9" strokeWidth="2" />
          {/* PK circle */}
          <circle cx="250" cy="130" r="100" fill="#1a3a6b20" stroke="#1a3a6b" strokeWidth="2" />
          {/* PCK intersection highlight */}
          <ellipse cx="200" cy="130" rx="52" ry="78" fill="#f59e0b30" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />

          {/* Labels */}
          <text x="105" y="90" textAnchor="middle" fill="#0ea5e9" fontSize="13" fontWeight="bold">물리 내용 지식</text>
          <text x="105" y="107" textAnchor="middle" fill="#0ea5e9" fontSize="11">(CK)</text>

          <text x="295" y="90" textAnchor="middle" fill="#1a3a6b" fontSize="13" fontWeight="bold">교수법 지식</text>
          <text x="295" y="107" textAnchor="middle" fill="#1a3a6b" fontSize="11">(PK)</text>

          <text x="200" y="122" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="bold">PCK</text>
          <text x="200" y="138" textAnchor="middle" fill="#92400e" fontSize="10">교수내용지식</text>

          {/* Bottom annotation */}
          <text x="200" y="265" textAnchor="middle" fill="#64748b" fontSize="11">Shulman (1986) PCK 삼각형 모형</text>
        </svg>
      </div>

      {/* PCK Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(pckData).map(([key, data]) => (
          <Card key={key} topColor={data.color} className="card-hover">
            <CardBody>
              <h4 className="font-bold text-slate-800 mb-2" style={{ color: data.color }}>{data.label}</h4>
              <p className="text-sm text-slate-600 mb-3">{data.description}</p>
              <ul className="space-y-1">
                {data.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-xs text-slate-500">
                    <span style={{ color: data.color }}>▶</span>
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
    <div className="page-enter space-y-10">
      {/* Header */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          🗺️ 4년 커리큘럼 로드맵
        </h2>
        <p className="text-slate-500 mb-6">학년별 목표와 과목을 확인하고, 지금 내가 어디에 있는지 파악하세요.</p>

        <div className="space-y-3">
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

      {/* Emphasis Box */}
      <div
        className="rounded-xl p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a6b, #0ea5e9)' }}
      >
        <div className="flex items-start gap-4">
          <span className="text-3xl">🎯</span>
          <div>
            <h3 className="font-bold text-lg mb-2">핵심 메시지</h3>
            <p className="text-blue-100 leading-relaxed">
              여러분은 물리를 배우는 학생이 아니라,{' '}
              <span className="text-yellow-300 font-semibold">물리를 가르치는 사람을 훈련받는 전문가</span>입니다.
              물리가 어렵게 느껴질 때, "나는 이것을 학생에게 어떻게 설명할까?"라는 질문을 스스로 던져보세요.
            </p>
          </div>
        </div>
      </div>

      {/* PCK Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          🧩 PCK란 무엇인가?
        </h2>
        <p className="text-slate-500 mb-6">
          Shulman(1986)이 제안한 PCK(Pedagogical Content Knowledge)는 물리교육과의 존재 이유입니다.
        </p>
        <PCKDiagram />
      </section>
    </div>
  );
}
