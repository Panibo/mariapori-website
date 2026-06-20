"use client";

import { useEffect, useRef } from "react";

type PrintCvButtonProps = {
  autoPrintFromQuery?: boolean;
  children: React.ReactNode;
  className?: string;
};

const PrintCvButton = ({
  autoPrintFromQuery = false,
  children,
  className,
}: PrintCvButtonProps) => {
  const hasAutoPrinted = useRef(false);

  const printCv = () => {
    window.print();
  };

  useEffect(() => {
    if (!autoPrintFromQuery || hasAutoPrinted.current) {
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
  }, [autoPrintFromQuery]);

  return (
    <button className={className} type="button" onClick={printCv}>
      {children}
    </button>
  );
};

export default PrintCvButton;
