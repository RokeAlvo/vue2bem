"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BemElem = void 0;
const constants_1 = require("../constants");
const BemEntity_1 = require("./BemEntity");
class BemElem extends BemEntity_1.BemEntity {
    constructor() {
        super();
    }
    toStrings(sectionIndent) {
        const indentString = constants_1.BASE_INDENT.repeat(sectionIndent);
        if (this.mods.length) {
            return [
                indentString + '&__' + this.name + ' {',
                ...this.getModsScssStrings(sectionIndent + 2),
                indentString + '}',
            ];
        }
        else {
            return [indentString + '&__' + this.name + ' {}'];
        }
    }
}
exports.BemElem = BemElem;
//# sourceMappingURL=BemElem.js.map