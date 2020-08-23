import { BemBlock } from './Bemblock';
export declare class VueFile {
    private fileName;
    fileContent: string;
    constructor(fileName: string);
    private get template();
    private get classNames();
    private getMod;
    private getEl;
    private get classObj();
    get bemEntityList(): BemBlock[];
    private get styleString();
    private appendStringToStyle;
    private appendScssToStyle;
    private saveFile;
    createScssInStyle(): void;
}
