export interface APIResponse<T = any> {
  result: T;
}

export const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw Error('Request failed: ' + response.status);
  }
  return response;
};
