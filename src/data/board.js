// 06 실습 데이터. 칸반 보드.
// column: { id, title }  — 배열 순서가 곧 열의 순서다. 카드의 ← → 이동은 이 순서를 따른다
// card:   { id, title, description, status, assigneeId }
//   status     — columns의 id 중 하나
//   assigneeId — members의 id (src/data/members.js). 담당자가 없는 카드는 null
import { members } from './members'

export { members }

export const columns = [
  { id: 'todo', title: '할 일' },
  { id: 'doing', title: '진행 중' },
  { id: 'done', title: '완료' },
]

export const initialCards = [
  { id: 'c1', title: '로그인 페이지 리뉴얼', description: '소셜 로그인 버튼 추가, 비밀번호 찾기 흐름 정리', status: 'todo', assigneeId: 1 },
  { id: 'c2', title: '결제 API 타임아웃 조사', description: '피크 시간대에 결제 요청이 30초 넘게 걸리는 원인 추적', status: 'todo', assigneeId: 2 },
  { id: 'c3', title: '온보딩 일러스트 시안', description: '첫 실행 화면 3장. 다크모드 버전 포함', status: 'todo', assigneeId: null },
  { id: 'c4', title: '검색 디바운스 적용', description: '입력이 500ms 멈추면 요청. 05에서 만든 훅 재사용', status: 'doing', assigneeId: 1 },
  { id: 'c5', title: '릴리스 노트 초안', description: '9월 배포분 변경 사항 정리', status: 'doing', assigneeId: 4 },
  { id: 'c6', title: '회귀 테스트 케이스 갱신', description: '장바구니 수량 변경 시나리오 3개 추가', status: 'doing', assigneeId: 5 },
  { id: 'c7', title: '디자인 토큰 정리', description: '색·간격 변수 이름 통일', status: 'done', assigneeId: 3 },
  { id: 'c8', title: 'CI 캐시 설정', description: 'node_modules 캐시로 빌드 2분 단축', status: 'done', assigneeId: 2 },
]
