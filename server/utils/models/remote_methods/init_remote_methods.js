// utility to init remote methods and hooks
// it scans directory /server/api/{model_name}/methods/{method_name}
// each subdirectory corresponds to the remote method name in snake-case
// it can contain following files
// * {method_name}.method.js - static method which will be defined in the model
// * {method_name}.definition.js - remote method options
// * {method_name}.before.js - array of before-remote hooks
// * {method_name}.after.js - array of after-remote hooks

const { readdirSync, lstatSync } = require('fs');
const { join } = require('path');
const { existsSync } = require('fs');
const { camelCase, snakeCase, size } = require('lodash');
const { resolve } = require('app-root-path');
const { getListenerCount } = require('../../events');

module.exports = Model => {
  const methodsDir = resolve(join('/server/api', snakeCase(Model.name), 'methods'));
  const methodDirNames = getSubdirectories(methodsDir);

  const methods = methodDirNames.map(methodDirName => {
    const methodDir = join(methodsDir, methodDirName);
    const methodName = getMethodName(methodDirName);

    const method = requireIfExists(join(methodDir, `${methodDirName}.method.js`));
    const definition = requireIfExists(join(methodDir, `${methodDirName}.definition.js`));
    const beforeHooks = requireIfExists(join(methodDir, `${methodDirName}.before.js`));
    const afterHooks = requireIfExists(join(methodDir, `${methodDirName}.after.js`));

    return {
      methodName,
      method,
      definition,
      beforeHooks,
      afterHooks,
    };
  });

  increaseModelMaxListenerCountIfRequired(Model, methods);

  methods.forEach(({ methodName, method, definition, beforeHooks, afterHooks }) => {
    if (method) {
      Model[methodName] = method;
    }

    if (definition) {
      Model.remoteMethod(methodName, definition);
    }

    if (beforeHooks) {
      beforeHooks.forEach(beforeHook => {
        Model.beforeRemote(methodName, beforeHook);
      });
    }

    if (afterHooks) {
      afterHooks.forEach(afterHook => {
        Model.afterRemote(methodName, afterHook);
      });
    }
  });
};

function getSubdirectories(path) {
  return readdirSync(path).filter(name => isDirectory(`${path}/${name}`));
}

function isDirectory(path) {
  return lstatSync(path).isDirectory();
}

function getMethodName(methodDirName) {
  let matches = /prototype\.__(\w+)__(\w+)/.exec(methodDirName);
  if (matches) {
    const methodName = camelCase(matches[1]);
    const relationName = camelCase(matches[2]);

    return `prototype.__${methodName}__${relationName}`;
  }

  matches = /prototype\.(\w+)/.exec(methodDirName);
  if (matches) {
    const methodName = camelCase(matches[1]);

    return `prototype.${methodName}`;
  }

  return camelCase(methodDirName);
}

function requireIfExists(path) {
  if (existsSync(path)) {
    return require(path);
  }

  return null;
}

function increaseModelMaxListenerCountIfRequired(Model, methods) {
  const hookCount = getHookCount(methods);
  const currentListenerCount = getListenerCount(Model);
  const nextListenerCount = currentListenerCount + hookCount;
  const maxListenerCount = Model.getMaxListeners();

  if (nextListenerCount > maxListenerCount) {
    Model.setMaxListeners(nextListenerCount);
  }
}

function getHookCount(methods) {
  return methods.reduce((count, { beforeHooks, afterHooks }) => {
    return count + size(beforeHooks) + size(afterHooks);
  }, 0);
}
