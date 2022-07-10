export interface IAppConfig {
  gitea: {
    url: string
    token: string
    username?: string
    password?: string
  }

  github: {
    url: string
    token: string
    username: string
  }
}