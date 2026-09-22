# 05 · 커스텀 훅 · ref · 렌더링 이해

예상 시간: 90~120분 (세 파트. **파트마다 세션 하나**로 나누세요) · 개념: 커스텀 훅 추출, 훅의 규칙, `useRef`(DOM 접근 · 렌더와 무관한 값), 리렌더링이 언제 일어나는지, `memo` · `useMemo` · `useCallback`은 언제 필요한지

04의 도서 검색을 그대로 이어 갑니다. 새 기능은 셋뿐입니다 — 디바운스, `지우기` 버튼, 정렬 탭. 이번 실습의 핵심은 기능이 아니라 두 가지입니다. **로직을 컴포넌트 밖으로 꺼내는 것**(Part A·B), 그리고 **React가 언제 다시 그리는지 눈으로 확인하는 것**(Part C).

## 목표

도서 검색 화면. 입력이 멈춘 뒤에만 요청이 나가고, 검색창은 자동으로 포커스되고, 결과를 제목순·연도순으로 정렬할 수 있습니다.

## 시작 마크업과 API

- `src/starters/Starter05.jsx` — 정적 화면. **http://localhost:5173/?starter=05**
- `src/api/booksApi.js` · `src/data/books.js` — 04와 같습니다. **수정하지 마세요.**

04 컴포넌트는 `src/components/exercises/04/`에 그대로 두고, **복사본을 `src/components/exercises/05/`에 만들어서** 거기서 고칩니다. 04는 기록으로 남습니다. `App.jsx`는 이번 실습 화면으로 교체합니다. 04에 있던 Enter로 제출하는 기능은 이번엔 필요 없으니 지워도 됩니다.

커스텀 훅은 새 폴더 **`src/hooks/`**에 파일 하나당 훅 하나로 둡니다 (`useBooks.js`, `useDebouncedValue.js`, `useRenderCount.js`).

## 이번에 쓰게 될 JS · React API

React 개념에 집중할 수 있게 먼저 정리해 둡니다.

**커스텀 훅은 그냥 함수입니다.** 이름이 `use`로 시작하고 안에서 다른 훅을 부르는 함수. 여러 값을 돌려주려면 객체로 묶고, 받는 쪽에서 구조 분해합니다 — props 받을 때와 같은 문법입니다.

```js
function useBooks(keyword) {
  const [books, setBooks] = useState([])
  // …
  return { books, loading, error, retry }
}

const { books, loading } = useBooks('리액트')   // 필요한 것만 꺼내도 된다
```

**훅의 규칙** — 훅은 컴포넌트(또는 다른 훅)의 **최상위**에서만 부릅니다. `if`·`for`·이벤트 핸들러·`return` 뒤에서는 안 됩니다. React는 훅을 **이름이 아니라 호출 순서**로 구분하기 때문입니다. 실험 A에서 직접 깨뜨려 볼 겁니다.

**`setTimeout` / `clearTimeout`** — `setTimeout(fn, ms)`는 ms 뒤에 fn을 실행하고, 취소에 쓸 **타이머 id**를 돌려줍니다.

```js
const id = setTimeout(() => console.log('500ms 지남'), 500)
clearTimeout(id)   // 아직 안 울렸으면 취소
```

**참조 비교 — Part C의 전부입니다.** `===`는 문자열·숫자는 **값**으로 비교하지만, 배열·객체·함수는 **같은 물건인지**로 비교합니다.

```js
'a' === 'a'                  // true
[1, 2] === [1, 2]            // false — 내용이 같아도 다른 배열
(() => 1) === (() => 1)      // false — 똑같이 생겨도 다른 함수

const a = [1, 2]
a === a                      // true — 같은 물건
```

컴포넌트 함수 본문은 **렌더될 때마다 처음부터 다시 실행**됩니다. 그러니 본문에서 만든 배열·객체·화살표 함수는 **렌더마다 새 물건**입니다. `useState`에 들어 있는 값만 렌더 사이에 같은 물건으로 남습니다. (Vue에 비유하면: Vue의 `computed`는 자동으로 캐시되지만, React 렌더 본문의 계산은 매 렌더 다시 실행됩니다. 아래 `useMemo`가 그 캐시를 **수동으로** 켜는 도구입니다.)

