import conversionTable from "./assets/unicode_table.json";

export const maxBase = conversionTable.length;

export function convertBase(_input: number, base: number): number[] {
    if (_input === 0) {
        return [0];
    }

    const maxPower = Math.floor(Math.log10(_input) / Math.log10(base));

    const result: number[] = [];
    let input = _input;
    for (let i = maxPower; i >= 0; i--) {
        const digit = Math.trunc(input / base ** i);
        input %= base ** i;
        result.push(digit);
    }
    return result;
}

export function convertToUnicodeBase(digits: number[]): string {
    let result = "";
    for (const digit of digits) {
        result += String.fromCharCode(conversionTable[digit]);
    }
    return result;
}
