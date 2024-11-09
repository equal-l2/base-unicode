import {
    type Component,
    createMemo,
    createSignal,
    Match,
    type Setter,
    Switch,
} from "solid-js";
import {
    convertBase,
    convertToUnicodeBase,
    digitsToNumber,
    maxBase,
    stringToDigits,
} from "./utils";

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

function NumberToUnicode() {
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

function UnicodeToNumber() {
    const [input, setInput] = createSignal("あいうえお");
    const [base, setBase] = createSignal("30000");
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

enum Mode {
    UnicodeToNumber = 1,
    NumberToUnicode = 2,
}

const Tabs: Component<{ mode: Mode; setMode: Setter<Mode> }> = (props) => {
    const mode = () => props.mode;
    const setMode = props.setMode;
    return (
        <div role="tablist" class="tabs tabs-boxed">
            <button
                role="tab"
                class="tab"
                type="button"
                classList={{
                    "tab-active": mode() === Mode.NumberToUnicode,
                }}
                onClick={() => setMode(Mode.NumberToUnicode)}
            >
                🔢 → ဣ
            </button>
            <button
                role="tab"
                class="tab"
                type="button"
                classList={{
                    "tab-active": mode() === Mode.UnicodeToNumber,
                }}
                onClick={() => setMode(Mode.UnicodeToNumber)}
            >
                ဣ → 🔢
            </button>
        </div>
    );
};

function App() {
    const [mode, setMode] = createSignal<Mode>(Mode.NumberToUnicode);
    return (
        <>
            <Tabs mode={mode()} setMode={setMode} />
            <main class="subpixel-antialiased m-auto">
                <Switch>
                    <Match when={mode() === Mode.NumberToUnicode}>
                        <NumberToUnicode />
                    </Match>
                    <Match when={mode() === Mode.UnicodeToNumber}>
                        <UnicodeToNumber />
                    </Match>
                </Switch>
            </main>
        </>
    );
}

export default App;
