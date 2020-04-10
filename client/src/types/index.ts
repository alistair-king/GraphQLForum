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
  author?: IUser
}

export interface IThread {
  id: number
  when: Date
  title: string
  content: string
  author: IUser
  replies: IReply[]
  lastReply?: {
    reply?: IReply
    count: number
  }
}

export interface IThreads {
  items: IThread[]
  count: number
}

export interface IForum {
  id: number
  name: string
  threads: IThreads
}

