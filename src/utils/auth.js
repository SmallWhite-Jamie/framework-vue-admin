import Cookies from 'js-cookie'

const TokenName = 'TOKEN-NAME'

export function setTokenName(tokenName) {
  if (tokenName) {
    Cookies.set(TokenName, tokenName)
  } else {
    Cookies.set(TokenName, 'X-TOKEN')
  }
}

export function getToken() {
  return Cookies.get(Cookies.get(TokenName) || 'X-TOKEN')
}

export function getTokenName() {
  return Cookies.get(TokenName) || 'X-TOKEN'
}

export function setToken(token) {
  Cookies.set(Cookies.get(TokenName) || 'X-TOKEN', token)
}

export function removeToken() {
  Cookies.remove(TokenName)
  Cookies.remove(Cookies.get(TokenName) || 'X-TOKEN')
}
