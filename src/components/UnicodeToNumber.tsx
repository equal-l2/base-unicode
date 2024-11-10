import {
    type Component,
    createMemo,
    createSignal,
    Match,
    Switch,
} from "solid-js";
import { digitsToNumber, maxBase, stringToDigits } from "../utils";

const UnicodeToNumberResult: Component<{
    input: string;
    base: string;
}> = (props) => {
    const base = createMemo(() => Number.parseInt(props.base));
    const invalidBase = () => Number.isNaN(base());
    const baseOutOfRange = () => base() < 2 || maxBase < base();

    const digits = () => stringToDigits(props.input);
    const hasInvalidChar = () => typeof digits() === "string";
    const number = () => digitsToNumber(digits() as number[], base());
    const tooLargeDigit = () => typeof number() === "string";

    const has_dual_butt = () => props.input.includes("ဣ");

    const DefaultElement = () => {
        return (
            <p class={has_dual_butt() ? "dual-butt" : "normal"}>
                <span class="text-4xl leading-relaxed">{number()}</span>
            </p>
        );
    };

    return (
        <Switch fallback={<DefaultElement />}>
            <Match when={invalidBase()}>
                <p class="error">基数が異常です</p>
            </Match>
            <Match when={baseOutOfRange()}>
                <p class="error">
                    基数は<span class="font-mono">2</span>~
                    <span class="font-mono">{maxBase}</span>
                    の整数で指定してください
                </p>
            </Match>
            <Match when={hasInvalidChar()}>
                <p class="error">使用できない文字(空白など)が含まれています</p>
            </Match>
            <Match when={tooLargeDigit()}>
                <p class="error">
                    基数が小さすぎます（
                    {Number.parseInt(number() as string) + 1} 以上が必要です）
                </p>
            </Match>
        </Switch>
    );
};

export function UnicodeToNumber() {
    const [input, setInput] = createSignal("ABCDEF");
    const [base, setBase] = createSignal("50");
    return (
        <>
            <div class="text-center">
                <input
                    class="my-input"
                    placeholder="文字列"
                    value={input()}
                    on:input={(e) => setInput(e.target.value)}
                />
                <p>を</p>
                <input
                    class="my-input"
                    type="number"
                    min="2"
                    max={Number.MAX_SAFE_INTEGER}
                    placeholder="基数"
                    value={base()}
                    on:input={(e) => setBase(e.target.value)}
                />
                <span>進数</span>
                <p class="mb-3">の数として解釈すると……</p>
            </div>
            <UnicodeToNumberResult input={input()} base={base()} />
        </>
    );
}
