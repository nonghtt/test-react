# 07 · 라우팅

예상 시간: 110~130분 (세 파트. **파트마다 세션 하나**로 나누세요) · 개념: 라우트 정의, 레이아웃 라우트와 `Outlet`, `Link` / `NavLink`, `useParams`, 404 · 리다이렉트, `useSearchParams`(URL을 state로), 같은 라우트에서 param만 바뀔 때의 state와 `key`, 라우트 사이에 남는 state, `useNavigate`

지금까지는 화면이 하나였습니다. 이번엔 **주소마다 다른 화면**이 나옵니다. 그러면 지금까지 없던 질문이 생깁니다 — 페이지를 옮기면 state는 어떻게 되나? 새로고침하면? 주소를 복사해서 보내면? Part A는 뼈대를 세우고, Part B는 "URL도 state를 담는 곳"이라는 걸 useState 버전과 나란히 재 보고, Part C는 페이지가 바뀔 때 **남는 state · 사라지는 state · 남으면 안 되는 state**를 실험으로 가릅니다.

## 목표

프로젝트 허브. 목록에서 상태 탭으로 거르고, 카드를 눌러 상세로 가고, 상세에서 이전/다음 프로젝트로 넘기고, 삭제합니다.

```
App                      BrowserRouter · Routes (라우트 정의는 여기)
└─ Layout                헤더(브랜드 · 내비) + <main> 안의 페이지 자리
   ├─ ProjectsPage       /projects            상태 탭 · 카드 그리드
   │  └─ ProjectCard ×N
   ├─ ProjectDetailPage  /projects/:projectId 상세 · 이전/다음 · 삭제
   │  └─ CommentBox      댓글 입력창 (Part C)
   ├─ AboutPage          /about               (정적, 고칠 것 없음)
   └─ NotFoundPage       그 밖의 모든 주소
```

## 시작 마크업과 데이터

- `src/starters/Starter07.jsx` — 화면 모음. **http://localhost:5173/?starter=07** (주소마다 하나씩 나올 화면을 한 페이지에 늘어놓았습니다)
- `src/data/projects.js` — `projects`(프로젝트 7개), `statusInfo`(상태 → 배지 글자·색). **수정하지 마세요.** `id`는 숫자이고 **1씩 늘지 않습니다**(12, 15, 21, …).

06처럼 **컴포넌트 7개를 `src/components/exercises/07/`에 정적으로 미리 나눠 두었습니다.** 값은 하드코딩, 링크는 전부 평범한 `<a href>`, import만 연결된 상태입니다. `App.jsx`는 `<Layout />`을 그리도록 바꿔 두었습니다. `ui/`의 `Tab`·`Badge`·`AvatarGroup`을 이미 쓰고 있으니 그대로 재사용하세요. 05의 `useRenderCount`는 `src/hooks/`에 있는 것을 씁니다.

`react-router`(8.4)는 설치해 두었습니다. **인터넷의 옛 글은 `react-router-dom`에서 import하는데, v8에서 그 패키지는 없어졌습니다.** 전부 `react-router`에서 가져옵니다.

## 이번에 쓰게 될 JS · React Router API

### Vue Router 대응표

Vue Router를 써 봤다면 거의 1:1입니다.

| Vue Router | React Router | 비고 |
|---|---|---|
| `routes: [{ path, component, children }]` | `<Routes>` 안의 `<Route path element>` 중첩 | 설정 객체 대신 JSX로 적는다 |
| `<router-view />` | `<Outlet />` | 부모 라우트 컴포넌트 안에서 자식 라우트가 그려질 자리 |
| `<router-link to>` | `<Link to>` | |
| `router-link-active` 클래스 | `<NavLink>`의 `active` 클래스 | 자동으로 붙는다 |
| `$route.params` / `useRoute().params` | `useParams()` | |
| `$route.query` | `useSearchParams()` | 읽는 법이 다르다 (아래) |
| `router.push` / `router.replace` / `router.go(-1)` | `navigate(to)` / `navigate(to, { replace: true })` / `navigate(-1)` | `const navigate = useNavigate()` |
| `{ path: '/', redirect: '/x' }` | `<Navigate to="/x" replace />`를 그 라우트의 `element`로 | |
| `{ path: '/:pathMatch(.*)*' }` | `<Route path="*">` | |

