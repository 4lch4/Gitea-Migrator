import { ReposData } from './Repos-Data'

export function getRepoNames(): string[] {
  const repos: string[] = []

  for (const repo of ReposData) {
    const repoName = repo.name.substring(repo.name.indexOf('/'))

    console.log(`repoName = ${repo.name.substring(repo.name.indexOf('/') + 1)}`)

    repos.push(repoName)
  }

  return repos
}
