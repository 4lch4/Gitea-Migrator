import { logger } from '@4lch4/logger'
import { config } from 'dotenv'
import { join } from 'path'
import { IAppConfig } from '../interfaces'

export function getAppConfig(): IAppConfig {
  const dotEnvPath = join(__dirname, '..', '..', '.env')

  logger.debug(`Loading environment variables...`)
  logger.debug(`dotEnvPath = ${dotEnvPath}`)

  config({ path: dotEnvPath })

  return {
    gitea: {
      url: process.env.GITEA_API_BASE_URL || '',
      token: process.env.GITEA_API_TOKEN ||'',
      username: process.env.GITEA_API_USERNAME ||'',
      password: process.env.GITEA_API_PASSWORD ||''
    },
    github: {
      url: process.env.GH_API_BASE_URL || '',
      token: process.env.GH_API_TOKEN || '',
      username: process.env.GH_API_USERNAME || '',
    }
  }
}
