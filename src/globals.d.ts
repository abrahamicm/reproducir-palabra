// src/globals.d.ts
declare global {
    interface Window {
        speechSynthesis: SpeechSynthesis;
    }

    interface SpeechSynthesis {
        speak(utterance: SpeechSynthesisUtterance): void;
    }

    interface SpeechSynthesisUtterance {
        lang: string;
        text: string;
    }
}

export { }; // Esto hace que el archivo sea un módulo y no un script global
