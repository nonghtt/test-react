# 06 · Context · useReducer

예상 시간: 100~120분 (세 파트. **파트마다 세션 하나**로 나누세요) · 개념: `useReducer`와 액션 설계, prop drilling이 언제 문제가 되는지, `createContext` / `useContext`, Provider 패턴, Context + Reducer 조합, Context 분리

05에서 `sortBy`·`setSortBy`를 `App → BookResult → BookList`로 두 단계 내려보냈습니다. 이번엔 **다섯 단계**입니다. Part A는 그 다섯 단계를 props로만 연결해서 **어디가 아픈지 직접 잽니다**. Part B에서 Context로 바꾸고 같은 자로 다시 잽니다. Part C는 05의 `[render]` 로그로 Context가 리렌더를 어떻게 퍼뜨리는지 봅니다.

## 목표

팀 칸반 보드. 카드를 `할 일 → 진행 중 → 완료` 열 사이에서 옮기고, 삭제하고, 담당자를 바꾸고, 담당자로 걸러 봅니다.

```
App
└─ Board                      열 3개를 가로로
   ├─ BoardHeader             제목 · 담당자 필터 select · 보이는 카드 수
   └─ Column ×3               열 제목 · 개수
      └─ CardList             그 열의 카드들, 없으면 「카드 없음」
         └─ Card ×N           제목 · 펼치기/접기 · 설명 · 담당자
            └─ CardActions    ← → 삭제 (Part B에서 「담당자 ▸」 추가)
```

컴포넌트 이름과 층은 **이대로** 만듭니다. 층을 줄이고 싶어지는 게 정상이고, 그 충동이 이번 실습의 재료입니다.

## 시작 마크업과 데이터

- `src/starters/Starter06.jsx` — 정적 화면. **http://localhost:5173/?starter=06**
- `src/data/board.js` — `columns`(열 순서), `initialCards`(카드 8장), `members`(담당자 5명). **수정하지 마세요.**

컴포넌트는 `src/components/exercises/06/`에, `App.jsx`는 이번 실습 화면으로 교체합니다. 05의 `useRenderCount`는 `src/hooks/`에 있는 것을 그대로 씁니다.

컴포넌트가 아닌 파일은 새 폴더에 둡니다.

| 파일 | 내용 | 만드는 파트 |
|---|---|---|
| `src/reducers/boardReducer.js` | 리듀서 함수 하나 | A |
| `src/contexts/BoardContext.js` | `createContext` 결과 | B |
| `src/contexts/BoardProvider.jsx` | Provider 컴포넌트 | B |
| `src/hooks/useBoard.js` | Context를 읽는 훅 | B (C에서 둘로 나눔) |

왜 세 파일로 나누냐면 — 이 프로젝트의 lint 규칙 `react/only-export-components`가 **컴포넌트를 export하는 파일이 컴포넌트 아닌 것(훅, Context 객체)을 같이 export하면 경고**하기 때문입니다 (Fast Refresh가 그 파일을 통째로 다시 실행해야 해서). Context 객체는 `.js`에, Provider 컴포넌트는 `.jsx`에, 훅은 `hooks/`에 — 05의 "파일 하나당 훅 하나" 규칙과 같은 이유입니다.

## 이번에 쓰게 될 JS · React API

React 개념에 집중할 수 있게 먼저 정리해 둡니다.

**`useReducer`** — 03에서 쓴 `setX(prev => …)`의 `prev => …` 부분을 **컴포넌트 밖으로 꺼내 이름을 붙인 것**입니다. 그 함수가 리듀서입니다.

```js
// src/reducers/boardReducer.js
export function boardReducer(state, action) {
  switch (action.type) {
    case 'card_moved': {
      return { ...state, cards: /* 바뀐 카드만 새 객체로 */ }
    }
    default:
      throw new Error(`알 수 없는 액션: ${action.type}`)
  }
}

// 컴포넌트 안
const [state, dispatch] = useReducer(boardReducer, initialState)
dispatch({ type: 'card_moved', id: 'c1', direction: 'right' })
```