### 이름이 비슷한 것들

06에서 "Provider"가 두 뜻으로 섞여 헷갈렸으니 먼저 갈라 둡니다.

| 이름 | 정체 | 어디에 |
|---|---|---|
| `BrowserRouter` | 주소창과 React를 연결하는 **통 하나**. 앱 전체를 한 번 감싼다 | `App.jsx` 맨 바깥, 딱 한 번 |
| `Routes` | "지금 주소에 맞는 `Route`를 골라 그려라"라는 **자리** | `BrowserRouter` 안 |
| `Route` | 주소 한 줄 ↔ 그릴 요소 한 개의 **규칙**. 그 자체는 아무것도 그리지 않는다 | `Routes` 안, 서로 중첩 가능 |
| `Link` | 클릭하면 이동하는 링크 (`<a>`를 그린다) | JSX, 사용자가 누를 때 |
| `NavLink` | `Link` + 현재 주소와 맞으면 `active` 클래스 | 내비게이션 메뉴 |
| `Navigate` | **그려지는 순간** 이동하는 컴포넌트. 화면에 아무것도 안 나온다 | 리다이렉트용 `element` |
| `useNavigate` | 이동 **함수**를 돌려주는 훅. 이벤트 핸들러 안에서 부른다 | 삭제·제출 **후에** 이동할 때 |
| `useParams` | 경로의 `:이름` 부분 (`/projects/12`의 `12`) | |
| `useSearchParams` | `?` 뒤의 쿼리 (`?status=done`) | |

### 모양 예시 (블로그 — 이번 실습과 다른 도메인)

```jsx
import { BrowserRouter, Routes, Route, Navigate, Outlet, NavLink, Link, useParams } from 'react-router'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BlogLayout />}>                         {/* path 없음 = 주소는 안 늘리고 껍데기만 */}
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/:postId" element={<PostPage />} />  {/* :postId → useParams().postId */}
          <Route path="*" element={<NotFound />} />              {/* 위에서 아무것도 안 맞으면 */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function BlogLayout() {
  return (
    <>
      <nav>
        <NavLink className="nav-link" to="/posts">글</NavLink>   {/* 주소가 /posts 또는 /posts/… 이면 "nav-link active" */}
      </nav>
      <main>
        <Outlet />                                               {/* 맞은 자식 Route의 element가 여기 그려진다 */}
      </main>
    </>
  )
}

function PostPage() {
  const { postId } = useParams()                                 // '/posts/7' → '7'
  return <Link to={`/posts/${Number(postId) + 1}`}>다음 글</Link>
}
```

- `<Route path="posts">` 안에 `<Route index>`와 `<Route path=":postId">`를 넣는 중첩 방식도 됩니다. 둘 중 무엇을 쓸지는 여러분이 정합니다.
- **`Link`가 `<a>`와 다른 점**: `<a href>`를 누르면 브라우저가 서버에서 페이지를 **처음부터 다시 받습니다**. `Link`는 그 클릭을 가로채서 페이지를 새로 받지 않고 **주소만 바꾸고**, React Router가 바뀐 주소에 맞는 라우트를 다시 그립니다. 그 차이가 무엇을 남기고 무엇을 날리는지는 Part C에서 직접 봅니다.
- `NavLink`에 `className="nav-link"`만 주면 활성일 때 `"nav-link active"`가 됩니다. **활성 여부를 직접 계산하는 코드는 쓰지 않습니다.**
- 템플릿 리터럴(JS): `` `/posts/${id}` ``는 `'/posts/' + id`와 같습니다. `to={...}` 안에 씁니다.

### URL에서 오는 값은 전부 문자열입니다

06의 `<select>`와 같은 함정입니다. 주소는 글자일 뿐이라 `useParams()`로 꺼낸 값은 **항상 문자열**(`'12'`)이고, `projects`의 `id`는 숫자(`12`)입니다. `'12' === 12`는 `false`라서 `find`가 `undefined`를 돌려줍니다 — 모든 상세 페이지가 "찾을 수 없습니다"면 이것부터 의심하세요. 한쪽으로 맞춥니다: `Number(projectId)` 또는 `String(project.id)`.

