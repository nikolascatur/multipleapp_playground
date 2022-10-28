import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Provider } from 'app/provider'
import Head from 'next/head'
import React, { useMemo } from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import { RequestProvider } from './../../../packages/app/service/FetchRequestApi'
import { getToken, setToken } from './../../../packages/app/service/TokenStorage'
import { RequestToken } from './../../../packages/app/service/RequestToken'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const [theme, setTheme] = useRootTheme()

  const contents = useMemo(() => {
    return <Component {...pageProps} />
  }, [pageProps])

  return (
    <>
      <RequestProvider
        nextUrl=""
        baseUrl=""
        getToken={getToken}
        setToken={async ({ refreshToken, token }) => {
          if (token && refreshToken) {
            setToken({ refreshToken, token })
          }
          return { token: null, refreshToken: null }
        }}
        onRefreshToken={() => setToken({ token: null, refreshToken: null })}
        requestNewToken={RequestToken}
      >
        <NextThemeProvider onChangeTheme={setTheme}>
          <Provider disableRootThemeClass defaultTheme={theme}>
            {contents}
          </Provider>
        </NextThemeProvider>
      </RequestProvider>
    </>
  )
}

export default MyApp
