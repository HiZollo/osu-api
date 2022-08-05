import { Mods } from "../enums";

export type ModsResolvable = number | string | bigint | ModsBitField | Array<ModsResolvable>;

export class ModsBitField {
    static Flags = Mods;
    static KeyMod = 
        Mods.Key1 | Mods.Key2 | Mods.Key3 | Mods.Key4 | Mods.Key5 |
        Mods.Key6 | Mods.Key7 | Mods.Key8 | Mods.Key9 | Mods.KeyCoop;
    static FreeModAllowed = 
        Mods.NoFail | Mods.Easy | Mods.Hidden | Mods.HardRock | Mods.SuddenDeath | 
        Mods.Flashlight | Mods.FadeIn | Mods.Relax | Mods.AutoPilot | Mods.SpunOut | 
        ModsBitField.KeyMod;
    static ScoreIncreaseMods = 
        Mods.Hidden | Mods.HardRock | Mods.DoubleTime | Mods.Flashlight | Mods.FadeIn;

    public bitfield: bigint;
    constructor(bits: ModsResolvable = 0n) {
        this.bitfield = ModsBitField.resolve(bits);
    }

    public any(bit: ModsResolvable) {
        return (this.bitfield & ModsBitField.resolve(bit)) !== 0n;
    }

    public equals(bit: ModsResolvable) {
        return this.bitfield === ModsBitField.resolve(bit);
    }

    public has(bit: ModsResolvable) {
        bit = ModsBitField.resolve(bit);
        return (this.bitfield & bit) === bit;
    }

    public add(...bits: Array<ModsResolvable>) {
        let total: bigint = 0n;
        for (const bit of bits) {
            total |= ModsBitField.resolve(bit);
        }
        this.bitfield |= total;

        return this;
    }

    public remove(...bits: ModsResolvable[]) {
        let total: bigint = 0n;
        for (const bit of bits) {
            total |= ModsBitField.resolve(bit);
        }
        this.bitfield &= ~total;

        return this;
    }

    public toArray() {
        return Object.keys(ModsBitField.Flags).filter(bit => this.has(bit));
    }

    public serialize() {
        const serialized: { [key: string]: boolean } = {};
        for (const [flag, bit] of Object.entries(ModsBitField.Flags)) {
            serialized[flag as keyof typeof ModsBitField.Flags] = this.has(bit);
        }
        return serialized;
    }

    public isNone() {
        return this.bitfield === 0n;
    }

    public valueOf() {
        return this.bitfield;
    }

    public static resolve(bit: ModsResolvable): bigint {
        if (Array.isArray(bit)) {
            return bit.map(ModsBitField.resolve).reduce((acc, now) => acc | now, 0n);
        }
        if (bit instanceof ModsBitField) {
            return bit.bitfield;
        }
        if (typeof bit === 'number') return BigInt(bit);
        if (typeof bit === 'string') {
            if (!isNaN(+bit)) return BigInt(bit);
            const a: bigint | undefined = ModsBitField.Flags[bit as keyof typeof ModsBitField.Flags];
            if (typeof a === 'undefined') throw new Error('INVALID_BITFIELD');
            return a;
        }
        return bit;
    }
}