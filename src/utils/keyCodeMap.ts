export const keyCodeMap: { [key: string]: { lower: string, upper: string } | string } = {
    // Alphabet keys
    'KeyA': { lower: 'a', upper: 'A' },
    'KeyB': { lower: 'b', upper: 'B' },
    'KeyC': { lower: 'c', upper: 'C' },
    'KeyD': { lower: 'd', upper: 'D' },
    'KeyE': { lower: 'e', upper: 'E' },
    'KeyF': { lower: 'f', upper: 'F' },
    'KeyG': { lower: 'g', upper: 'G' },
    'KeyH': { lower: 'h', upper: 'H' },
    'KeyI': { lower: 'i', upper: 'I' },
    'KeyJ': { lower: 'j', upper: 'J' },
    'KeyK': { lower: 'k', upper: 'K' },
    'KeyL': { lower: 'l', upper: 'L' },
    'KeyM': { lower: 'm', upper: 'M' },
    'KeyN': { lower: 'n', upper: 'N' },
    'KeyO': { lower: 'o', upper: 'O' },
    'KeyP': { lower: 'p', upper: 'P' },
    'KeyQ': { lower: 'q', upper: 'Q' },
    'KeyR': { lower: 'r', upper: 'R' },
    'KeyS': { lower: 's', upper: 'S' },
    'KeyT': { lower: 't', upper: 'T' },
    'KeyU': { lower: 'u', upper: 'U' },
    'KeyV': { lower: 'v', upper: 'V' },
    'KeyW': { lower: 'w', upper: 'W' },
    'KeyX': { lower: 'x', upper: 'X' },
    'KeyY': { lower: 'y', upper: 'Y' },
    'KeyZ': { lower: 'z', upper: 'Z' },

    // Digit keys
    'Digit0': '0',
    'Digit1': '1',
    'Digit2': '2',
    'Digit3': '3',
    'Digit4': '4',
    'Digit5': '5',
    'Digit6': '6',
    'Digit7': '7',
    'Digit8': '8',
    'Digit9': '9',

    // Special character keys (lower case)
    'Backquote': { lower: '`', upper: '~' },
    'Minus': { lower: '-', upper: '_' },
    'Equal': { lower: '=', upper: '+' },
    'BracketLeft': { lower: '[', upper: '{' },
    'BracketRight': { lower: ']', upper: '}' },
    'Backslash': { lower: '\\', upper: '|' },
    'Semicolon': { lower: ';', upper: ':' },
    'Quote': { lower: '\'', upper: '"' },
    'Comma': { lower: ',', upper: '<' },
    'Period': { lower: '.', upper: '>' },
    'Slash': { lower: '/', upper: '?' },

    // Function keys
    'Escape': 'Escape',
    'Tab': 'Tab',
    'CapsLock': 'CapsLock',
    'ShiftLeft': 'Shift',
    'ShiftRight': 'Shift',
    'ControlLeft': 'Control',
    'ControlRight': 'Control',
    'AltLeft': 'Alt',
    'AltRight': 'Alt',
    'Space': ' ',
    'Enter': 'Enter',
    'Backspace': 'Backspace',

    // Arrow keys
    'ArrowUp': 'ArrowUp',
    'ArrowDown': 'ArrowDown',
    'ArrowLeft': 'ArrowLeft',
    'ArrowRight': 'ArrowRight',

    // Other keys
    'Delete': 'Delete',
    'Home': 'Home',
    'End': 'End',
    'PageUp': 'PageUp',
    'PageDown': 'PageDown',
    'Insert': 'Insert',
    'Pause': 'Pause',
    'PrintScreen': 'PrintScreen',
    'ScrollLock': 'ScrollLock',
    'NumLock': 'NumLock',
    'MetaLeft': 'Meta', // Windows/Command key
    'MetaRight': 'Meta', // Windows/Command key

    // Numpad keys
    'Numpad0': '0',
    'Numpad1': '1',
    'Numpad2': '2',
    'Numpad3': '3',
    'Numpad4': '4',
    'Numpad5': '5',
    'Numpad6': '6',
    'Numpad7': '7',
    'Numpad8': '8',
    'Numpad9': '9',
    'NumpadMultiply': '*',
    'NumpadAdd': '+',
    'NumpadSubtract': '-',
    'NumpadDecimal': '.',
    'NumpadDivide': '/',
    'NumpadEnter': 'Enter',
    'NumpadEqual': '='
    // Add other keys if necessary
};


export default function getCharFromEvent(event: KeyboardEvent) {
    const key = event.code;
    const isShiftPressed = event.shiftKey;
    if (key in keyCodeMap) {
        const keyMap = keyCodeMap[key];
        if (typeof keyMap === 'string') {
            return keyMap;
        } else {
            return isShiftPressed ? keyMap.upper : keyMap.lower;
        }
    }
    return '';
}
