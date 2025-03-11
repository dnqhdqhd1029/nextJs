export const base64Code = {
  encode: (str: string) => {
    // Encode the string to Base64 and make it URL-safe
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  },
  decode: (str: string) => {
    // Convert URL-safe Base64 back to the original Base64 format before decoding
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    return decodeURIComponent(escape(window.atob(base64)))
  },
}

export const setObjectToBase64 = (str: object) => {
  try {
    return base64Code.encode(JSON.stringify(str))
  } catch (e) {
    return ''
  }
}

export const getObjectFromBase64 = (str: string) => {
  try {
    return JSON.parse(base64Code.decode(str))
  } catch (e) {
    return {}
  }
}
