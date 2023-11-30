const components = import.meta.globEager('./*/*.vue');
const modules = {};
Object.keys(components).forEach((path) => {
  // const fileName = path.replace(/(.*\/)*([^.]+).*/ig, "$2")
  const fileName = path.split('/')[1];
  modules[fileName] = components[path].default;
});
export default modules;
