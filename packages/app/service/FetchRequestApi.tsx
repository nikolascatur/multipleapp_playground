import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react'
import { TokensApi } from 'app/model/auth/TokenDto'

type RequestOptions = Partial<AxiosRequestConfig> & {
  useAuth?: boolean
  uri: string
}

type ContextValue = {
  callRequest: <T>(opts: RequestOptions) => Promise<T | undefined>
}

type RequestProps = {
  baseUrl: string
  requestNewToken: (
    currentToken: string | null,
    currentRefreshToken: string | null
  ) => Promise<TokensApi>
  getToken: () => Promise<TokensApi>
  setToken: (tokens: TokensApi) => Promise<TokensApi>
  onRefreshToken: () => void
  children: ReactNode
}

const Context = createContext<ContextValue | undefined>(undefined)

const RequestProvider: FC<RequestProps> = ({
  baseUrl,
  requestNewToken,
  getToken,
  setToken,
  onRefreshToken,
  children,
}) => {
  async function callRequest<T>({
    url,
    uri,
    data,
    params,
    method = 'GET',
    useAuth = false,
  }: RequestOptions) {
    const _axios = axios.create()
    _axios.interceptors.request.use(
      async (config) => {
        const { token } = await getToken()
        config.headers = useAuth
          ? {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          : {
              'Content-Type': 'application/json',
            }
        return config
      },
      (error) => Promise.reject(error)
    )
    _axios.interceptors.request.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as RequestOptions
        if (error.response.status === 401 && useAuth) {
          const { token: currentToken, refreshToken: currentRefreshToken } = await getToken()
          try {
            const newToken = await requestNewToken(currentToken, currentRefreshToken)
            setToken(newToken)
            axios.defaults.headers.common.Authorization = `Bearer ${newToken.token}`
            return _axios(originalRequest)
          } catch {
            onRefreshToken()
          }
        }
        return Promise.reject(error)
      }
    )

    const res: AxiosResponse<T> = await _axios({
      url: url || baseUrl + uri,
      data,
      method,
      params,
    })
    return res.data
  }
  const valueData = useMemo(() => ({ callRequest }), [callRequest])
  return <Context.Provider value={valueData}>{children}</Context.Provider>
}

const useFetchRefresh = () => useContext(Context) as ContextValue

export { RequestProvider, useFetchRefresh }
