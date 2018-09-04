import exportModules from '../exportModules';
const requireModule = require.context('.', true, /^((?!\.unit\.).)*\.js$/);

export default exportModules(requireModule);