#!/usr/bin/env node

const findRoot = require('find-root');
const fs = require('fs-extra');
const path = require('path');

const REACT_NATIVE_RGXP = /^react-native|^@react-native-community|^@react-navigation/i;
const PACKAGE_NAME = 'package.json';
const NODE_MODULES_NAME = 'node_modules';

function link(name, fromBase, toBase) {
  const fromDir = path.join(fromBase, NODE_MODULES_NAME, name);
  const to = path.join(toBase, NODE_MODULES_NAME, name);

  if (!fs.existsSync(fromDir)) {
    return;
  }

  if (fs.existsSync(to)) {
    fs.removeSync(to);
  }

  fs.symlinkSync(fromDir, to, 'dir');
};

function makeSymlinks(fromDir) {
  const rootDir = findRoot(fromDir, dir => {
    const pkg = path.join(dir, PACKAGE_NAME);
    return fs.existsSync(pkg) && 'workspaces' in require(pkg);
  });

  const packages = Object.keys(require(path.join(fromDir, PACKAGE_NAME)).dependencies);
  const needLinking = packages.filter(p => REACT_NATIVE_RGXP.test(p)).map(p => p.split('/')[0]);

  needLinking.forEach(p => link(p, rootDir, fromDir));
};

makeSymlinks(process.cwd());