- `Number('abc')`는 `NaN`이고, `NaN`은 **어떤 값과도 `===`가 아닙니다**(자기 자신과도). 그러니 `/projects/abc`는 자연스럽게 "찾을 수 없음"이 됩니다.

### `useSearchParams` — `?` 뒤를 state처럼

```js
const [searchParams, setSearchParams] = useSearchParams()

searchParams.get('sort')           // '?sort=new' → 'new',  쿼리에 없으면 null
setSearchParams({ sort: 'old' })   // 주소가 ?sort=old 로 바뀐다 (쿼리 전체를 이 객체로 교체)
setSearchParams({})                // 쿼리를 전부 지운다 → 주소 끝에 ? 없음
```

- 모양이 `useState`와 같습니다: `[읽는 값, 바꾸는 함수]`. 바꾸는 함수를 부르면 **주소가 바뀌고**, 주소가 바뀌면 그 주소를 읽는 컴포넌트가 다시 렌더됩니다. `setSearchParams`는 `Link` 클릭처럼 주소를 바꿉니다.
- `get`은 값이 **없으면 `null`**, 있으면 **문자열**입니다. `?status=foo`처럼 이상한 값이 와도 그대로 `'foo'`가 나옵니다. 주소창은 사용자가 아무거나 칠 수 있는 입력창이라고 생각하세요.

### `useNavigate` — 코드에서 이동

```js
const navigate = useNavigate()     // 컴포넌트 최상위에서 (훅 규칙)

function handleLogout() {
  logout()
  navigate('/login')                     // 새 기록을 쌓으며 이동 (브라우저 뒤로 → 이전 주소)
  // navigate('/login', { replace: true }) — 지금 기록을 새 주소로 **덮어씀** (쌓지 않음)
}
```

- 누를 링크가 있으면 `Link`, "무슨 일이 **끝난 뒤** 이동"이면 `navigate`입니다. 렌더 중에 `navigate()`를 부르지 않습니다(04의 "렌더 중 즉시 실행" 함정과 같음). 렌더 중 이동이 필요하면 `<Navigate />`를 그립니다.

### `Outlet`의 `context` — 레이아웃에서 페이지로 값 내리기

```jsx
// 레이아웃
<Outlet context={{ posts, onLike }} />

// 그 Outlet에 그려지는 페이지 어디서든
const { posts, onLike } = useOutletContext()
```

- **넣은 값이 모양 그대로 나옵니다.** 객체를 넣었으면 객체가, 배열을 넣었으면 배열이 나옵니다. 06의 Context `value`와 같은 규칙 — "보내는 쪽 모양 = 받는 쪽 모양".
- 06의 Context를 레이아웃과 그 바로 아래 페이지 사이로 좁힌 도구라고 보면 됩니다. Provider 파일을 따로 만들 필요가 없습니다.

## 요구사항

### Part A — 라우트 뼈대 (40분)

1. **라우트** — `App.jsx`에 `BrowserRouter` · `Routes` · `Route`를 둡니다. (`main.jsx`는 스타터 미리보기 도구라 건드리지 않습니다.)

   | 주소 | 화면 |
   |---|---|
   | `/` | `/projects`로 이동. **주소창도 `/projects`로 바뀌어야** 합니다 |
   | `/projects` | `ProjectsPage` |
   | `/projects/:projectId` | `ProjectDetailPage` |
   | `/about` | `AboutPage` |
   | 그 밖의 모든 주소 | `NotFoundPage` |

   모든 화면은 `Layout` 안에 그려집니다 — 404 화면에도 헤더가 보여야 합니다. 페이지마다 헤더를 따로 그리지 않습니다.

2. **`Layout`** — `<main>` 안의 `<ProjectsPage />`를 `<Outlet />`으로 바꿉니다. 내비 두 개는 `NavLink`, 브랜드 「Project Hub」는 `/`로 가는 `Link`.

3. **`ProjectsPage` · `ProjectCard`** — `projects`를 import해서 카드를 그립니다. 카드 제목은 그 프로젝트의 상세로 가는 `Link`. 배지는 `statusInfo`로. **탭은 Part B까지 정적인 채로 둡니다.**

