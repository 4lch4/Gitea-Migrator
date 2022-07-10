export interface IMigrateRepoRequest {
  auth_token: string
  auth_username: string
  clone_addr: string
  description: string
  issues: boolean
  labels: boolean
  milestones: boolean
  private: boolean
  pull_requests: boolean
  releases: boolean
  repo_name: string
  repo_owner: string
  service: string
  wiki: boolean
}