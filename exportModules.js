import camelCase from 'lodash/camelCase';

function getNamespace(subtree, path) {
    if (path.length === 1) {
        return subtree;
    }
    
    const namespace = path.shift();
    subtree.modules[namespace] = {modules: {}, ...subtree.modules[namespace]};
    return getNamespace(subtree.modules[namespace], path);
}

function exportModules(requireModule) {
    const root = {modules: {}};
    
    requireModule.keys().forEach(fileName => {
        if (fileName === './index.js') {
            return;
        }
        
        const modulePath = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '').split(/\//).map(camelCase);
        const {modules} = getNamespace(root, modulePath);
        
        modules[modulePath.pop()] = {
            ...requireModule(fileName).default
        };
    });
    return root.modules;
}

export default exportModules;