4. **`ProjectDetailPage`**
   - `useParams`로 `projectId`를 꺼내 `projects`에서 찾습니다. 없으면 「프로젝트를 찾을 수 없습니다. (id: …)」 — `…`에는 **주소에 적힌 그대로**(`abc`면 `abc`).
   - 제목 · 배지 · 설명 · 마감 · 태그(없으면 `tag-list`째 안 그림) · 참여자(없으면 「참여자 없음」).
   - 「← 이전 프로젝트」「다음 프로젝트 →」: **배열 순서 기준**으로 앞뒤 프로젝트의 상세로 가는 `Link`. 첫 프로젝트는 「이전」이, 끝 프로젝트는 「다음」이 `<button disabled>`. `id`가 1씩 늘지 않으니 `id + 1`로는 안 됩니다.
   - 「← 목록으로」는 `/projects`로 가는 `Link`.
   - 「삭제」와 `CommentBox`는 Part C까지 그대로 둡니다.

5. **`NotFoundPage`** — 「처음으로」를 `Link`로.

6. 끝나면 `src/components/exercises/07/`에 `<a `가 하나도 남지 않습니다.

7. **실험 A (주소 → 화면)** — 아래 주소를 **주소창에 직접 쳐서** 들어갑니다. 먼저 **예측**을 적고, 그다음 실행 결과를 적습니다. 화면은 `목록` / `상세` / `상세-없음`(「프로젝트를 찾을 수 없습니다」) / `404`(「페이지를 찾을 수 없습니다」) / `소개` 중 하나.

   | 주소 | 예측 | 실제 | 주소창 최종 |
   |---|---|---|---|
   | `/` | | | |
   | `/projects/23` | | | |
   | `/projects/abc` | | | |
   | `/projects/23/edit` | | | |
   | `/project` | | | |

8. 여기까지 Claude가 커밋: `feat(07): Part A - 라우트 · 레이아웃 · 목록 · 상세`.

### Part B — URL이 state다 (35분)

같은 기능(상태 탭)을 **두 번** 만들어서 나란히 잽니다. 06의 실험 A(props) → B(Context)와 같은 구조입니다.

9. **B-1: `useState` 버전** — `ProjectsPage`에 `useState('all')`로 고른 탭을 둡니다. 탭 숫자는 상태별 프로젝트 수(`전체 7 · 진행 중 3 · 지연 2 · 완료 2`), 고른 탭의 카드만 보이고, 0장이면 「이 상태의 프로젝트가 없습니다」. **탭 숫자와 걸러진 목록은 state가 아닙니다**(렌더 중 계산).

10. **실험 B-1** — 각 조작 뒤에 **「지연」 탭이 골라진 채로 남아 있나**(O/X)를 **예측 먼저** 적고, 실행해서 적습니다. 매번 `/projects`에서 「지연」을 누른 상태로 시작합니다.

    | 조작 | 예측 | 실제 |
    |---|---|---|
    | ① 새로고침(F5) | | |
    | ② 카드 제목을 눌러 상세로 → 브라우저 **뒤로** | | |
    | ③ 주소창의 주소를 복사 → 새 탭에 붙여 넣기 | | |
    | ④ 「완료」 탭 클릭 → 브라우저 **뒤로** (「지연」으로 돌아오나?) | | |

    Claude가 커밋: `feat(07): Part B-1 - 상태 탭 (useState)`.

11. **B-2: URL 버전** — `useState`를 지우고 `useSearchParams`로 바꿉니다.
    - 「지연」을 누르면 주소가 `/projects?status=delayed`. 「전체」는 **쿼리 없음**(`/projects`, `?status=all` 아님).
    - `/projects?status=foo`처럼 모르는 값이면 「전체」로 취급합니다 — 카드 7장, 「전체」 탭 활성.
    - 끝나면 `ProjectsPage`에 `useState`가 **없습니다**. 주소에서 읽은 값을 `useState`에 한 번 더 담아 두면 06의 `BoardHeader`, 05의 `activeTabId`와 같은 상황(한 정보가 두 곳에)이 됩니다.

12. **실험 B-2** — 실험 B-1의 네 조작을 그대로. 예측 먼저 → 실행 → B-1 표 옆에 나란히.

    Claude가 커밋: `feat(07): Part B-2 - 상태 탭을 URL로`.

