/**
 * Created by jimersylee on 17-7-24.
 * 对于cookie的操作
 */

/**
 * 设置cookie
 * @param name
 * @param value
 * @param expireDays
 */
export function setCookie (name, value, expireDays) {
  let time = new Date()
  time.setTime(time.getTime() + expireDays * 24 * 3600 * 1000)
  let expires = 'expires=' + time.toGmtString()
  document.cookie = name + '=' + value + ';' + expires
}

/**
 * 获取cookie值
 * @param name
 * @returns {*}
 */
export function getCookie (name) {
  const cookieName = name + '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim()
    if (cookie.indexOf(cookieName) === 0) {
      // 找到此cookie
      return {
        success: true,
        cookie: {
          name,
          value: cookies.split(cookieName)[1]
        }
      }
    } else {
      // 没有找到此cookie
      return {
        success: false,
        cookie: {
          name,
          value: undefined
        }
      }
    }
  }
}

/**
 * 功能: 删除cookie
 * 实现: 将cookie设置为过期时间
 * @param name
 */
export function deleteCookie (name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}
