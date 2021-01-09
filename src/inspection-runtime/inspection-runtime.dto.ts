export enum RunStatusType {
  stop = '0',
  pause = '1',
  resume = '2'
}
export interface IInspectionStatusPayload {
  id?: string,
  saved_checklist?: { id: string },
  run_status: any
}