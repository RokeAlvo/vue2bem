#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VueFile_1 = require("./BemBlock/VueFile");
const args = process.argv;
const fileName = args[2];
const file = new VueFile_1.VueFile(fileName);
file.createScssInStyle();
//# sourceMappingURL=index.js.map