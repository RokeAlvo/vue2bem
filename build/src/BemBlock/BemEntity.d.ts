export declare abstract class BemEntity {
    name: string;
    mods: string[];
    constructor();
    hasMod(modName: string): boolean;
    addMod(modName: string): void;
    getModsScssStrings(sectionIndent: number): string[];
    abstract toStrings(sectionIndent: number): string[];
}
