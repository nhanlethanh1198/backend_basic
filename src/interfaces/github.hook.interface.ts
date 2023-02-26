// Create a interface to filter necessary keys from webhook data

export interface WorkflowJob {
  workflow_name?: string
  head_branch?: string
  status?: string

  check_run_url?: string
  created_at?: Date | string
  started_at?: Date | string
  completed_at?: Date | string

  [key: string]: any
}

export interface Repository {
  full_name?: string
  private?: boolean | string
  html_url?: string
  [key: string]: any

}

export interface GithubHookInterface {
  action: string
  workflow_job?: WorkflowJob
  repository?: Repository
  [key: string]: any

}