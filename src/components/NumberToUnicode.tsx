import {
    type Component,
    createMemo,
    createSignal,
    Match,
    Switch,
} from "solid-js";
import { convertBase, convertToUnicodeBase, maxBase } from "../utils";

const NumberToUnicodeResult: Component<{
    input: string;
    base: string;
}> = (props) => {
    const input = createMemo(() => Number.parseInt(props.input));
    const invalidInput = () => Number.isNaN(input());
    const inputOutOfRange = () =>
        input() < 0 || Number.MAX_SAFE_INTEGER < input();

    const base = createMemo(() => Number.parseInt(props.base));
    const invalidBase = () => Number.isNaN(base());
    const baseOutOfRange = () => base() < 2 || maxBase < base();

    const digits = () => convertBase(input(), base());
    const unicode = () => convertToUnicodeBase(digits());

    const has_dual_butt = () => unicode().includes("ဣ");
    const DefaultElement = () => {
        return (
            <p class={has_dual_butt() ? "dual-butt" : "normal"}>
                <span class="text-4xl leading-relaxed">{unicode()}</span>
            </p>
        );
    };

    return (
        <>
            <Switch fallback={<DefaultElement />}>
                <Match when={invalidInput()}>
                    <p class="error">入力数字が異常です</p>
                </Match>
                <Match when={inputOutOfRange()}>
                    <p class="error">
                        入力数字は<span class="font-mono">0</span>~
                        <span class="font-mono">{Number.MAX_SAFE_INTEGER}</span>
                        の整数で指定してください
                    </p>
                </Match>
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
            </Switch>
        </>
    );
};

export function NumberToUnicode() {
    const [input, setInput] = createSignal("987654321987654");
    const [base, setBase] = createSignal("30000");
    return (
        <>
            <div class="text-center">
                <input
                    class="my-input"
                    type="number"
                    min="0"
                    max={Number.MAX_SAFE_INTEGER}
                    placeholder="数"
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
                <p class="mb-3">で表現すると……</p>
            </div>
            <NumberToUnicodeResult input={input()} base={base()} />
        </>
    );
}
