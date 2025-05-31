type CustomResponseType = 'ok-single-item' | 'errores' | 'validaciones';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  total?: number;
  lastPage?: number;
  prevPage?: number | null;
  nextPage?: number | null;
  perPage?: number;
  page?: number;
  from?: number;
  to?: number;
};

type ResponseCreator<T> = (payload?: T) => ApiResponse<T>;

const responseCreators: Record<CustomResponseType, ResponseCreator<any>> = {
  'ok-single-item': <T>(payload?: T) => ({
    success: true,
    data: payload!,
  }),


  errores: (payload?: string) => ({
    success: false,
    message: payload || '',
  }),

  validaciones: (payload?: string[]) => ({
    success: false,
    message: payload || [],
  }),
};

export function createResponse<T, U extends CustomResponseType>(type: U, payload?: T): ApiResponse<T> {
  const creator = responseCreators[type] as ResponseCreator<T>;

  return creator(payload);
}