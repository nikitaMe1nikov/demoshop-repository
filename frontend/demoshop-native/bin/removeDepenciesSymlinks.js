#!/usr/bin/env node

const findRoot = require('find-root');
const fs = require('fs-extra');
const path = require('path');

const REACT_NATIVE_RGXP = /^react-native|^@react-native-community|^@react-navigation/i;
const PACKAGE_NAME = 'package.json';
const NODE_MODULES_NAME = 'node_modules';

function unlink(name, fromBase) {
  const fromDir = path.join(fromBase, NODE_MODULES_NAME, name);

  if (!fs.existsSync(fromDir)) {
    return;
  }

  fs.unlinkSync(fromDir);
};

function removeSymlinks(fromDir) {
  const packages = Object.keys(require(path.join(fromDir, PACKAGE_NAME)).dependencies);
  const needLinking = packages.filter(p => REACT_NATIVE_RGXP.test(p)).map(p => p.split('/')[0]);

  needLinking.forEach(p => unlink(p, fromDir));
};

removeSymlinks(process.cwd());
