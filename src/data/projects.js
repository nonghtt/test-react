// 07 실습 데이터. 프로젝트 7개. 수정하지 마세요.
// project: { id, name, status, description, tags, members, dueDate }
//   id      — 숫자. 순서대로 1씩 늘지 않는다 (중간 번호는 이미 지워진 프로젝트라고 생각하면 된다)
//   status  — 'active' | 'delayed' | 'done'
//   members — 빈 배열일 수 있음. 각 항목: { id, name, avatar }
//
// 목록·이전/다음의 순서는 이 배열의 순서다.
export const projects = [
  {
    id: 12,
    name: '디자인 시스템 개편',
    status: 'active',
    description: '버튼·폼·카드 컴포넌트를 새 토큰 기반으로 다시 만든다.',
    tags: ['React', 'CSS'],
    members: [
      { id: 1, name: '김하늘', avatar: 'https://i.pravatar.cc/80?img=1' },
      { id: 3, name: '박서연', avatar: 'https://i.pravatar.cc/80?img=5' },
    ],
    dueDate: '2026-10-15',
  },
  {
    id: 15,
    name: '결제 페이지 리뉴얼',
    status: 'delayed',
    description: '간편결제 버튼을 추가하고 결제 실패 화면을 정리한다.',
    tags: ['결제'],
    members: [{ id: 2, name: '이준서', avatar: 'https://i.pravatar.cc/80?img=12' }],
    dueDate: '2026-09-01',
  },
  {
    id: 21,
    name: '관리자 대시보드',
    status: 'done',
    description: '주문·회원 통계를 한 화면에서 본다.',
    tags: ['차트'],
    members: [
      { id: 2, name: '이준서', avatar: 'https://i.pravatar.cc/80?img=12' },
      { id: 4, name: '최민준', avatar: 'https://i.pravatar.cc/80?img=8' },
    ],
    dueDate: '2026-08-20',
  },
  {
    id: 23,
    name: '푸시 알림 설정',
    status: 'active',
    description: '알림 종류별로 켜고 끌 수 있게 한다.',
    tags: ['iOS', 'Android'],
    members: [
      { id: 4, name: '최민준', avatar: 'https://i.pravatar.cc/80?img=8' },
      { id: 1, name: '김하늘', avatar: 'https://i.pravatar.cc/80?img=1' },
    ],
    dueDate: '2026-11-30',
  },
  {
    id: 30,
    name: '앱 온보딩 개선',
    status: 'delayed',
    description: '첫 실행 화면을 3장에서 1장으로 줄인다.',
    tags: ['UX'],
    members: [{ id: 3, name: '박서연', avatar: 'https://i.pravatar.cc/80?img=5' }],
    dueDate: '2026-09-15',
  },
  {
    id: 34,
    name: '검색 API 성능 개선',
    status: 'active',
    description: '자동완성 응답을 200ms 안으로 줄인다.',
    tags: ['API', '성능'],
    members: [
      { id: 2, name: '이준서', avatar: 'https://i.pravatar.cc/80?img=12' },
      { id: 5, name: '정유진', avatar: 'https://i.pravatar.cc/80?img=9' },
    ],
    dueDate: '2026-12-10',
  },
  {
    id: 41,
    name: '사내 위키 이전',
    status: 'done',
    description: '옛 위키 문서를 새 도구로 옮긴다.',
    tags: [],
    members: [],
    dueDate: '2026-07-31',
  },
]

// 상태 → 배지 글자·색. 목록 카드와 상세 페이지가 같이 쓴다.
// 탭 순서도 이 객체의 키 순서(active → delayed → done)를 따르면 된다.
export const statusInfo = {
  active: { label: '진행 중', tone: 'primary' },
  delayed: { label: '지연', tone: 'warn' },
  done: { label: '완료', tone: 'success' },
}
