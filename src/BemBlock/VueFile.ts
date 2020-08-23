import {BemBlock} from './Bemblock';
import fs = require('fs');
import {ClassObj} from './ClassObj';

export class VueFile {
  fileContent: string;
  // fileName: string

  constructor(private fileName: string) {
    // this.fileName = fileName
    this.fileContent = fs.readFileSync(fileName, 'utf8');
  }

  private get template(): string {
    const matches = this.fileContent.match(
      /(?<=<template>).*?(?=<\/template>)/gms
    );
    return matches ? matches[0] : '';
  }

  private get classNames() {
    const classesSearch = this.template.match(
      /(?<=class)(\s*)=(\s*)(").*?(")/gm
    );
    const classesString = classesSearch !== null ? classesSearch : [];
    const classesContent = classesString.map(res => {
      const result = res.match(/(?<==").*?(?=")/g);
      return result ? result : [];
    });
    return Array.from(
      new Set(
        classesContent
          .reduce((acc, val) => acc.concat(val), [])
          .map(el => el.trim())
          .map(res => res.split(' '))
          .reduce((acc, val) => acc.concat(val), [])
      )
    ).sort();
  }

  private getMod(className: string) {
    return className.split(/(?<!_)_(?!_)/);
  }

  private getEl(className: string) {
    return className.split('__');
  }

  private get classObj(): ClassObj[] {
    return this.classNames.map(className => {
      let mod = '';
      let [block, el] = this.getEl(className);
      if (el) {
        [el, mod] = this.getMod(el);
      } else {
        [block, mod] = this.getMod(className);
      }
      return {block, elem: el, mod};
    });
  }

  get bemEntityList(): BemBlock[] {
    const result: {[key: string]: BemBlock} = {};
    this.classObj.forEach(cl => {
      if (!result[cl.block]) {
        result[cl.block] = new BemBlock({
          block: cl.block,
          elem: cl.elem,
          mod: cl.mod,
        });
      } else {
        if (cl.elem) {
          result[cl.block].addElem(cl.elem, cl.mod);
        } else {
          result[cl.block].addMod(cl.mod);
        }
      }
    });
    return Object.values(result);
  }

  private get styleString(): string {
    return this.bemEntityList.map(bemBlock => bemBlock.toScss()).join('\n');
  }

  private appendStringToStyle(str: string) {
    this.fileContent = this.fileContent.replace(/(?=<\/style>)/gm, str + '\n');
  }

  private appendScssToStyle() {
    this.appendStringToStyle(this.styleString);
  }

  private saveFile() {
    fs.writeFileSync(this.fileName, this.fileContent);
  }

  createScssInStyle(): void {
    this.appendScssToStyle();
    console.log(this.fileName);
    this.saveFile();
    console.log('Добавлены классы для: ');
    console.log(this.classNames);
  }
}
