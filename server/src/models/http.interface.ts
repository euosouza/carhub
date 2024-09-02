export interface HttpResponse<T> {
  data: T;
  status: number;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export enum MessageError {
  ERROR_FINDALL_VEHICLES = "Não foi possível buscar os veículos.",
  ERROR_FINDONE_VEHICLE = "Não foi possível encontrar o veículo.",
  ERROR_DELETE_VEHICLES = "Não foi possível remover o veículo.",
  ERROR_UPDATE_VEHICLES = "Não foi possível alterar as propriedades do veículo.",
  ERROR_CREATE_VEHICLES = "Não foi possível criar o veículo.",
  ERROR_GENERIC = "Ocorreu um erro inesperado, tente novamente mais tarde!",
  ERROR_ID_NOT_FOUND = "Id não foi enviado na requisição.",
  ERROR_PROP_NOT_FOUND = "não foi enviado na requisição."
}