**`useRef`** — 렌더 사이에 살아남지만, 바꿔도 **리렌더를 일으키지 않는** 상자입니다.

```js
const inputRef = useRef(null)       // { current: null }
<input ref={inputRef} />            // 화면에 붙은 뒤 inputRef.current === 그 <input> DOM 노드
inputRef.current.focus()            // 이벤트 핸들러나 이펙트 안에서

const countRef = useRef(0)          // DOM이 아닌 값도 담는다
countRef.current += 1               // 리렌더 안 일어남
```

`ref.current`는 **렌더 본문에서 읽고 쓰지 마세요.** 이벤트 핸들러와 이펙트 안에서만. (StrictMode가 렌더 함수를 두 번 부르기 때문에 본문에서 세면 숫자부터 틀립니다.)

React 19에서는 `ref`를 **보통 prop처럼** 자식 컴포넌트에 넘길 수 있습니다. `<BookInput ref={inputRef} />`로 넘기고, 자식에서 `function BookInput({ ref, … })`로 받아 `<input ref={ref} />`에 붙이면 됩니다. 옛 문서에 나오는 `forwardRef`는 필요 없습니다.

**`memo` · `useMemo` · `useCallback`** — 모양만 먼저.

```js
import { memo, useMemo, useCallback } from 'react'

export default memo(BookList)
// 부모가 렌더돼도 props가 전부 === 로 같으면 BookList를 건너뛴다

const sorted = useMemo(() => [...books].sort(…), [books, sortBy])
// 의존성이 안 바뀌면 지난 렌더의 결과(같은 물건)를 그대로 돌려준다

const handleSort = useCallback((id) => setSortBy(id), [])
// 의존성이 안 바뀌면 지난 렌더의 함수(같은 물건)를 그대로 돌려준다
```

셋 다 **정확성이 아니라 "건너뛰기"를 위한 도구**입니다. 없어도 화면은 맞습니다. 언제 써야 하는지가 Part C의 질문입니다.

## 요구사항

### Part A — 커스텀 훅 (40분)

1. 04 컴포넌트를 `exercises/05/`로 복사하고 `App.jsx`를 교체해서, **04와 똑같이 동작하는 상태**에서 시작합니다.

2. **`useBooks(keyword)`** — `src/hooks/useBooks.js`. 요청·취소·로딩·에러 관리를 전부 이 훅 안으로 옮깁니다.
   ```js
   const { books, loading, error, retry } = useBooks(keyword)
   ```
   - `App`에는 `fetchBooks` import, `AbortController`, 로딩·에러 state가 **남아 있으면 안 됩니다.**
   - `retry()`는 **인자를 받지 않습니다.** 훅이 지금 알고 있는 검색어로 다시 요청합니다.
   - 정렬은 훅이 **하지 않습니다.** 도착한 순서 그대로 돌려주고, `App`이 렌더 중에 정렬합니다 (04 요구 8과 같음). Part C에서 여기에 손을 댑니다.

3. **`useDebouncedValue(value, delay)`** — `src/hooks/useDebouncedValue.js`. 값이 바뀐 뒤 `delay`ms 동안 **다시 바뀌지 않으면** 그때 갱신되는 값을 돌려줍니다. 그 전에 또 바뀌면 타이머를 다시 셉니다.
   ```js
   const debouncedKeyword = useDebouncedValue(keyword, 500)
   ```
   - `useState` + `useEffect` + `setTimeout`으로 만듭니다. 타이머 취소는 이펙트의 **cleanup**에서 — 04에서 `AbortController`를 취소하던 자리와 같습니다.
   - 이 훅은 **도서를 모릅니다.** 파일 안에 `books`·`keyword`·`fetch` 같은 단어가 나오면 범용이 아닌 겁니다.

