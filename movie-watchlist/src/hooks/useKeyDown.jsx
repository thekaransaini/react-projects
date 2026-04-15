import { useEffect } from "react";

function useKeyDown(key, action) {
  useEffect(
    function () {
      function callBackFunc(event) {
        if (event.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callBackFunc);

      return () => {
        document.removeEventListener("keydown", callBackFunc);
      };
    },
    [key, action],
  );
}

export { useKeyDown };