### Part C — 페이지가 바뀔 때 state는 (50분)

13. **`CommentBox`** — 입력창을 제어 컴포넌트(`value` + `onChange`)로, 아래 글자 수를 `n / 200`으로. 초안은 `CommentBox`의 `useState`. 그리고 `useRenderCount('CommentBox')`를 붙입니다.

14. **실험 C-1 (param만 바뀔 때)**
    - 절차: `/projects/12`에서 새로고침 → 댓글 입력창에 `안녕` 입력 → 콘솔 **지우기** → 「다음 프로젝트 →」 **한 번** 클릭.
    - **예측 먼저**: (가) `/projects/15`의 입력창에 `안녕`이 남아 있나? (나) 새로 찍힌 `[render] CommentBox N회`의 N이 **이어지나**(입력할 때 찍힌 숫자 다음), **1회부터 다시** 시작하나?
    - 실행 → 기록. 이번엔 06과 달리 **N값을 봅니다.** 05에서 구분한 "리렌더"와 "마운트"가 N에서 어떻게 달라 보이는지 떠올리세요.

15. **고치기** — 다른 프로젝트로 넘어가면 입력창이 비어야 합니다(`0 / 200`). 조건:
    - `CommentBox`에 `useEffect`가 없습니다.
    - 같은 프로젝트에 머무는 동안(예: 입력 중) 초안은 그대로입니다.
    - 고친 뒤 실험 C-1을 똑같이 다시 해서 (가)·(나)를 기록합니다.

    Claude가 커밋: `feat(07): Part C-1 - 프로젝트마다 댓글 초안 비우기`.

16. **삭제** — 이제 `projects`가 **바뀌는 값**이 됩니다. 06의 기준("정적 데이터는 import, 공유되고 바뀌는 값은 위에 둔다")을 적용합니다.
    - `projects`를 `Layout`의 `useState`로 옮기고, `<Outlet context={…}>`로 페이지에 내립니다. 페이지는 `useOutletContext()`로 꺼냅니다.
    - **`setProjects`는 `Layout` 밖으로 나가지 않습니다.** 06에서 `dispatch`를 `App` 밖으로 안 내보냈던 것처럼, 페이지에는 "무슨 일이 일어났는가"만 받는 함수(`onDelete(id)` 같은)를 내립니다. 06 질문 2의 `cards_set`을 떠올리세요.
    - 끝나면 `data/projects.js`에서 **`projects`를 import하는 파일은 `Layout.jsx` 하나**입니다(`statusInfo`는 어디서든 import해도 됩니다).
    - 상세의 「삭제」 → 그 프로젝트를 지우고 `/projects`로 이동. 이전/다음·「찾을 수 없음」도 이제 지워진 뒤의 목록 기준입니다.
    - **Outlet context 대조** — `Layout`의 `<Outlet context=` 줄, 그리고 `useOutletContext()`를 부르는 **모든** 줄을 파일 이름과 함께 복사해서 보고에 붙입니다. 06의 prop 대조표와 같은 장치입니다 — 판단하지 말고 복사만.

      ```
      Layout.jsx             <Outlet context={…} />
      ProjectsPage.jsx       const … = useOutletContext();
      ```

17. **실험 C-2 (replace)** — 처음엔 `navigate('/projects')`(**`replace` 없이**)로 만듭니다.
    - 절차: 새로고침 → 헤더 「소개」 → 「프로젝트」 → 「결제 페이지 리뉴얼」 제목 클릭 → 「삭제」 → 브라우저 **뒤로** 한 번.
    - **예측 먼저**: 뒤로 한 번 누르면 어떤 화면? 그 화면의 주소는?
    - 실행 → 기록. 그다음 `{ replace: true }`를 붙이고 **새로고침으로 데이터를 되살린 뒤** 같은 절차 → 기록.

    Claude가 커밋: `feat(07): Part C-2 - 삭제 · useNavigate`.