4. `App`에서 연결: 입력 즉시 반영되는 `keyword`(제어 컴포넌트) → `useDebouncedValue` → **디바운스된 값으로** `useBooks`. 관찰용으로 500ms는 조금 깁니다. 일부러 그렇게 둡니다.

5. **실험 A (훅의 규칙, 코드에 남기지 않음)** — `useDebouncedValue` 호출을 조건문 안으로 옮겨 봅니다. 예를 들면 `let debounced = keyword; if (keyword !== '') debounced = useDebouncedValue(keyword, 500)`.
   - (a) `npm run lint`가 뭐라고 하는지 적습니다.
   - (b) 브라우저에서 새로고침한 뒤 **한 글자** 입력했을 때 콘솔의 에러 메시지를 적습니다.
   - 되돌립니다. 질문 1에서 씁니다.

### Part B — ref (20분)

6. 화면이 처음 뜨면 검색창에 **포커스**가 가 있습니다. `autoFocus` 속성은 쓰지 않습니다 — `useRef`로 DOM에 접근해서 `.focus()`를 부릅니다. "화면이 나타났다는 사실" 때문에 한 번 일어나는 일이니 어디에 쓸지는 04에서 정리한 기준으로 정하세요.

7. 검색창 오른쪽 **`지우기`** 버튼: 검색어를 비우고 검색창에 다시 포커스합니다. 검색어가 비어 있으면 `disabled`입니다.
   - ref를 어느 컴포넌트에 둘지는 여러분이 정합니다. 포커스를 부르는 코드와 `<input>`이 다른 컴포넌트에 있다면 위의 "React 19에서는 `ref`를 보통 prop처럼" 부분을 보세요.

8. **`useRenderCount(name)`** — `src/hooks/useRenderCount.js`. 이 훅을 부른 컴포넌트가 **렌더될 때마다** 콘솔에 `[render] ${name} N회`를 찍습니다. Part C의 관찰 도구입니다.
   - N은 **ref**에 둡니다. `useState`를 쓰면 이 훅 자체가 리렌더를 일으켜서 측정 도구가 측정 대상을 망칩니다.
   - 증가와 로그는 **의존성 배열 없는 `useEffect`** 안에서 합니다 (04 질문 1의 ③ — 매 렌더 뒤 실행). 렌더 본문에서 `ref.current`를 건드리지 않는 이유는 위 `useRef` 절에.
   - `App`과 `BookList`에 붙입니다. `BookItem`은 14개라 붙이지 않습니다.
   - **마운트 직후에는 `1회`·`2회`가 연달아 찍힙니다.** StrictMode가 마운트 시 이펙트를 두 번 실행하기 때문입니다(04 질문 5). 그 뒤부터는 리렌더 한 번에 한 줄입니다. 로그가 두 배로 보이는 게 아니라 그렇게 되는 게 맞습니다.

### Part C — 렌더링 (40분)

**실험은 전부 "목록이 화면에 보이는 상태"에서 시작하고, 글자를 친 뒤 500ms 안에 찍힌 로그만 봅니다.** 500ms가 지나면 요청이 나가며 스피너로 바뀌고, 응답이 오면 `BookList`가 새로 마운트돼 `1회`·`2회`부터 다시 시작합니다. 그건 리렌더가 아니라 마운트입니다(질문 3).

9. **실험 C-1 (memo 적용 전)** — 검색창에 **한 글자** 입력합니다.
   - 예측을 먼저 적습니다: `[render] App`은 몇 줄? `[render] BookList`는 몇 줄?
   - 실행하고 실제를 적습니다. `BookList`의 props는 하나도 안 바뀌었는데 어떻게 됐나요?

