import { withPluginApi } from "discourse/lib/plugin-api";
import iecst from "../lib/iecst-highlightjs";

export default {
  name: "highlightjs-iecst",
  initialize(container) {
    withPluginApi("1.4.0", (api) => {
      api.registerHighlightJSLanguage("iecst", iecst);
    });
  },
};