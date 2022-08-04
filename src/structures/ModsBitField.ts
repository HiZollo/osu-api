import { Mods } from "../enums";

export type ModsResolvable = number | string | bigint | ModsBitField;

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
    constructor(bits = 0n) {
        this.bitfield = bits;
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

    public remove(...bits: number[]) {
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
        const serialized = {};
        for (const [flag, bit] of Object.entries(ModsBitField.Flags)) {
            serialized[flag] = this.has(bit);
        }
        return serialized;
    }

    public valueOf() {
        return this.bitfield;
    }

    public static resolve(bit: ModsResolvable): bigint {
        if (bit instanceof ModsBitField) {
            return bit.bitfield;
        }
        if (typeof bit === 'number') return BigInt(bit);
        if (typeof bit === 'string') {
            const a = ModsBitField.Flags[bit];
            if (typeof a === 'undefined') throw new Error('INVALID_BITFIELD');
            return a;
        }
        return bit;
    }
}