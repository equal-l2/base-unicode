import { convertBase } from "../src/utils";
import { expect, test, describe } from "bun:test";

describe("base conversion test", () => {
    test("0 -> [0]", () => {
        expect(convertBase(0, 2)).toEqual([0]);
        expect(convertBase(0, 10)).toEqual([0]);
        expect(convertBase(0, 3524)).toEqual([0]);
    });

    test("convert test", () => {
        expect(convertBase(3523, 2)).toEqual([
            1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1,
        ]);
        expect(convertBase(3523, 10)).toEqual([3, 5, 2, 3]);
        expect(convertBase(3523, 3524)).toEqual([3523]);
        expect(convertBase(154221029867775, 3524)).toEqual([
            3523, 3523, 3523, 3523,
        ]);
    });
});
