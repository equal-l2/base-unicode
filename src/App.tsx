import {
    type Component,
    createSignal,
    Match,
    type Setter,
    Switch,
} from "solid-js";
import { NumberToUnicode } from "./components/NumberToUnicode";
import { UnicodeToNumber } from "./components/UnicodeToNumber";

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
