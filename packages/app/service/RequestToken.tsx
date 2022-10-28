import axios from 'axios'

export const RequestToken = async (token: string | null, refreshToken: string | null) => {
  const tokens = await axios({
    method: 'POST',
    url: '',
    data: {
      token,
      refreshToken,
    },
  })
    .then((res) => res.data)
    .then((res) => {
      const token = res.data[0]
      return {
        token: token?.token as string,
        refreshToken: token?.refreshToken as string,
      }
    })
  return tokens
}