- `dispatch(action)`을 부르면 React가 `boardReducer(현재 state, action)`을 실행하고, **돌려준 값을 다음 state로** 씁니다. 리듀서가 같은 객체를 그대로 돌려주면 리렌더가 일어나지 않습니다.
- 리듀서는 **순수 함수**여야 합니다: 인자로 받은 `state`를 고치지 않고(02의 불변성 규칙 그대로) 새 객체를 돌려주며, 안에서 `fetch`·`setTimeout`·`console.log` 같은 바깥세상 일을 하지 않습니다. StrictMode가 리듀서도 두 번 부르기 때문에 순수하지 않으면 바로 티가 납니다.
- `dispatch`는 `useState`의 setter처럼 **렌더 사이에 같은 물건**입니다 (05 실험 C-3에서 확인한 그 성질).
- `action`은 **"무슨 일이 일어났는가"**를 적은 객체입니다. `type`은 과거형 사건 이름(`card_moved`), 나머지 필드는 리듀서가 그 일을 처리하는 데 필요한 최소 정보. `set_cards` 같은 setter 이름은 리듀서를 그냥 `setState`로 만들어 버립니다 — 왜 나쁜지는 질문 2.

**`switch`** — `case` 안에서 `return`하면 `break`가 필요 없습니다. `case` 안에서 `const`를 선언하려면 위처럼 중괄호 블록으로 감쌉니다 (안 감싸면 다른 `case`의 같은 이름과 충돌).

**`createContext` / `useContext`** — props 없이 **트리 아래 어디서든 값을 꺼내 쓰는** 통로입니다.

```js
// src/contexts/BoardContext.js
import { createContext } from 'react'
export const BoardContext = createContext(null)     // null = Provider 밖에서 읽었을 때의 값

// src/contexts/BoardProvider.jsx — 값을 "넣는" 쪽
export default function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState)
  return <BoardContext value={{ state, dispatch }}>{children}</BoardContext>
}
// React 19부터 Context 객체 자체를 Provider로 씁니다. 옛 문서의 <BoardContext.Provider>도 그대로 됩니다.

// 값을 "꺼내는" 쪽 — 트리에서 얼마나 깊든 상관없다
const { state, dispatch } = useContext(BoardContext)
```

동작 규칙 세 가지. Part C가 이걸 눈으로 확인하는 시간입니다.

1. `useContext(X)`를 부른 컴포넌트는 **X의 `value`가 `===`로 달라질 때마다 리렌더**됩니다. **`memo`는 props만 비교하므로 이걸 막지 못합니다.**
2. `value={{ state, dispatch }}`는 05에서 본 대로 **렌더마다 새 객체**입니다. Provider가 렌더될 때마다 소비자 전원이 리렌더됩니다.
3. Provider가 리렌더돼도 **`children`으로 받은 요소는 다시 그리지 않습니다.** `<Board />`라는 요소는 `App`이 만들었고 `App`은 리렌더되지 않았으니, Provider 입장에서 `children`은 같은 물건(`===`)입니다. 05의 `memo`와 같은 원리가 `children`에 자동으로 적용되는 셈입니다. 단, `Board`의 자손 중 `useContext`를 부른 컴포넌트는 규칙 1에 따라 **따로** 리렌더됩니다.

**Provider 밖에서 부른 걸 잡기** — `createContext(null)`의 `null`이 그 신호입니다. 훅으로 감싸 두면 실수를 즉시 알 수 있습니다.

```js
// src/hooks/useBoard.js
export function useBoard() {
  const ctx = useContext(BoardContext)
  if (ctx === null) throw new Error('useBoard는 BoardProvider 안에서만 쓸 수 있다')
  return ctx
}
```

**`<select>`의 `value`는 항상 문자열입니다.** `members`의 `id`는 숫자(`1`)이고 `e.target.value`는 `'1'`입니다. `===`는 타입까지 비교하므로 `'1' === 1`은 `false` — 필터가 "아무것도 안 나오게" 동작하면 이것부터 의심하세요. 한쪽으로 맞춥니다: `Number(e.target.value)` 또는 `String(card.assigneeId)`. "전체"는 `'all'` 같은 문자열 하나로 두면 됩니다.

