export interface IStartLivenessSessionDTO {
  token: string // токен организации
  iin: string // иин пользователя, который проходит идентификацию
  livenessVendorName: string // поставщик проверки живости пользователя
  vendorParameters?: any
}

export interface IStartLivenessSessionResponse {
  clientId: 0
  vendorParameters: {
    access_token: string
  }
}
