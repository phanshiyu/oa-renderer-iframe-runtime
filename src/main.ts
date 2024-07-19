import { connectToChild } from "penpal";
import {
  getData,
  obfuscateDocument,
  utils,
  v2,
} from "@govtechsg/open-attestation";

import RENDERER_TEMPLATE_RUNTIME from "./renderer-template-runtime.html?raw";
import DEMO_CERT from "./demo.json";

if (utils.isWrappedV2Document(DEMO_CERT)) {
  render(DEMO_CERT);
}

function render(oaDoc: v2.WrappedDocument) {
  // this can only be used when the child is connected
  let renderDocument: (template: string, data: any) => void | undefined;

  const iframe = document.createElement("iframe");
  iframe.srcdoc = RENDERER_TEMPLATE_RUNTIME;
  iframe.style.width = "100%";
  iframe.style.height = "100vh";
  iframe.style.border = "none";

  const connection = connectToChild({
    iframe,
    methods: {
      selectiveDisclosure(path: string) {
        oaDoc = obfuscateDocument(oaDoc, path);
        const data = getData(oaDoc);
        renderDocument(data.$template as string, data);
      },
    },
  });

  connection.promise.then((child) => {
    // register renderDocument from child
    renderDocument = (child as any).renderDocument;
    const data = getData(oaDoc);
    renderDocument(data.$template as string, data);
  });

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    document.body.appendChild(iframe);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(iframe);
    });
  }
}