**`findIndex`** — `find`의 형제. 조건에 맞는 첫 항목의 **위치**를 돌려주고, 없으면 `-1`입니다. 열 순서에서 "다음 열"을 찾을 때, 담당자 목록에서 "다음 사람"을 찾을 때 씁니다. 배열 끝을 넘긴 위치(`arr[arr.length]`)는 `undefined`입니다.

**`git diff --stat`** — 아직 커밋하지 않은 변경을 **파일별 한 줄**로 요약합니다. 이번 실습의 "자"입니다. 커밋하고 나면 비어 버리니 **커밋 전에** 찍습니다.

## 요구사항

### Part A — useReducer + prop drilling (50분)

이 파트에서는 **Context를 쓰지 않습니다.** 모든 값과 함수는 props로만 내려갑니다. 중간 컴포넌트가 자기는 안 쓰는 prop을 받아서 그대로 넘기는 일이 생깁니다 — 그게 정상이고, 그 개수를 셀 겁니다.

1. **리듀서** `src/reducers/boardReducer.js`. state는 정확히 두 키 — `{ cards, filter }`. `filter`는 `'all'` 또는 담당자 id. **걸러진 카드 목록·열별 개수는 state가 아닙니다** (04의 정렬과 같은 이유 — 렌더 중에 계산).
   - `card_moved` — 카드를 `columns` 순서에서 한 칸 왼쪽/오른쪽 열로. 액션에 **방향**을 담을지 **목적지 열 id**를 담을지는 여러분이 정합니다. 기준: 버튼을 누르는 쪽이 알아야 하는 게 적을수록 좋습니다. 질문 2에서 이유를 씁니다.
   - `filter_changed` — 담당자 필터 변경.
   - 모르는 `type`이면 `throw`.
   - 안 바뀐 카드는 **같은 객체 그대로** 두세요. `cards.map`에서 해당 카드만 스프레드로 새로 만들고 나머지는 그대로 돌려주면 됩니다. Part C 실험 C-3의 결과가 여기에 달려 있습니다.

2. **트리**를 위 그림대로 `exercises/06/`에 만듭니다. `App`이 `useReducer`를 갖고, 아래로 내려보냅니다.
   - `App`의 `dispatch`는 **`App` 밖으로 나가지 않습니다.** 자식에게는 03·05처럼 이름 있는 콜백을 내려보냅니다: `onMove(id, …)`, `onFilterChange(…)`. `App`이 그 안에서 `dispatch`를 부릅니다.
   - `BoardHeader`: select는 **제어 컴포넌트**(`value` + `onChange`). `value`는 `App`의 state에서 옵니다. 오른쪽 숫자는 **필터를 통과해 화면에 보이는 카드 수**.
   - `Column`: 열 제목과 **그 열에서 보이는 카드 수**. 필터링을 `Column`에서 하든 `CardList`에서 하든 여러분이 정합니다.
   - `CardList`: 카드가 없으면 「카드 없음」. 03에서 정리한 "래퍼는 목록에 1개 vs 항목마다 1개" 기준을 여기서도.
   - `Card`: 「펼치기」/「접기」로 설명을 보였다 감췄다. 이 펼침 상태를 **어디에 둘지**(Card의 `useState` vs 리듀서)는 여러분이 정하고, 질문 3에서 이유를 씁니다. 담당자는 `assigneeId`로 `members`에서 찾아 아바타와 이름을, `null`이면 「담당자 없음」.
   - `CardActions`: `←`는 첫 열에서, `→`는 끝 열에서 `disabled`. **「담당자 ▸」 버튼은 아직 만들지 않습니다** (Part B).
   - `map`에서 나오는 항목을 자식에게 넘기는 것(`column`, `card`)은 드릴링이 아닙니다. 드릴링은 **자기는 안 쓰고 통과만 시키는 prop**을 말합니다.

