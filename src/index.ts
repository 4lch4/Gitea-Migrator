import { logger } from '@4lch4/logger'
import Axios from 'axios'
import { IMigrateRepoRequest, IRepoData } from './interfaces'
import { getAppConfig, ReposData } from './lib'

const appConfig = getAppConfig()

// logger.debug('AppConfig...')
// logger.debug(JSON.stringify(appConfig, null, 2))
console.log('AppConfig...')
console.log(JSON.stringify(appConfig, null, 2))

const client = Axios.create({
  baseURL: appConfig.gitea.url,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `token ${appConfig.gitea.token}`
  }
})

async function migrateRepo(repo: IRepoData) {
  try {
    const privateVisibility = repo.visibility.includes('public') ? false : false

    console.log(
      `repo.visibility = ${repo.visibility}; privateVisibility = ${privateVisibility}`
    )

    const requestBody: IMigrateRepoRequest = {
      auth_token: appConfig.github.token,
      auth_username: appConfig.github.username,
      clone_addr: `https://github.com/4lch4/${repo.name}`,
      description: repo.description.replace(/"/g, '\\\\"'),
      issues: true,
      labels: true,
      milestones: true,
      private: privateVisibility,
      pull_requests: true,
      releases: true,
      repo_name: repo.name,
      repo_owner: '4lch4',
      service: 'github',
      wiki: true
    }

    // console.log('Logging requestBody just in case...')
    // console.log(JSON.stringify(requestBody, null, 2))

    const res = await client.post('/repos/migrate', requestBody)

    // @ts-ignore
    if (res.status && res.status[0] === 2) return res.data
    else return res
  } catch (error) {
    if (
      error &&
      // @ts-ignore
      error.response &&
      // @ts-ignore
      error.response.status &&
      // @ts-ignore
      error?.response?.status === 409
    ) {
      console.error('Conflict returned, continuing execution...')
    } else {
      console.error(error)
      throw error
    }
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main(): Promise<any> {
  try {
    console.log('Starting migration...')

    for (const repo of ReposData) {
      console.log(`Migrating ${repo.name} in 5s...`)

      // Sleep/wait 5 seconds before migrating each repo to allow for stopping
      // execution of the script without causing a conflict error.
      await sleep(5000)

      console.log('Beginning migration...')

      const result = await migrateRepo(repo)

      console.log(result)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

main()
  .then(res => {
    logger.success('Execution completed successfully')
    logger.success(JSON.stringify(res, null, 2))
  })
  .catch(err => {
    logger.error('Execution failed')
    logger.error(err)
    console.error(JSON.stringify(err, null, 2))
  })
