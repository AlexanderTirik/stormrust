import { stringifyUrl, ParsedQuery } from 'query-string';
import { IFetchParams } from '../models/fetch/IFetchParams';
import { FetchMethod } from '../enums/FetchMethod';
import { getAccessToken, getRefreshToken, setTokens } from './storageHelper';
import { IResponseError } from '../models/fetch/IResponseError';
import { env } from '../../env';
import { ITokens } from '../models/fetch/ITokens';

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const token = getAccessToken();
  const headers: HeadersInit = new Headers();

  headers.set('Authorization', `Bearer ${token}`);
  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  return headers;
};

const getFetchUrl = (url: string, query: ParsedQuery) => stringifyUrl({ url, query }, { skipNull: true });

const getFetchOptions = (method: string, body?: IFetchParams) => ({
  method,
  headers: getInitHeaders(),
  body: body && JSON.stringify(body)
});

const parseResErrorBody = async (res: Response) => {
  try {
    const body = await res.text();
    return JSON.parse(body) as IResponseError;
  } catch (err) {
    return null;
  }
};

const throwIfResponseFailed = async (res: Response) => {
  if (res.ok) {
    return;
  }

  const body = await parseResErrorBody(res);

  if (!res.ok) {
    if (res.status === 401) {
      // logout();
      return;
    }
    const parsedException: IResponseError = body || {
      message: 'Something went wrong with request!',
      status: 500
    };
    throw parsedException;
  }
};

export const refreshToken = async () => {
  const url = `${env.urls.server}/api/auth/tokens`;
  const fetchOptions = {
    method: FetchMethod.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: getRefreshToken() })
  };
  const res = await fetch(url, fetchOptions);

  await throwIfResponseFailed(res);

  const tokens: ITokens = await res.json();

  setTokens(tokens);
};

const makeRequest = (method: FetchMethod) => async <T>(url: string, params?: IFetchParams) => {
  const domainUrl = `${env.urls.server}${url}`;
  const [fetchUrl, body] = method === FetchMethod.GET
    ? [getFetchUrl(domainUrl, params as ParsedQuery), undefined]
    : [url, params];
  const fetchOptions = getFetchOptions(method, body);

  let res = await fetch(fetchUrl, fetchOptions);

  if (res.status === 401 && getRefreshToken()) {
    await refreshToken();
    const newFetchOptions = getFetchOptions(method, body);
    res = await fetch(fetchUrl, newFetchOptions);
  }

  await throwIfResponseFailed(res);
  return (res.status === 200 ? res.json() : null) as Promise<T>;
};

const api = {
  get: makeRequest(FetchMethod.GET),
  post: makeRequest(FetchMethod.POST),
  put: makeRequest(FetchMethod.PUT),
  delete: makeRequest(FetchMethod.DELETE)
};

export default api;
