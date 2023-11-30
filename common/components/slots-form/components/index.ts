/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 12:14:56
 * @LastEditTime: 2022-04-22 15:26:59
 */
const components = import.meta.globEager('./*.vue');
const modules = {};
Object.keys(components).forEach((path) => {
  const fileName = 'hooks-form-' + path.replace(/(.*\/)*([^.]+).*/gi, '$2');
  modules[fileName] = components[path].default;
});
export default modules;