18. **실험 C-3 (무엇이 살아남나)** — 아무 프로젝트 하나를 지운 상태에서 시작합니다. 각 조작 뒤 **지운 프로젝트가 계속 없나**(O/X). 예측 먼저.

    | 조작 | 예측 | 실제 |
    |---|---|---|
    | ① 헤더 「소개」 → 「프로젝트」 (`NavLink` 두 번) | | |
    | ② 새로고침(F5) | | |
    | ③ 헤더 「소개」를 **잠깐** `<a className="nav-link" href="/about">`로 바꾸고 클릭 → 「프로젝트」 | | |

    ③이 끝나면 `NavLink`로 **되돌리고** `git status`가 깨끗한지 확인합니다. 실험 B-2의 ①(새로고침)과 비교해 보세요 — 같은 새로고침인데 결과가 다릅니다.

## 완성 조건

각 항목에 확인 방법을 적어 뒀습니다. **브라우저와 터미널에서 그대로 해 보고** 체크하세요. 못 한 항목은 비워 두고 보고하면 됩니다.

- [ ] 주소대로 화면이 나온다 — *확인: 실험 A 표의 "실제"가 요구 1의 표와 맞는다. `/`로 들어가면 주소창이 `/projects`*
- [ ] 헤더가 모든 화면에 한 번씩만 있다 — *확인: `/nope`에도 헤더가 보인다. 페이지 파일(`ProjectsPage`·`ProjectDetailPage`·`AboutPage`·`NotFoundPage`)에 `className="header"`가 없다*
- [ ] 내비 활성 표시가 된다 — *확인: `/projects/23`에서도 「프로젝트」가 활성, `/about`에서 「소개」만 활성. `Layout.jsx`에 `active`라는 글자가 없다 (NavLink가 알아서 붙인다)*
- [ ] `<a `가 없다 — *확인: `src/components/exercises/07/` 전체에서 `<a ` 검색 → 0개*
- [ ] 상세가 된다 — *확인: `/projects/12`는 「← 이전」이 회색, 「다음 →」 → `/projects/15`(13 아님). `/projects/41`은 「다음 →」이 회색. `/projects/41`에 「참여자 없음」, 태그 없음. `/projects/abc` → 「프로젝트를 찾을 수 없습니다. (id: abc)」*
- [ ] 탭이 주소에 있다 — *확인: 「지연」 → 주소 `/projects?status=delayed` · 카드 2장 · 탭 숫자 `7 · 3 · 2 · 2`. 「전체」 → 주소 `/projects`(물음표 없음). `/projects?status=foo` → 카드 7장, 「전체」 활성*
- [ ] 같은 정보가 두 곳에 없다 — *확인: `ProjectsPage.jsx`에 `useState`가 없다*
- [ ] 초안이 프로젝트를 따라가지 않는다 — *확인: `/projects/12`에서 입력 → 「다음 →」 → 빈 입력창 · `0 / 200`. `CommentBox.jsx`에 `useEffect`가 없다*
- [ ] 삭제가 된다 — *확인: 새로고침 → 「결제 페이지 리뉴얼」 삭제 → 목록 6장, 「지연」 탭 숫자 `1`. 이어서 브라우저 뒤로 → 「프로젝트를 찾을 수 없습니다」가 **뜨지 않는다***
- [ ] 이전/다음이 삭제를 따라간다 — *확인: 새로고침 → `/projects/15` 삭제 → `/projects/12` → 「다음 →」 → `/projects/21`*
- [ ] 데이터가 한 곳에서 내려온다 — *확인: `data/projects`를 검색 → 나오는 import 줄 중 중괄호 안에 `projects`가 있는 건 `Layout.jsx`뿐(`statusInfo`만 가져오는 줄은 괜찮음). `setProjects`를 검색하면 `Layout.jsx`뿐*
- [ ] 스타터에 없는 태그·className·CSS를 새로 만들지 않았고, `ui/`·`data/`는 수정하지 않았다 — *확인: `git diff --stat <07 출제 커밋>..HEAD`에 `src/styles/`·`src/components/ui/`·`src/data/`가 없다 (출제 커밋 해시는 `git log --oneline`의 `docs: 07 …` 줄)*
- [ ] `npm run lint` 경고 없음, 콘솔에 React·React Router 경고 없음 — *확인: **`npm run lint`를 직접 실행하고 출력의 마지막 줄을 완료 보고에 그대로 붙여 넣으세요.** 붙여 넣은 줄이 없으면 이 항목은 체크되지 않은 것으로 봅니다*