10. **정렬 탭** `제목순` / `연도순`(둘 다 오름차순, 기본은 제목순).
    - 정렬된 배열은 `App`이 **렌더 중에** 계산합니다. 정렬 결과를 담는 `useState` + 채우는 `useEffect` 조합은 04와 같은 이유로 금지입니다.
    - 탭 UI는 **`BookList` 안**에 있고, `BookList`는 정확히 이 세 props를 받습니다: 정렬된 `books`, `sortBy`, `onSortChange`. (`ui/Tab`을 수정 없이 재사용해도 됩니다.) 탭이 `BookList` 안에 있어야 하는 이유는 실험 C-3에서 드러납니다.

11. `BookList`를 **`memo`**로 감쌉니다. **실험 C-2** — 한 글자 입력.
    - 예측 먼저: 이제 `[render] BookList`는 몇 줄?
    - 실행. 찍힌다면 — `memo`는 props를 `===`로 비교합니다. 세 props 중 **렌더마다 새 물건이 되는 것**이 무엇인지 "참조 비교" 절을 다시 읽고 찾으세요. `console.log`로 찍어서 비교해도 좋습니다.
    - 찾은 원인을 `useMemo` 또는 `useCallback`으로 **하나씩** 해결하면서, 어느 시점에 로그가 사라지는지 순서대로 기록합니다.

12. **실험 C-3 (`onSortChange` 세 가지, 예측 먼저)** — 실험 C-2가 끝난 상태에서 `App`이 `onSortChange`에 넘기는 값을 바꿔 가며 **한 글자 입력 시 `BookList` 로그가 찍히는지** 봅니다.
    - (a) `onSortChange={(id) => setSortBy(id)}`
    - (b) `onSortChange={setSortBy}`
    - (c) `useCallback`으로 감싼 함수
    - 최종 코드에는 (b)와 (c) 중 하나를 남기고, 질문 5에서 이유를 답합니다.

13. 완성 상태: 목록이 보일 때 **한 글자 입력 → `App` 1회, `BookList` 0회**. **탭 클릭 → `BookList` 1회.**

## 완성 조건

각 항목에 확인 방법을 적어 뒀습니다. **브라우저와 터미널에서 그대로 해 보고** 체크하세요. 01~04 네 번 연속으로 `[x]`인데 실제로는 미충족인 항목이 있었고, 04는 lint 한 개였습니다. 그래서 이번엔 마지막 항목의 확인 방법이 다릅니다. 못 한 항목은 비워 두고 보고하면 됩니다.

- [ ] `src/hooks/`에 `useBooks.js`·`useDebouncedValue.js`·`useRenderCount.js`가 있고, `App.jsx`에 `fetchBooks` import·`AbortController`·로딩·에러 state가 없다 — *확인: `App.jsx`의 import 줄과 `useState` 줄을 눈으로 센다*
- [ ] 04의 동작이 전부 유지된다 — *확인: 새로고침 → 14권 · `에러` → 에러 화면과 `다시 시도`만 · `zzz` → `empty`만 · `N권`이 맞음*
- [ ] 디바운스가 된다 — *확인: `자바스크립트`를 빠르게 치면 `[api] 요청 시작`이 **마지막 검색어로 한 번만** 찍힌다*
- [ ] `useDebouncedValue`가 도서를 모른다 — *확인: 파일 안에 `book`·`keyword`·`fetch`가 없다*
- [ ] `다시 시도`가 지금 검색어로 재요청한다 — *확인: `에러` 상태에서 클릭 → `[api] 요청 시작: "에러"`가 한 줄 더*
- [ ] 첫 화면에서 검색창에 포커스가 있고 `autoFocus`를 쓰지 않았다 — *확인: 새로고침 직후 클릭 없이 타이핑이 된다*
- [ ] `지우기`가 검색어를 비우고 포커스를 되돌린다 — *확인: 검색어가 있을 때 클릭 → 빈 검색창에 커서, 500ms 뒤 `""` 요청. 비어 있을 때는 버튼이 회색(disabled)*
- [ ] `useRenderCount`에 `useState`가 없고, 마운트 직후 `1회`·`2회` 다음부터는 리렌더 한 번에 한 줄이다 — *확인: 콘솔*
- [ ] 정렬 탭이 동작하고, 정렬 결과를 담는 state + 채우는 effect 조합이 없다 — *확인: `연도순` 클릭 → 가장 오래된 책이 맨 위. `App.jsx`에서 `sort`가 있는 줄이 렌더 본문(또는 `useMemo`) 안에 있다*
- [ ] 목록이 보일 때 한 글자 입력 → `[render] App` 1줄, `[render] BookList` 0줄 — *확인: 실험 C-1과 같은 조건에서*
- [ ] 탭 클릭 → `[render] BookList` 1줄 — *확인: 콘솔*
- [ ] 스타터에 없는 태그·className·CSS를 새로 만들지 않았고, `ui/`는 수정하지 않았다 — *확인: `git diff --stat`에 `src/styles/`·`src/components/ui/`가 없다*
- [ ] `npm run lint` 경고 없음, 콘솔에 React 경고·에러 없음 — *확인 방법이 다릅니다: **`npm run lint`를 직접 실행하고 출력의 마지막 줄을 완료 보고에 그대로 붙여 넣으세요.** 붙여 넣은 줄이 없으면 이 항목은 체크되지 않은 것으로 봅니다*