3. **prop 대조표** — 이동과 필터가 동작하면, 커밋 전에 아래를 만들어 완료 보고에 넣습니다. **판단하지 말고 복사만** 하세요. props를 받는 자식 컴포넌트마다(`Board`·`BoardHeader`·`Column`·`CardList`·`Card`·`CardActions` 전부) 두 줄:

   ```
   Board → Column      <Column column={column} cards={…} filter={filter} onMove={onMove} … />      ← 부모 파일에서 복사
                       function Column({ column, cards, filter, onMove }) {                          ← 자식 파일에서 복사
   ```

   붙여 넣은 뒤에 눈으로 대조하고, 어긋난 게 있으면 고친 뒤 **다시** 붙여 넣습니다. prop 이름 불일치는 00·05에서 세 번 나왔고, 세 번 다 "값이 `undefined`"라는 증상으로 시간을 잡아먹었습니다. 이 표가 그 시간을 줄이는 장치입니다.

4. 여기까지 커밋: `feat(06): Part A-1 - 리듀서 · 트리 · 이동 · 필터`.

5. **실험 A (드릴링 비용 측정)** — 삭제 기능(`card_deleted`)을 추가합니다. `CardActions`의 「삭제」 버튼 → 리듀서. `App`의 `dispatch`는 여전히 `App` 밖으로 안 나갑니다.
   - **예측 먼저 적습니다**: 파일을 몇 개 고치게 될까?
   - 구현하고, 커밋하기 전에 `git diff --stat`을 찍어 **출력 전체를 보고에 붙여 넣습니다.**
   - 붙여 넣은 파일마다 O/X를 답니다 — **O: 그 파일이 `onDelete`(또는 `card_deleted`)를 직접 호출하거나 처리한다. X: 받아서 넘기기만 한다.** X의 개수가 이 파트의 결과입니다.
   - 커밋: `feat(06): Part A-2 - 삭제 (실험 A)`.

### Part B — Context + Provider (35분)

6. `src/contexts/BoardContext.js`, `src/contexts/BoardProvider.jsx`, `src/hooks/useBoard.js`를 위 "API" 절의 모양대로 만듭니다. `useReducer`는 **`App`에서 `BoardProvider`로 이사**합니다. `App`은 `<BoardProvider><Board /></BoardProvider>`만 남습니다.

7. **드릴링을 걷어냅니다.** 값이나 함수가 필요한 컴포넌트가 `useBoard()`로 **직접** 꺼냅니다. 끝나면 `Board`·`Column`·`CardList`·`Card`의 props에 `filter`·`onMove`·`onDelete`·`onFilterChange`·`state`·`dispatch`가 **하나도 없어야** 합니다. `map`에서 나온 `column`·`card`는 남습니다.
   - `CardActions`는 이제 `dispatch`를 직접 부릅니다. Part A의 `onMove` 같은 중간 콜백은 없어집니다.
   - **주의**: `BoardHeader`의 select `value`는 Context의 `filter`입니다. select를 위해 `BoardHeader`에 `useState`를 따로 만들면 05의 `activeTabId`와 같은 상황(한 정보가 두 곳에)이 됩니다. 05에서 그게 취향 문제가 아니라 버그였던 것을 기억하세요.

8. **Provider 밖 감지 확인** — `App`에서 `<BoardProvider>`를 잠깐 빼고 새로고침해서, 콘솔(또는 화면)의 에러 메시지 첫 줄을 보고에 적습니다. 되돌립니다.

9. 커밋: `feat(06): Part B-1 - Context · Provider · 드릴링 제거`.

10. **실험 B (같은 자로 다시 측정)** — 「담당자 ▸」 버튼(`assignee_changed`)을 `CardActions`에 추가합니다. 누를 때마다 담당자가 `없음 → members[0] → … → members[4] → 없음` 순으로 돌아갑니다. 어느 파일이 "다음 담당자"를 계산할지(버튼인지 리듀서인지)는 여러분이 정합니다.
    - **예측 먼저**: 파일 몇 개?
    - 구현 → `git diff --stat` → 출력 전체를 보고에 붙여 넣고 O/X → 실험 A와 나란히 놓습니다.
    - 커밋: `feat(06): Part B-2 - 담당자 변경 (실험 B)`.