## 생각해볼 질문 (완료 보고 때 답변)

1. 실험 A에서 `/projects/abc`는 `상세-없음`이었고 `/projects/23/edit`는 `404`였을 겁니다. 둘 다 "없는 것"인데 **누가**(라우터인지 페이지 컴포넌트인지) **무엇을 보고** 판단했나요? `path="*"`가 `/projects/abc`를 잡지 못하는 이유는요?
2. 실험 B-1과 B-2 표를 나란히 놓고 — B-1의 ②(상세 갔다 뒤로)에서 탭이 풀렸다면, 그때 `ProjectsPage`에게 무슨 일이 일어났나요? "이 값은 URL에 / 이 값은 `useState`에"를 가르는 기준을 한 줄로 적고, 그 기준으로 **댓글 초안은 왜 URL에 안 넣는지**도 답해 보세요. 마지막으로 — B-2에서 `const [status, setStatus] = useState(searchParams.get('status'))`처럼 주소 값을 `useState`에 복사해 두면 **어떤 조작 순서**에서 탭 표시와 주소가 어긋나나요? 재현 절차를 적으세요.
3. 실험 C-1의 (나) N값을 근거로 — 고치기 전에 초안이 따라온 이유는요? 고친 방법이 왜 통하나요? 00에서 index를 `key`로 쓰면 선택이 엉뚱한 카드에 붙는다고 했던 것과 **같은 원리**인지, 다르다면 무엇이 다른지. 그리고 `useEffect(() => setDraft(''), [projectId])`로 고쳤다면 무엇이 나빴을까요? (힌트 아님, JS 동작: effect는 화면을 그린 **뒤에** 실행됩니다.)
4. 실험 C-2에서 `replace` 없이 뒤로 갔을 때 본 화면과, `replace`를 붙인 뒤의 화면 — 브라우저 기록(방문 목록)이 어떻게 쌓였길래 그렇게 됐는지 그림(`[/about, /projects, …]`)으로 적어 보세요. 그리고 `navigate`를 `Layout`의 `onDelete` 안에서 부르지 않고 **상세 페이지의 버튼 핸들러**에서 부른 이유는요? (나중에 목록 카드에도 「삭제」가 생긴다면?)
5. 실험 C-3과 B-2를 합쳐서, 이번 실습의 세 값 — **탭 필터 · 삭제 결과 · 댓글 초안** — 이 각각 **어디에 살고**, **무엇을 하면 사라지는지** 표로 정리해 보세요. `Link`와 `<a>`의 차이가 여기서 어떻게 드러났나요? 마지막으로 — `projects`를 06처럼 Context가 아니라 `Layout` + `Outlet context`로 충분했던 이유는요? 03의 "공통 부모" 기준으로 `Layout`이 이 자리에 맞는 이유(페이지 컴포넌트와 무엇이 다른지)를 한 줄로. 새로고침해도 삭제가 유지되게 하려면 데이터가 어디 있어야 할까요? (답만 — 08에서 다룹니다.)

## 참고 문서

- 설치 · 라우팅 (Declarative mode): https://reactrouter.com/start/declarative/routing
- 이동 (`Link` · `NavLink` · `useNavigate`): https://reactrouter.com/start/declarative/navigating
- URL 값 (`useParams` · `useSearchParams`): https://reactrouter.com/start/declarative/url-values
- `Outlet` / `useOutletContext`: https://reactrouter.com/api/hooks/useOutletContext
- state 보존과 초기화 (`key`로 리셋): https://react.dev/learn/preserving-and-resetting-state

로컬에도 문서가 있습니다: `node_modules/react-router/docs/start/declarative/`.

## 완료 방법

파트가 끝날 때마다 Claude에게 알리면 Claude가 커밋·푸시합니다 (요구 8·10·12·15·17의 메시지). 마지막에 "07 완료" + 실험 A 표 + 실험 B-1·B-2 표 + 실험 C-1(고치기 전/후) · C-2(`replace` 전/후) · C-3 표 + **Outlet context 대조** + 질문 5개 답변 + **`npm run lint` 출력 마지막 줄**.

파트 중간에 막히면 "07 Part B 막힘" 처럼 파트를 붙여서 물어보세요.