## 생각해볼 질문 (완료 보고 때 답변)

1. 실험 A에서 본 lint 메시지와 브라우저 에러 메시지를 근거로: React는 컴포넌트 안의 훅 여러 개를 **무엇으로** 구분하나요? 그래서 조건문 안에서 부르면 정확히 무엇이 깨지나요?
2. `useBooks`의 `retry`는 인자를 안 받는데 어떻게 "지금 검색어"를 아나요? 04에서 `BookResult`에 `keyword`를 안 넘겨서 빈 검색어로 재요청됐던 버그가, 이 구조에서는 **왜 생길 수 없나요** — 혹은 생길 수 있다면 어떤 실수를 해야 생기나요?
3. `useRenderCount`의 N을 ① `useState` ② 함수 안의 지역 변수 `let n = 0` ③ `useRef` 로 두면 각각 어떻게 되나요? "렌더 사이에 살아남는가"와 "바꾸면 리렌더되는가" 두 축으로 셋을 표로 정리해 보세요. 그리고 검색이 끝날 때마다 `BookList`가 `1회`부터 다시 시작하는 이유는요?
4. 실험 C-1에서 `BookList`는 props가 하나도 안 바뀌었는데 왜 다시 렌더됐나요? 그럼 React 컴포넌트가 다시 렌더되는 조건을 한 줄로 적어 보세요. 실험 C-2에서 `memo`만 붙였을 때 안 통한 이유는요?
5. 실험 C-3에서 (b) `setSortBy`를 직접 넘기면 되는 이유는 무엇인가요? (c)와 (b) 중 무엇을 남겼고 왜죠? 마지막으로 — **14권짜리 목록에서 이 최적화가 실제로 필요했나요?** `memo`·`useMemo`·`useCallback`을 쓸지 말지 정하는 기준을 한 줄로 적어 보세요.

## 참고 문서

- 커스텀 훅으로 로직 재사용하기: https://react.dev/learn/reusing-logic-with-custom-hooks
- 훅의 규칙: https://react.dev/reference/rules/rules-of-hooks
- ref로 값 참조하기: https://react.dev/learn/referencing-values-with-refs
- ref로 DOM 조작하기: https://react.dev/learn/manipulating-the-dom-with-refs
- `memo`: https://react.dev/reference/react/memo
- `useMemo`: https://react.dev/reference/react/useMemo
- `useCallback`: https://react.dev/reference/react/useCallback
- 렌더링과 커밋: https://react.dev/learn/render-and-commit

## 완료 방법

```
git add -A
git commit -m "feat(05): 커스텀 훅 · ref · 렌더링 이해 구현"
```

그리고 Claude에게 "05 완료" + 실험 A·C-1·C-2·C-3 결과(예측과 실제) + 질문 5개 답변 + **`npm run lint` 출력 마지막 줄**.
