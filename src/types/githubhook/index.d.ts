// import { GithubHookInterface, Repository, WorkflowJob } from '@/interfaces/github.hook.interface'

export interface WorkflowJob {
  workflow_name: string
  head_branch: string
  status: string

  check_run_url: string
  created_at: Date | string
  started_at: Date | string
  completed_at: Date | string
}


export interface Repository {
  full_name: string
  private: boolean | string
  html_url: string
}


export interface TGithubhook {
  action: string
  workflow_job: WorkflowJob
  repository: Repository
}

// export type KeyMatching<T, V> = {[K in keyof T]: T[K] extends V ? K : never}[keyof T]
//
// // export class GithubHook<T extends TGithubhook> {
// //   // Create constructor with dynamic args
// //   constructor(args) {
// //     Object.assign(this, args)
// //   }
// // }
// export type TGithubHookFiltered = KeyMatching<TGithubhook, any>