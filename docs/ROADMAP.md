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
| 2 | state와 이벤트 | `exercises/02-state-and-events.md` | ✅ |
| 3 | 상태 끌어올리기 · Todo 앱 | `exercises/03-lifting-state-up.md` | ✅ |
| 4 | useEffect · 데이터 페칭 | `exercises/04-effects-and-fetching.md` | ✅ |
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
| `useState` 기본 | ✅ | 00 맛보기(불변 상수를 state에 넣었다가 제거) · 02에서 cart·알림·요청사항 |
| 이벤트 핸들러 (onClick, onChange, onSubmit, e.preventDefault) | ✅ | 02. 자식→부모 콜백(`onSelect`), submit + `preventDefault` |
| 제어 컴포넌트 (controlled input) | ✅ | 02. textarea `value`+`onChange`, 글자 수·초과 상태 |
| state 불변성 (객체/배열 업데이트) | ✅ | 02. 스프레드로 추가·수정, rest 구조분해로 삭제. 직접 수정 없음 |
| 함수형 업데이트 `setX(prev => …)` | ✅ | 03. 실험으로 직접 확인(3번 호출 → 1개만 추가, 마지막 것이 남음). 기준도 스스로 세움 — "이전 값에 의존하면 `prev`" |
| state는 스냅샷이다 (렌더링 모델) | ✅ | 03. "렌더링 당시의 값을 갖고 하기 때문에 3개가 안 들어간다"를 본인 문장으로 설명. 12(c) 로그 실험은 미실행 |
| 파생 값은 state로 두지 않기 | ✅ | 02. 소계·총 수량·합계·배지 전부 계산. 합계를 state로 뒀을 때의 버그도 설명함 |

### 3. 상태 설계

| 개념 | 상태 | 비고 |
|---|---|---|
| 상태 끌어올리기 (lifting state up) | ✅ | 03. 편집 state를 `TodoItem` → `TodoList`로 올림. 형제끼리 값을 볼 수 없어 공통 부모에 둔다는 기준을 설명 |
| 부모→자식 콜백으로 데이터 올리기 | ✅ | 03. 추가·토글·삭제·편집 저장·탭 전환 전부 콜백. setter를 그대로 내려보내도 되는 경우와 감싸야 하는 경우를 구분 |
| 어느 컴포넌트가 state를 가져야 하는지 결정 | ✅ | 03. 세 값이 각각 다른 높이에 — 필터는 `App`(Tab·TodoList 형제), 편집 대상 id는 `TodoList`, 편집 중 입력값은 `TodoItem`. 반대로 뒀을 때 무엇이 깨지는지 설명 |
| 컴포넌트 분리 / 책임 나누기 | ✅ | 01·03. `Tab`은 `todos`를 모르고 개수를 받기만 함, `BottomText`는 `children`만 받는 껍데기. 계산은 아는 쪽에서 |
| 폼 유효성 검사 흐름 | ✅ | 02. 글자 수 제한 → invalid 클래스 + 제출 버튼 비활성 |

### 4. 이펙트 · 비동기

| 개념 | 상태 | 비고 |
|---|---|---|
| `useEffect` 기본과 의존성 배열 | ✅ | 04. `[]`/`[keyword]`/생략 세 가지를 직접 실행해보고 차이를 설명(생략 시 매 렌더 실행까지 확인) |
| cleanup 함수 | ✅ | 04. 호출 시점 두 가지(다음 effect 직전, unmount) 모두 답변. 처음엔 "다음 effect 직전"만 답해 재질문 필요했음 |
| `fetch` + 로딩/에러/성공 상태 모델링 | ✅ | 04. `App`(판단 안 함) → `BookResult`(loading·error 우선순위) → `BookList`(빈 결과 vs 목록) 3단 분리로 상태 겹침 해결. 컴포넌트 경계를 스스로 설계함 |
| 경쟁 상태 (race condition) 처리 / AbortController | ✅ | 04. 실험 9를 cleanup 전/후로 직접 실행 — 전: 짧은 검색어(느린 응답)가 늦게 도착해 화면을 덮어씀을 확인, 후: `AbortController`로 해결·콘솔에 취소 로그 확인. "결과가 우연히 맞았을 뿐 메커니즘은 틀렸다"를 스스로 구분해냄(주목할 만한 지점) |
| 이펙트가 필요 없는 경우 판단 | ✅ | 04. 정렬을 `useState`+`useEffect`로 만드는 함정을 피하고 렌더 중 계산으로 처리. "state로 계산되는 값은 다시 state로 관리할 필요 없다"는 기준을 본인 문장으로 답변 |
| StrictMode에서 이펙트 두 번 실행되는 이유 | ✅ | 04. 여러 차례 힌트 후 "cleanup 누락/부실을 매번 강제로 드러낸다"로 정리. 04에서 가장 오래 걸린 질문 |

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