### Part C — Context와 리렌더 (30분)

**관찰 절차 — 실험 C-1·C-2·C-3 공통. 05에서 관찰 창을 놓쳐 "차이 없다"고 오판한 적이 있으니 이번엔 절차를 고정합니다.**

1. 담당자 필터가 **「전체」**인지 확인합니다 (카드 8장이 다 보여야 합니다. 필터가 걸려 있으면 마운트·언마운트가 섞여서 셀 수 없습니다).
2. **새로고침**합니다. `[render] CardActions 1회`·`2회`가 카드 수만큼(16줄) 찍힙니다. 이것은 마운트 로그이고 **세지 않습니다.**
3. 콘솔을 **지웁니다** (🚫 아이콘 또는 `Ctrl+L`).
4. 동작을 **정확히 한 번** 합니다.
5. 그 직후 찍힌 줄 중 `[render] CardActions`로 시작하는 것만 셉니다. **N값은 보지 않습니다.** 줄 수만.
6. Chrome은 글자가 똑같은 메시지를 접어서 왼쪽에 숫자 배지로 보여줄 수 있습니다 (`[render] CardActions 3회`가 8개면 배지 `8` + 한 줄). 배지 숫자가 곧 줄 수입니다. 헷갈리면 콘솔 설정(⚙)에서 "Group similar messages in console"을 끄세요.

11. 준비: `useRenderCount('Board')`를 `Board`에, `useRenderCount('CardActions')`를 `CardActions`에 붙이고, **`CardActions`를 `memo`로 감쌉니다.** `memo`를 먼저 붙이는 이유 — 안 붙이면 "부모 `Card`가 리렌더돼서" 찍힌 건지 "Context 때문에" 찍힌 건지 구분할 수 없습니다. `memo`가 부모 쪽을 막아 주면 남는 건 Context뿐입니다.

12. **실험 C-1 (기준선)** — 아무 카드의 「펼치기」를 한 번 클릭.
    - 예측: `[render] CardActions` 몇 줄? `[render] Board` 몇 줄?
    - 실행 → 기록. (펼침 state를 리듀서에 뒀다면 결과가 다릅니다. 그것도 기록하세요 — 질문 3의 재료입니다.) 펼침이 `Card`의 로컬 state인데도 `CardActions`가 찍힌다면, `Card`가 `CardActions`에 **렌더마다 새 물건**(인라인 화살표 함수, 새 객체)을 넘기고 있는 것입니다 — 05 실험 C-2와 같은 상황.

13. **실험 C-2 (단일 Context)** — 아무 카드의 「담당자 ▸」를 한 번 클릭. 카드 한 장의 `assigneeId`만 바뀝니다.
    - 예측: `[render] CardActions` 몇 줄? `[render] Board` 몇 줄?
    - 실행 → 기록. 카드 한 장이 바뀌었는데 `CardActions`가 몇 개 다시 그려졌나요? `memo`가 있는데도요.

14. **Context 분리** — `BoardContext.js`에 Context를 **둘** 만듭니다: `BoardStateContext`(값: `state`), `BoardDispatchContext`(값: `dispatch`). `BoardProvider`가 둘을 겹쳐 감쌉니다. `useBoard.js`를 지우고 `src/hooks/useBoardState.js`·`src/hooks/useBoardDispatch.js`로 나눕니다 (둘 다 Provider 밖 감지 포함). 각 컴포넌트는 **필요한 쪽만** 부릅니다 — `CardActions`는 `dispatch`만 필요합니다.

