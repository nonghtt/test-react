# components 폴더 규칙

## ui/

**범용 부품.** 도메인 지식이 없고 props만으로 동작해서 다른 실습 화면에 그대로 가져다 쓸 수 있는 것.

| 컴포넌트 | 받는 것 | 그리는 것 |
|---|---|---|
| `Badge` | `tone`, `children` | `badge` (+ 색 변형) |
| `Section` | `title`, `count`, `children` | `section` 껍데기 + 제목·개수 |
| `BottomText` | `children` | `empty` 상자 |
| `Tab` | `tabs`, `activeTabId`, `handleTabBtnClick` | `tabs` + `tab active` |
| `AvatarGroup` | `members` | `avatar-group` (비면 아무것도 안 그림) |

여기 있는 컴포넌트가 특정 화면의 데이터 모양(`menu.price`, `todo.done` 같은 것)을 알게 되면 그건 `ui/`에 있을 자격을 잃은 것이다. 01에서 `Badge`가 프로젝트 status를 알아서 문제가 됐던 경우가 그것.

## exercises/NN/

**그 실습에서만 쓴 컴포넌트.** 특정 데이터 모양과 화면에 묶여 있어 재사용 대상이 아니다. 지난 실습 코드를 지우지 않고 남겨 두는 보관 장소이기도 하다.

- `00/` MemberCard
- `01/` ProjectCard
- `02/` Card, CartItems, Form, MenuAlert
- `03/` InputForm, TodoList, TodoItem

## 새 실습을 시작할 때

`App.jsx`는 새 실습 화면으로 교체하고, 새로 만드는 컴포넌트는 `exercises/NN/`에 둔다. 만들다 보니 도메인 지식이 없는 부품이 나왔다면 `ui/`로 올리고, 이미 `ui/`에 있는 것은 수정하지 않고 그대로 쓴다.
