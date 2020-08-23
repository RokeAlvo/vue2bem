"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueFile = void 0;
const Bemblock_1 = require("./Bemblock");
const fs = require("fs");
class VueFile {
    // fileName: string
    constructor(fileName) {
        this.fileName = fileName;
        // this.fileName = fileName
        this.fileContent = fs.readFileSync(fileName, 'utf8');
    }
    get template() {
        const matches = this.fileContent.match(/(?<=<template>).*?(?=<\/template>)/gms);
        return matches ? matches[0] : '';
    }
    get classNames() {
        const classesSearch = this.template.match(/(?<=class)(\s*)=(\s*)(").*?(")/gm);
        const classesString = classesSearch !== null ? classesSearch : [];
        const classesContent = classesString.map(res => {
            const result = res.match(/(?<==").*?(?=")/g);
            return result ? result : [];
        });
        return Array.from(new Set(classesContent
            .reduce((acc, val) => acc.concat(val), [])
            .map(el => el.trim())
            .map(res => res.split(' '))
            .reduce((acc, val) => acc.concat(val), []))).sort();
    }
    getMod(className) {
        return className.split(/(?<!_)_(?!_)/);
    }
    getEl(className) {
        return className.split('__');
    }
    get classObj() {
        return this.classNames.map(className => {
            let mod = '';
            let [block, el] = this.getEl(className);
            if (el) {
                [el, mod] = this.getMod(el);
            }
            else {
                [block, mod] = this.getMod(className);
            }
            return { block, elem: el, mod };
        });
    }
    /* tslint:disable */
    get bemEntityList() {
        const result = {};
        this.classObj.forEach(cl => {
            if (!result[cl.block]) {
                result[cl.block] = new Bemblock_1.BemBlock({
                    block: cl.block,
                    elem: cl.elem,
                    mod: cl.mod,
                });
            }
            else {
                if (cl.elem) {
                    result[cl.block].addElem(cl.elem, cl.mod);
                }
                else {
                    result[cl.block].addMod(cl.mod);
                }
            }
        });
        return Object.values(result);
    }
    get styleString() {
        return this.bemEntityList.map(bemBlock => bemBlock.toScss()).join('\n');
    }
    appendStringToStyle(str) {
        this.fileContent = this.fileContent.replace(/(?=<\/style>)/gm, str + '\n');
    }
    appendScssToStyle() {
        this.appendStringToStyle(this.styleString);
    }
    saveFile() {
        fs.writeFileSync(this.fileName, this.fileContent);
    }
    createScssInStyle() {
        this.appendScssToStyle();
        console.log(this.fileName);
        this.saveFile();
        console.log('Добавлены классы для: ');
        console.log(this.classNames);
    }
}
exports.VueFile = VueFile;
//# sourceMappingURL=VueFile.js.map