import type { WorkflowTypes } from '@konfik-plugin/github'
import { GitHubWorkflowKonfik } from '@konfik-plugin/github'

type Steps = WorkflowTypes.NormalJob['steps']

const sharedSteps: Steps = [
  {
    uses: 'actions/checkout@v2',
    with: { 'fetch-depth': 0 },
  },
  {
    name: 'Use Node.js 16.x',
    uses: 'actions/setup-node@v2',
    with: { 'node-version': '16.x', cache: 'yarn' },
  },
  {
    name: 'Install dependencies',
    run: 'yarn install',
    env: { CI: true },
  },
]

export const main = GitHubWorkflowKonfik({
  name: 'Publish CI',
  on: { push: { branches: ['main'] } },
  jobs: {
    lint: {
      // TODO: fix inference
      'runs-on': 'ubuntu-latest',
      steps: [...sharedSteps, { run: 'yarn lint:check' }],
    },
  },
})
