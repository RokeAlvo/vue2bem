import {BASE_INDENT} from '../constants';
import {BemEntity} from './BemEntity';

export class BemElem extends BemEntity {
  constructor() {
    super();
  }

  toStrings(sectionIndent: number): string[] {
    const indentString = BASE_INDENT.repeat(sectionIndent);
    if (this.mods.length) {
      return [
        indentString + '&__' + this.name + ' {',
        ...this.getModsScssStrings(sectionIndent + 2),
        indentString + '}',
      ];
    } else {
      return [indentString + '&__' + this.name + ' {}'];
    }
  }
}
