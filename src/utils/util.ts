/**
 * 验证邮箱是否正确
 * @param email
 */
import { StorageType } from '@/utils/constans';

export function validateEmail(email: string) {
  const REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return REG.test(email);
}

/**
 * 存储数据到localstorage或者sessionStorage
 * @param type
 * @param key
 * @param value
 */
export function setStorage(
  key: string,
  value: string,
  type = StorageType.localStorage,
) {
  if (type === StorageType.localStorage) {
    console.log(1);
    window.localStorage.setItem(key, value);
  }
  if (type === StorageType.sessionStorage) {
    console.log(2);
    window.sessionStorage.setItem(key, value);
  }
  if (type === StorageType.both) {
    console.log(3);
    window.localStorage.setItem(key, value);
    window.sessionStorage.setItem(key, value);
  }
}

/**
 * 获取storage里面的数据
 * @param type
 * @param key
 */
export function getStorage(key: string, type = StorageType.oneOf) {
  if (type === StorageType.localStorage) {
    return window.localStorage.getItem(key);
  }
  if (type === StorageType.sessionStorage) {
    return window.sessionStorage.getItem(key);
  }
  if (type === StorageType.both) {
    return {
      localStorage: window.localStorage.getItem(key),
      sessionStorage: window.sessionStorage.getItem(key),
    };
  }
  if (type === StorageType.oneOf) {
    return window.localStorage.getItem(key) === null
      ? window.sessionStorage.getItem(key)
      : window.localStorage.getItem(key);
  }
}
/**
 * 清除storage里面的可以
 * @param key
 */
export function clearStorage(key: string) {
  window.localStorage.removeItem(key);
  window.sessionStorage.removeItem(key);
}
