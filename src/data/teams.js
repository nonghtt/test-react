// 01 실습 데이터. 팀 3개, 프로젝트 6개.
// team:    { id, name, projects }
// project: { id, name, status, description?, tags, members, dueDate? }
//   status      — 'active' | 'delayed' | 'done'
//   description — 없는 프로젝트도 있음
//   tags        — 빈 배열일 수 있음
//   members     — 빈 배열일 수 있음. 각 항목: { id, name, avatar }
//   dueDate     — 없는 프로젝트도 있음
export const teams = [
  {
    id: 'web',
    name: '웹 팀',
    projects: [
      {
        id: 'p1',
        name: '디자인 시스템 개편',
        status: 'active',
        description: '버튼·폼·카드 컴포넌트를 새 토큰 기반으로 다시 만든다.',
        tags: ['React', 'CSS'],
        members: [
          { id: 1, name: '김하늘', avatar: 'https://i.pravatar.cc/80?img=1' },
          { id: 3, name: '박서연', avatar: 'https://i.pravatar.cc/80?img=5' },
          { id: 5, name: '정유진', avatar: 'https://i.pravatar.cc/80?img=9' },
        ],
        dueDate: '2026-10-15',
      },
      {
        id: 'p2',
        name: '결제 페이지 리뉴얼',
        status: 'delayed',
        tags: [],
        members: [],
        dueDate: '2026-09-01',
      },
      {
        id: 'p3',
        name: '관리자 대시보드',
        status: 'done',
        description: '주문·회원 통계를 한 화면에서 본다.',
        tags: ['차트'],
        members: [{ id: 2, name: '이준서', avatar: 'https://i.pravatar.cc/80?img=12' }],
      },
    ],
  },
  {
    id: 'mobile',
    name: '모바일 팀',
    projects: [
      {
        id: 'p4',
        name: '푸시 알림 설정',
        status: 'active',
        description: '알림 종류별로 켜고 끌 수 있게 한다.',
        tags: ['iOS', 'Android', 'API'],
        members: [
          { id: 4, name: '최민준', avatar: 'https://i.pravatar.cc/80?img=8' },
          { id: 1, name: '김하늘', avatar: 'https://i.pravatar.cc/80?img=1' },
        ],
        dueDate: '2026-11-30',
      },
      {
        id: 'p5',
        name: '앱 시작 속도 개선',
        status: 'delayed',
        description: '콜드 스타트 3초 → 1.5초.',
        tags: [],
        members: [{ id: 5, name: '정유진', avatar: 'https://i.pravatar.cc/80?img=9' }],
      },
      {
        id: 'p6',
        name: '다크 모드',
        status: 'done',
        tags: ['디자인'],
        members: [
          { id: 3, name: '박서연', avatar: 'https://i.pravatar.cc/80?img=5' },
          { id: 4, name: '최민준', avatar: 'https://i.pravatar.cc/80?img=8' },
        ],
      },
    ],
  },
  {
    id: 'data',
    name: '데이터 팀',
    projects: [],
  },
]
