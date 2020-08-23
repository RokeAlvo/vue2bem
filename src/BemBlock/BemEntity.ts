import {BASE_INDENT} from '../constants';

export abstract class BemEntity {
  name = '';
  mods: string[] = [];

  constructor() {}

  hasMod(modName: string): boolean {
    return !!this.mods.find(mod => mod === modName);
  }
  addMod(modName: string) {
    if (!this.hasMod(modName) && modName) {
      this.mods.push(modName);
    }
  }
  getModsScssStrings(sectionIndent: number): string[] {
    const indentString = BASE_INDENT.repeat(sectionIndent);
    return this.mods.map(mod => {
      return indentString + '&_' + mod + ' {}';
    });
  }
  abstract toStrings(sectionIndent: number): string[];
}
