export interface IVeriliveResult {
  session_id: string
  start_time: string
  end_time: string
  backend_version: string
  frontend_version: string
  status: string
  bestframe?: string
  reason?: string
}
