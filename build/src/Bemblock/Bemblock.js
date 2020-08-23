"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BemBlock = void 0;
const constants_1 = require("./constants");
const BemEntity_1 = require("./BemEntity");
const BemElem_1 = require("./BemElem");
class BemBlock extends BemEntity_1.BemEntity {
    constructor(classObj) {
        super();
        this.elems = [];
        this.name = classObj.block;
        if (classObj.elem) {
            this.addElem(classObj.elem, classObj.mod);
        }
        else if (classObj.mod) {
            this.addMod(classObj.mod);
        }
    }
    getElem(elemName) {
        return this.elems.find(elem => elem.name === elemName);
    }
    addElem(elemName, mod) {
        if (elemName) {
            const currentElem = this.getElem(elemName);
            if (!currentElem) {
                const elem = new BemElem_1.BemElem();
                elem.name = elemName;
                elem.addMod(mod);
                this.elems.push(elem);
            }
            else {
                currentElem.addMod(mod);
            }
        }
    }
    toStrings(sectionIndent) {
        const indentString = constants_1.BASE_INDENT.repeat(sectionIndent);
        const modsStrings = this.getModsScssStrings(sectionIndent + 2);
        const elemStrings = this.elems.reduce((result, elem) => {
            return [...result, ...elem.toStrings(sectionIndent + 2)];
        }, []);
        let result = [];
        if (!this.mods.length && !this.elems.length) {
            result = [indentString + '.' + this.name + ' {}'];
        }
        else {
            result = [
                indentString + '.' + this.name + ' {',
                ...elemStrings,
                ...modsStrings,
                indentString + '}',
            ];
        }
        return result;
    }
    toScss() {
        return this.toStrings(0).join('\n');
    }
}
exports.BemBlock = BemBlock;
//# sourceMappingURL=Bemblock.js.map