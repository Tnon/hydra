/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 12:16:46
 * @LastEditTime: 2022-04-20 19:37:07
 */
import { sha256 } from 'js-sha256';
export const pCompile = (code) => {
  const hash = sha256(code); //不知道对不对
  return hash;
};

export const compileStr = (code) => {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c;
};
