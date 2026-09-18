# React 학습 로드맵

이 문서는 학습 커리큘럼이자 **개념 커버리지 체크리스트**입니다. 나중에 실제 React 프로젝트에서 Claude가 이 파일을 읽고 "학습한 것 vs 프로젝트에 필요한 것"의 차이를 파악하는 용도로 씁니다. 학습 결과와 피드백 이력은 [PROGRESS.md](./PROGRESS.md)에 있습니다.

- 학습자 시작 수준 (2026-09-17): React 튜토리얼 진행 중
- 방식: 짧고 자주 (실습 1개 = 30~60분), 힌트 최소
- JavaScript 기반 (TypeScript 미사용). 타입은 학습 범위 밖

상태 기호: ⬜ 미학습 · 🟡 진행 중 · ✅ 통과 · 🔁 보완 필요

## 단계

| # | 단계 | 실습 파일 | 상태 |
|---|---|---|---|
| 0 | 첫 컴포넌트 (진단) | `exercises/00-first-components.md` | ✅ |
| 1 | 컴포넌트와 props | `exercises/01-props-and-children.md` | ✅ |
| 2 | state와 이벤트 | `exercises/02-*.md` | ⬜ |
| 3 | 상태 끌어올리기 · Todo 앱 | `exercises/03-*.md` | ⬜ |
| 4 | useEffect · 데이터 페칭 | `exercises/04-*.md` | ⬜ |
| 5 | 커스텀 훅 · ref · 렌더링 이해 | `exercises/05-*.md` | ⬜ |
| 6 | Context · useReducer | `exercises/06-*.md` | ⬜ |
| 7 | 라우팅 | `exercises/07-*.md` | ⬜ |
| 8 | 종합 미니 프로젝트 | `exercises/08-*.md` | ⬜ |
| + | React 19 신기능 (선택) | `exercises/09-*.md` | ⬜ |
| + | 테스트 (선택) | `exercises/10-*.md` | ⬜ |

각 단계는 실습 여러 개(a, b, c…)로 쪼개질 수 있습니다. 파일명이 곧 순서입니다.

## 개념 커버리지

실제 프로젝트와 비교할 때 이 표를 보면 됩니다. "통과"는 실습에서 개념 오해 없이 구현했다는 뜻이지 숙달을 뜻하지 않습니다.

### 0–1. JSX · 컴포넌트 · props

| 개념 | 상태 | 비고 |
|---|---|---|
| JSX 문법 (표현식, 속성, className, 프래그먼트) | ✅ | 00. 템플릿 리터럴로 조건부 className |
| 함수 컴포넌트 정의와 합성 | ✅ | 00 |
| props 전달과 구조 분해 | ✅ | 00·01. 기본값(`tone = ""`), 인터페이스 개념 이해 |
| `children` | ✅ | 01. `Badge`·`Section`. 문서보다 Vue slot 비유로 이해 |
| 조건부 렌더링 (`&&`, 삼항, early return) | ✅ | 01. `&&`의 `0` 함정 직접 확인. early return은 3회 만에 성공 — 02에서 재확인 |
| 리스트 렌더링과 `key` | ✅ | 01. 3단계 중첩. index key 문제를 정확히 설명 |
| 컴포넌트를 파일로 분리하는 기준 | ✅ | 01. 범용(`Badge`·`Section`) vs 전용(`ProjectCard`), 레이아웃 컴포넌트 |

### 2. state · 이벤트

| 개념 | 상태 | 비고 |
|---|---|---|
| `useState` 기본 | 🟡 | 00 맛보기. 불변 상수를 state에 넣었다가 제거 |
| 이벤트 핸들러 (onClick, onChange, onSubmit, e.preventDefault) | ⬜ | |
| 제어 컴포넌트 (controlled input) | ⬜ | |
| state 불변성 (객체/배열 업데이트) | ⬜ | |
| 함수형 업데이트 `setX(prev => …)` | ⬜ | |
| state는 스냅샷이다 (렌더링 모델) | ⬜ | |
| 파생 값은 state로 두지 않기 | ⬜ | |

### 3. 상태 설계

| 개념 | 상태 | 비고 |
|---|---|---|
| 상태 끌어올리기 (lifting state up) | ⬜ | |
| 부모→자식 콜백으로 데이터 올리기 | ⬜ | |
| 어느 컴포넌트가 state를 가져야 하는지 결정 | 🟡 | 00에서 단일 선택 vs 독립 토글 논의 |
| 컴포넌트 분리 / 책임 나누기 | 🟡 | 01. 도메인 지식 위치(status는 `ProjectCard`, tone→class는 `Badge`). 래퍼 위치 실수 반복 |
| 폼 유효성 검사 흐름 | ⬜ | |

### 4. 이펙트 · 비동기

| 개념 | 상태 | 비고 |
|---|---|---|
| `useEffect` 기본과 의존성 배열 | ⬜ | |
| cleanup 함수 | ⬜ | |
| `fetch` + 로딩/에러/성공 상태 모델링 | ⬜ | |
| 경쟁 상태 (race condition) 처리 / AbortController | ⬜ | |
| 이펙트가 필요 없는 경우 판단 | ⬜ | |
| StrictMode에서 이펙트 두 번 실행되는 이유 | ⬜ | |

### 5. 훅 심화 · 렌더링

| 개념 | 상태 | 비고 |
|---|---|---|
| 커스텀 훅 추출 (`useXxx`) | ⬜ | |
| `useRef` (DOM 접근, 렌더와 무관한 값) | ⬜ | |
| 리렌더링이 언제 일어나는지 | ⬜ | |
| `useMemo` / `useCallback` — 언제 필요한지 | ⬜ | |
| `React.memo` | ⬜ | |
| 훅의 규칙 (최상위, 조건문 금지) | 🟡 | 00에서 컴포넌트 밖 호출 에러 경험 |

### 6. 전역 상태

| 개념 | 상태 | 비고 |
|---|---|---|
| `createContext` / `useContext` | ⬜ | |
| Provider 패턴과 Context 분리 | ⬜ | |
| `useReducer` 와 액션 설계 | ⬜ | |
| Context + Reducer 조합 | ⬜ | |
| prop drilling vs Context 판단 | ⬜ | |

### 7. 라우팅

| 개념 | 상태 | 비고 |
|---|---|---|
| react-router 라우트 정의 | ⬜ | |
| `Link` / `NavLink` | ⬜ | |
| URL 파라미터 (`useParams`) | ⬜ | |
| 중첩 라우트 / `Outlet` | ⬜ | |
| 프로그래매틱 이동 (`useNavigate`) | ⬜ | |
| 404 / 리다이렉트 | ⬜ | |

### 8. 종합

| 개념 | 상태 | 비고 |
|---|---|---|
| 폴더 구조 설계 | ⬜ | |
| 컴포넌트 / 훅 / 유틸 분리 | ⬜ | |
| API 계층 분리 | ⬜ | |
| 에러 바운더리 | ⬜ | |

### 선택 주제

| 개념 | 상태 | 비고 |
|---|---|---|
| React 19: `use`, Actions, `useActionState`, `useOptimistic` | ⬜ | |
| 서버 상태 라이브러리 (TanStack Query) | ⬜ | |
| 테스트: Vitest + Testing Library | ⬜ | |
| 성능 프로파일링 (React DevTools) | ⬜ | |
| 폼 라이브러리 | ⬜ | |
| 스타일링 방식 (CSS Modules, Tailwind 등) | ⬜ | 실습에서는 미리 만든 CSS 사용 |