15. **실험 C-3 (분리 후)** — 실험 C-2와 똑같이 「담당자 ▸」 한 번.
    - 예측 먼저.
    - 실행 → 기록. **완성 상태는 `[render] CardActions` 1줄 또는 0줄, `[render] Board` 0줄**입니다. 1줄인지 0줄인지는 `CardActions`가 `card` 객체를 받는지, `id`·`status` 같은 원시값만 받는지에 달렸습니다 — 어느 쪽이고 왜 그런지 질문 5에서 씁니다. **8줄이면** 요구 1의 마지막 항목(안 바뀐 카드는 같은 객체)을 리듀서에서 확인하세요.

16. 커밋: `feat(06): Part C - Context 분리 (실험 C)`.

## 완성 조건

각 항목에 확인 방법을 적어 뒀습니다. **브라우저와 터미널에서 그대로 해 보고** 체크하세요. 못 한 항목은 비워 두고 보고하면 됩니다.

- [ ] 파일이 제자리에 있다 — *확인: `src/reducers/boardReducer.js` · `src/contexts/BoardContext.js` · `src/contexts/BoardProvider.jsx` · `src/hooks/useBoardState.js` · `src/hooks/useBoardDispatch.js` · `src/components/exercises/06/`에 `Board`·`BoardHeader`·`Column`·`CardList`·`Card`·`CardActions`. `useBoard.js`는 없다*
- [ ] 이동이 된다 — *확인: 「할 일」 카드의 `←`가 회색, `→` 클릭 → 「진행 중」으로 옮겨지고 두 열의 숫자가 바뀐다. 「완료」 카드는 `→`가 회색*
- [ ] 삭제가 된다 — *확인: 「삭제」 → 카드가 사라지고 헤더 숫자가 1 준다*
- [ ] 담당자 필터가 된다 — *확인: 「김하늘」 선택 → 카드 2장(할 일 1 · 진행 중 1)만 보이고 헤더 숫자 `2장`, 열 숫자 `1`·`1`·`0`, 「완료」열은 「카드 없음」. 「전체」로 되돌리면 8장*
- [ ] 「담당자 ▸」가 돈다 — *확인: 「온보딩 일러스트 시안」에서 6번 클릭 → 김하늘 → 이준서 → 박서연 → 최민준 → 정유진 → 담당자 없음*
- [ ] 리듀서 state가 `cards`·`filter` 두 키뿐이다 — *확인: `initialState`와 리듀서의 모든 `return`을 눈으로. 걸러진 목록이나 개수를 담는 키가 없다*
- [ ] 리듀서가 순수하다 — *확인: `boardReducer.js` 안에 `.push(`·`.splice(`·`.sort(`·`state.cards =`·`card.status =`가 없고, import는 `src/data/board.js`뿐이다*
- [ ] 드릴링이 없다 — *확인: `Board`·`Column`·`CardList`·`Card`의 `function X({ … })` 줄에 `filter`·`onMove`·`onDelete`·`onFilterChange`·`state`·`dispatch`가 없다*
- [ ] 같은 정보가 두 곳에 없다 — *확인: `src/components/exercises/06/` 전체에서 `useState`를 검색하면 `Card.jsx`의 펼침 한 줄뿐이다 (펼침을 리듀서에 뒀다면 0줄). `BoardHeader`·`Column`·`CardList`에 `useState`가 있으면 Context에 있는 값을 복사한 것이다*
- [ ] Provider 밖에서 부르면 여러분이 쓴 에러 메시지가 뜬다 — *확인: 요구 8의 메시지가 보고에 있다*
- [ ] 「전체」 필터에서 「담당자 ▸」 한 번 → `[render] CardActions` 1줄 또는 0줄(8줄 아님), `[render] Board` 0줄 — *확인: Part C 관찰 절차 그대로*
- [ ] `CardActions`는 `useBoardDispatch()`만 부른다 — *확인: `CardActions.jsx`에 `useBoardState`가 없다*
- [ ] 스타터에 없는 태그·className·CSS를 새로 만들지 않았고, `ui/`는 수정하지 않았다 — *확인: `git diff --stat <06 출제 커밋>..HEAD`에 `src/styles/`·`src/components/ui/`가 없다 (출제 커밋 해시는 `git log --oneline`에서 `docs: 06 …` 줄)*
- [ ] `npm run lint` 경고 없음, 콘솔에 React 경고·에러 없음 — *확인: **`npm run lint`를 직접 실행하고 출력의 마지막 줄을 완료 보고에 그대로 붙여 넣으세요.** 05에서 이 방법으로 처음 0개를 만들었습니다. 붙여 넣은 줄이 없으면 이 항목은 체크되지 않은 것으로 봅니다*

