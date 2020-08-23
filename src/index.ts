#!/usr/bin/env node

import {VueFile} from './BemBlock/VueFile';

const args = process.argv;
const fileName = args[2];

const file = new VueFile(fileName);
file.createScssInStyle();
