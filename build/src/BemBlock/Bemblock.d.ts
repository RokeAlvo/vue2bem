import { BemEntity } from './BemEntity';
import { BemElem } from './BemElem';
import { ClassObj } from './ClassObj';
export declare class BemBlock extends BemEntity {
    elems: BemElem[];
    constructor(classObj: ClassObj);
    getElem(elemName: string): BemElem | undefined;
    addElem(elemName: string, mod: string): void;
    toStrings(sectionIndent: number): string[];
    toScss(): string;
}
