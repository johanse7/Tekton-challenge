export const createMockQuery = <T>(overrides?: Partial<any>): any => ({
  data: undefined as unknown as T,
  error: null,
  isLoading: false,
  isFetching: false,
  isError: false,
  isSuccess: false,
  status: "idle",
  failureCount: 0,
  ...overrides,
});
