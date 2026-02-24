// hooks\useFlipHint.js

import { useState } from "react";

export function useFlipHint() {
  const [ui, setUi] = useState({ hasFlipped: false });

  function markFirstFlip() {
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

  return {
    ui,
    showHint: !ui.hasFlipped,
    markFirstFlip,
  };
}