## 생각해볼 질문 (완료 보고 때 답변)

1. 실험 A에서 X(통과만 시킨 파일)는 몇 개였고, 실험 B에서는 몇 개였나요? 만약 Part A에서 `onMove` 대신 **`dispatch` 자체를** 내려보냈다면 실험 A의 파일 수는 어떻게 됐을까요 — 그래도 남는 문제는 무엇인가요? 이걸 근거로 "이 값은 props로 내려보낸다 / 이 값은 Context에 둔다"를 가르는 기준을 한 줄로 적어 보세요.
2. `card_moved`에 방향을 담았나요, 목적지 열을 담았나요? 왜죠? 그리고 액션을 `{ type: 'cards_set', cards: 새배열 }` 하나로만 만들면(버튼이 새 배열을 계산해서 보냄) 무엇이 나빠지나요? 리듀서를 두는 이유가 답에 들어 있어야 합니다.
3. 펼침 상태를 어디에 뒀나요? 실험 C-1의 결과가 그 선택과 어떻게 연결되나요? "이 값은 전역(리듀서)에 / 이 값은 로컬(`useState`)에"를 가르는 기준을 한 줄로. 그리고 `BoardHeader`가 select를 위해 `useState`를 따로 두면 **어떤 조작 순서**에서 화면이 틀어지나요? (05의 `activeTabId` 버그를 떠올려 재현 절차를 적으세요.)
4. `value={{ state, dispatch }}`는 렌더마다 새 객체입니다. 05 기준으로는 `useMemo` 감이었는데, 이번엔 왜 문제가 되지 않았나요? `BoardProvider`에 Context와 무관한 `useState`(예: 다크모드 토글)가 하나 더 생기면 어떻게 되고, 그때는 무엇을 해야 하나요?
5. 실험 C-2에서 `memo`가 붙어 있는데도 `CardActions` 전부가 다시 그려진 이유는요? 실험 C-3에서 1줄(또는 0줄)로 줄어든 이유 — `BoardDispatchContext`의 값은 왜 안 바뀌나요(05 결론과 연결)? 여러분의 결과가 1줄이었다면 그 한 장은 왜 그려졌고, 0줄이었다면 담당자가 바뀐 카드의 `CardActions`조차 왜 안 그려졌나요? `Board`가 0줄인 이유를 본인 문장으로. 마지막으로 — **카드 8장짜리 보드에서 이 Context 분리가 실제로 필요했나요?** 05의 마지막 질문에 답한 기준이 여기서도 그대로 통하는지 확인해 보세요.

## 참고 문서

- reducer로 state 로직 추출하기: https://react.dev/learn/extracting-state-logic-into-a-reducer
- Context로 데이터 깊이 전달하기: https://react.dev/learn/passing-data-deeply-with-context
- reducer와 Context로 확장하기: https://react.dev/learn/scaling-up-with-reducer-and-context
- `useReducer`: https://react.dev/reference/react/useReducer
- `useContext`: https://react.dev/reference/react/useContext
- `createContext`: https://react.dev/reference/react/createContext

## 완료 방법

파트마다 커밋합니다 (요구 4·5·9·10·16의 메시지). 마지막 커밋 뒤 Claude에게 "06 완료" + **prop 대조표** + 실험 A·B의 **`git diff --stat` 출력과 O/X** + 실험 C-1·C-2·C-3 결과(예측과 실제) + 요구 8의 에러 메시지 + 질문 5개 답변 + **`npm run lint` 출력 마지막 줄**.

파트 중간에 막히면 "06 Part A 막힘" 처럼 파트를 붙여서 물어보세요.
