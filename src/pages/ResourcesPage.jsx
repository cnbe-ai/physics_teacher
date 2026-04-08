import { ExternalLink, BookOpen } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { theoreticalReferences, usefulLinks } from '../data/resourceData';

export default function ResourcesPage() {
  return (
    <div className="page-enter space-y-10">
      {/* References */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          📚 핵심 이론 문헌
        </h2>
        <p className="text-slate-500 mb-6">이 앱의 콘텐츠는 검증된 교육학 이론과 연구를 바탕으로 합니다.</p>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-32">분류</th>
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">저자 / 연도</th>
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">자료</th>
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">설명</th>
                </tr>
              </thead>
              <tbody>
                {theoreticalReferences.map((ref, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${idx === theoreticalReferences.length - 1 ? 'border-0' : ''}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{ref.icon}</span>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-md whitespace-nowrap"
                          style={{ backgroundColor: '#1a3a6b15', color: '#1a3a6b' }}
                        >
                          {ref.category}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {ref.author} ({ref.year})
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700 mb-1">{ref.title}</p>
                      <p className="text-xs text-slate-400 italic">{ref.journal}</p>
                    </td>
                    <td className="p-4 text-slate-500 hidden lg:table-cell text-xs">{ref.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Useful Links */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          🔗 유용한 링크
        </h2>
        <p className="text-slate-500 mb-6">물리교육 관련 필수 웹사이트를 북마크해두세요.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usefulLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
              style={{ borderTopWidth: '3px', borderTopColor: link.color }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${link.color}15` }}
                >
                  {link.icon}
                </div>
                <ExternalLink
                  size={16}
                  className="text-slate-300 group-hover:text-slate-500 transition-colors mt-1"
                />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{link.name}</h3>
              <p className="text-sm text-slate-500">{link.description}</p>
              <p className="text-xs mt-2 font-mono" style={{ color: link.color }}>
                {link.url.replace('https://', '')}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Citation Box */}
      <section>
        <Card topColor="#f59e0b">
          <CardBody>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📌</span>
              <div>
                <h3 className="font-bold text-slate-800 mb-3">이 자료를 인용할 때</h3>
                <div className="rounded-lg bg-slate-50 p-4 font-mono text-xs text-slate-600 leading-relaxed">
                  <p>물리교육학 교수팀. (2024). <em>물리교육과 신입생을 위한 전공 탐색 및 진로 설계 안내서</em>.</p>
                  <p className="mt-1">※ 본 자료는 교육 목적으로 제작되었습니다.</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-green-500">✓</span>
                    수업 자료로 활용 가능
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-green-500">✓</span>
                    학생 배포 가능
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-red-400">✗</span>
                    상업적 이용 불가
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-red-400">✗</span>
                    무단 수정 배포 불가
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
