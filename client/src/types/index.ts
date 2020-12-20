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

export interface IReplies {
  items?: IReply[]
  count: number
}

export interface IThread {
  id: string
  when: Date
  title: string
  content: string
  author?: IUser
  forum?: IForum
  replies?: IReplies
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
  description?: string
  threads: IThreads
}

