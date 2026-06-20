"use client";

import { useEffect, useRef } from "react";

const CvPrintTrigger = () => {
  const hasAutoPrinted = useRef(false);

  useEffect(() => {
    if (hasAutoPrinted.current) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("print") !== "1") {
      return;
    }

    hasAutoPrinted.current = true;

    const timeout = window.setTimeout(() => {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.hash}`,
      );
      window.print();
    }, 250);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default CvPrintTrigger;
