import { createSignal } from "solid-js";
import { convertBase, convertToUnicodeBase, maxBase } from "./utils";

function renderResult(inputStr: string, baseStr: string) {
    let input = 0;
    try {
        input = Number.parseInt(inputStr);
        if (Number.isNaN(input)) throw new Error();
    } catch {
        return <p class="error">入力数字が異常です</p>;
    }
    if (input < 0 || Number.MAX_SAFE_INTEGER < input) {
        return (
            <p class="error">
                入力数字は<span class="font-mono">0</span>~
                <span class="font-mono">{Number.MAX_SAFE_INTEGER}</span>
                の整数で指定してください
            </p>
        );
    }

    let base = 0;
    try {
        base = Number.parseInt(baseStr);
        if (Number.isNaN(base)) throw new Error();
    } catch {
        return <p class="error">基数が異常です</p>;
    }
    if (base < 2 || maxBase < base) {
        return (
            <p class="error">
                基数は<span class="font-mono">2</span>~
                <span class="font-mono">{maxBase}</span>の整数で指定してください
            </p>
        );
    }

    const digits = convertBase(input, base);
    const unicode = convertToUnicodeBase(digits);

    const has_dual_butt = unicode.includes("ဣ");
    return (
        <p class={has_dual_butt ? "dual-butt" : "normal"}>
            <span class="text-4xl leading-relaxed">{unicode}</span>
        </p>
    );
}

function App() {
    // const [input, setInput] = createSignal("154221029867775");
    // const [base, setBase] = createSignal("3524");
    const [input, setInput] = createSignal("987654321987654");
    const [base, setBase] = createSignal("30000");
    return (
        <>
            <main class="subpixel-antialiased m-auto">
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
                {renderResult(input(), base())}
            </main>
        </>
    );
}

export default App;
