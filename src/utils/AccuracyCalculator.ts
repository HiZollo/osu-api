import type { BaseScore } from '../structures/BaseScore';
import { GameMode } from '../types/enums';

export abstract class AccuracyCalculator {

	public static standard(count300: number, count100: number, count50: number, countMiss: number) {
		const max = count300 + count100 + count50 + countMiss;
		if (!max) return 0;

		return (count300 * 300 + count100 * 100 + count50 * 50) / (max * 300);
	}

	public static taiko(count300: number, count100: number, countMiss: number) {
		const max = count300 + count100 + countMiss;
		if (!max) return 0;

		return (count300 + count100 * 0.5) / max;
	}

	public static catch(count300: number, count100: number, count50: number, countKatu: number, countMiss: number) {
		const max = count300 + count100 + count50 + countKatu + countMiss;
		if (!max) return 0;

		return (count300 + count100 + count50) / max
	}

	public static mania(count300: number, count100: number, count50: number, countKatu: number, countGeki: number, countMiss: number) {
		const max = count300 + count100 + count50 + countKatu + countGeki + countMiss;
		if (!max) return 0;

		return (300 * countGeki + 300 * count300 + 200 * countKatu + 100 * count100 + 50 * count50) / (max * 300);
	}

	public static maniaV2(count300: number, count100: number, count50: number, countKatu: number, countGeki: number, countMiss: number) {
		const max = count300 + count100 + count50 + countKatu + countGeki + countMiss;
		if (!max) return 0;

		return (305 * countGeki + 300 * count300 + 200 * countKatu + 100 * count100 + 50 * count50) / (max * 305);
	}

	public static calculate(score: BaseScore, v2: boolean = false) {
		const { statistics } = score;
		switch(score.mode) {
			case GameMode.Standard:
				return AccuracyCalculator.standard(
						statistics.count300, 
						statistics.count100, 
						statistics.count50,
						statistics.countMiss
					);
			case GameMode.Taiko:
				return AccuracyCalculator.taiko(
						statistics.count300, 
						statistics.count100,
						statistics.countMiss
					);
			case GameMode.Catch:
				return AccuracyCalculator.catch(
						statistics.count300, 
						statistics.count100, 
						statistics.count50,
						statistics.countKatu,
						statistics.countMiss
					);
			case GameMode.Mania:
				return v2 ?
					AccuracyCalculator.maniaV2(
						statistics.count300, 
						statistics.count100, 
						statistics.count50,
						statistics.countKatu,
						statistics.countGeki,
						statistics.countMiss
					) : 
					AccuracyCalculator.mania(
						statistics.count300, 
						statistics.count100, 
						statistics.count50,
						statistics.countKatu,
						statistics.countGeki,
						statistics.countMiss
					);
		}
	}
}