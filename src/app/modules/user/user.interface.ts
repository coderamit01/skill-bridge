export interface IRegisterPayload {
  [x: string]: any
  name: string,
  email: string,
  password: string,
  role?: string
}
export interface ILoginPayload {
  email: string,
  password: string
}

export interface IUpdateStatus {
  isBanned: boolean
}

