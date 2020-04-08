export interface IUser {
  id: string
  name: string
  email: string
  password: string
}

export interface IReply {
  id: number
  when: Date
  content: string  
}

export interface IThread {
  id: number
  when: Date
  title: string
  content: string
  author: IUser
  replies: IReply[]
}

export interface IForum {
  id: number
  name: string
  threads: IThread[]
}

