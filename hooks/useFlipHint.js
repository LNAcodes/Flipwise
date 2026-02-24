// hooks\useFlipHint.js

// speicher state im localstorage, so das nach reload noch vorhanden
import useLocalStorageState from "use-local-storage-state";

// name des states im localStorage
const STORAGE_KEY = "flashcards-ui";

export function useFlipHint() {
  // ui = object , das den aktueller Zustand speichert
  // setUi = funktion, die den state ändert
  // defaultValue = wenn noch nicht localstorage gespeichert nimm 'false'
  const [ui, setUi] = useLocalStorageState(STORAGE_KEY, {
    defaultValue: { hasFlipped: false },
  });

  const showHint = !ui.hasFlipped; // kann true oder false sein. bei true zeige hint bei false nicht

  function markFirstFlip() {
    // prev =  bisherige zustand aus localstorage/state
    setUi((prev) => {
      // wenn schon mal geflipt wurde, mache nichts
      if (prev.hasFlipped === true) {
        return prev;
      }

      // wenn noch nicht geflipt wurde setzte hasFlipped auf 'true'
      return {
        ...prev,
        hasFlipped: true,
      };
    });
  }

  return { ui, showHint, markFirstFlip };
}
