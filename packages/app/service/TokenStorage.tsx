import { TokensApi } from 'app/model/auth/TokenDto'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const setToken = async ({ token, refreshToken }: TokensApi) => {
  await AsyncStorage.setItem(TOKEN, token ?? '')
  await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken ?? '')
  return { token, refreshToken } as TokensApi
}

export const getToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN)
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN)
  return {
    token: token && token.length > 0 ? token : null,
    refreshToken: refreshToken && refreshToken.length > 0 ? refreshToken : null,
  }
}

const TOKEN = 'token'
const REFRESH_TOKEN = 'refreshtoken'
