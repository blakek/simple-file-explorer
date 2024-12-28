import { useEffect } from "react";

export interface ShortcutRule {
  test: string | RegExp;
  handler: (event: KeyboardEvent) => void;
}

export function useKeyboardShortcuts(rules: ShortcutRule[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Prevent interfering with input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      for (const { test, handler } of rules) {
        const isMatch =
          (typeof test === "string" && event.key === test) ||
          (test instanceof RegExp && test.test(event.key));

        if (isMatch) {
          event.preventDefault();
          handler(event);
          break; // stop after the first match
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rules]);
}
