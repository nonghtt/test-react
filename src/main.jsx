import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/ui.css'
import App from './App.jsx'

// 스타터 미리보기: http://localhost:5173/?starter=00 으로 열면 App 대신
// src/starters/Starter00.jsx 를 렌더링한다. 실습 코드와 무관한 도구이므로 수정할 필요 없음.
const starters = import.meta.glob('./starters/Starter*.jsx')

async function pickRoot() {
  const id = new URLSearchParams(location.search).get('starter')
  if (id === null) return App

  const load = starters[`./starters/Starter${id}.jsx`]
  if (load) return (await load()).default

  const available = Object.keys(starters).map((path) => path.match(/Starter(.+)\.jsx$/)[1])
  return () => (
    <div className="container stack">
      <div className="alert alert-error">스타터 "{id}"를 찾을 수 없습니다.</div>
      <p className="muted">사용 가능: {available.join(', ') || '없음'}</p>
    </div>
  )
}

const Root = await pickRoot()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
