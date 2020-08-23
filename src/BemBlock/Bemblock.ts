import {BASE_INDENT} from '../constants';
import {BemEntity} from './BemEntity';
import {BemElem} from './BemElem';
import {ClassObj} from './ClassObj';

export class BemBlock extends BemEntity {
  elems: BemElem[] = [];

  constructor(classObj: ClassObj) {
    super();
    this.name = classObj.block;
    if (classObj.elem) {
      this.addElem(classObj.elem, classObj.mod);
    } else if (classObj.mod) {
      this.addMod(classObj.mod);
    }
  }

  getElem(elemName: string): BemElem | undefined {
    return this.elems.find(elem => elem.name === elemName);
  }

  addElem(elemName: string, mod: string) {
    if (elemName) {
      const currentElem = this.getElem(elemName);
      if (!currentElem) {
        const elem = new BemElem();
        elem.name = elemName;
        elem.addMod(mod);
        this.elems.push(elem);
      } else {
        currentElem.addMod(mod);
      }
    }
  }

  toStrings(sectionIndent: number) {
    const indentString = BASE_INDENT.repeat(sectionIndent);
    const modsStrings: string[] = this.getModsScssStrings(sectionIndent + 2);
    const elemStrings: string[] = this.elems.reduce(
      (result: string[], elem: BemElem) => {
        return [...result, ...elem.toStrings(sectionIndent + 2)];
      },
      []
    );
    let result: string[] = [];
    if (!this.mods.length && !this.elems.length) {
      result = [indentString + '.' + this.name + ' {}'];
    } else {
      result = [
        indentString + '.' + this.name + ' {',
        ...elemStrings,
        ...modsStrings,
        indentString + '}',
      ];
    }
    return result;
  }

  toScss(): string {
    return this.toStrings(0).join('\n');
  }
}
