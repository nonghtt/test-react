export type Member = {
  id: number
  name: string
  role: string
  avatar: string
  online: boolean
}

export const members: Member[] = [
  { id: 1, name: '김하늘', role: '프론트엔드', avatar: 'https://i.pravatar.cc/80?img=1', online: true },
  { id: 2, name: '이준서', role: '백엔드', avatar: 'https://i.pravatar.cc/80?img=12', online: false },
  { id: 3, name: '박서연', role: '디자이너', avatar: 'https://i.pravatar.cc/80?img=5', online: true },
  { id: 4, name: '최민준', role: 'PM', avatar: 'https://i.pravatar.cc/80?img=8', online: false },
  { id: 5, name: '정유진', role: 'QA', avatar: 'https://i.pravatar.cc/80?img=9', online: true },
]
