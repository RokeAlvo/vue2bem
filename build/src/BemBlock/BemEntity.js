"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BemEntity = void 0;
const constants_1 = require("../constants");
class BemEntity {
    constructor() {
        this.name = '';
        this.mods = [];
    }
    hasMod(modName) {
        return !!this.mods.find(mod => mod === modName);
    }
    addMod(modName) {
        if (!this.hasMod(modName) && modName) {
            this.mods.push(modName);
        }
    }
    getModsScssStrings(sectionIndent) {
        const indentString = constants_1.BASE_INDENT.repeat(sectionIndent);
        return this.mods.map(mod => {
            return indentString + '&_' + mod + ' {}';
        });
    }
}
exports.BemEntity = BemEntity;
//# sourceMappingURL=BemEntity.js.map