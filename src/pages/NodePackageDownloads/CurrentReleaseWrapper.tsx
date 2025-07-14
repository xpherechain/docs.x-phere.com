import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import CurrentRelease from "./CurrentRelease";

export default function CurrentReleaseWrapper(props) {
  return (
    <BrowserOnly fallback={<div className="loader" />}>
      {() => <CurrentRelease {...props} />}
    </BrowserOnly>
  );
}
