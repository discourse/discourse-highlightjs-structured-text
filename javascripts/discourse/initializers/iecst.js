import { withPluginApi } from "discourse/lib/plugin-api";
import iecst from "../lib/iecst-highlightjs";

export default {
  name: "highlightjs-structured-text",
  initialize() {
    withPluginApi((api) => {
      api.registerHighlightJSLanguage("structured-text", iecst);
    });
  },
};
