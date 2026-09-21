// 04 실습용 가짜 API. 실제 네트워크 없이 setTimeout으로 서버 응답을 흉내 낸다.
// 이 파일은 수정하지 마세요. 아래 두 가지가 실습의 전제입니다.
//
//   1. 검색어가 짧을수록 응답이 느리게 옵니다 → 경쟁 상태(늦게 도착한 옛 응답이
//      화면을 덮는 현상)를 눈으로 볼 수 있습니다.
//   2. 검색어에 "에러"가 들어가면 실패를 돌려줍니다 → 에러 화면과 「다시 시도」를
//      확인할 수 있습니다.
//
// 요청·응답·취소를 콘솔에 [api] 로 찍습니다. 이건 일부러 찍는 로그입니다.
import { books } from '../data/books'

function delayFor(keyword) {
  return Math.max(200, 1400 - keyword.length * 200)
}

export function fetchBooks(query = '', { signal } = {}) {
  const keyword = query.trim()
  const ms = delayFor(keyword)

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    console.log(`[api] 요청 시작: "${keyword}" (${ms}ms 뒤 응답)`)

    const timer = setTimeout(() => {
      if (keyword.includes('에러')) {
        console.log(`[api] 응답 실패: "${keyword}"`)
        reject(new Error('책 목록을 불러오지 못했습니다'))
        return
      }

      const result = books.filter(
        (book) => book.title.includes(keyword) || book.author.includes(keyword),
      )
      console.log(`[api] 응답 도착: "${keyword}" → ${result.length}권`)
      resolve(result)
    }, ms)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      console.log(`[api] 요청 취소: "${keyword}"`)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}
