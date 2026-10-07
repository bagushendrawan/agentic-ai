import type { ModelOption } from "@openuidev/react-ui";

export const DEFAULT_MODEL = "z-ai/glm-5.3-flash";

// Per-model { light, dark } logo pairs — the switcher swaps them by theme.
const logo = {
  anthropic: {
    light: <img src="/logos/anthropic-light.svg" alt="" />,
    dark: <img src="/logos/anthropic-dark.svg" alt="" />,
  },
  openai: {
    light: <img src="/logos/openai-light.svg" alt="" />,
    dark: <img src="/logos/openai-dark.svg" alt="" />,
  },
  google: {
    light: <img src="/logos/google-light.svg" alt="" />,
    dark: <img src="/logos/google-dark.svg" alt="" />,
  },
  glm:{
    light: <img src="/logos/zai.webp" alt="" />,
    dark: <img src="/logos/zai.webp" alt="" />,
  }
};

// The app's model menu — `group` drives the dropdown sections, in this order.
export const MODEL_OPTIONS: ModelOption[] = [
  { id: "z-ai/glm-5.3-flash", name: "GLM 5.3 Flash", group: "GLM", logo: logo.glm },
];

const MODEL_IDS = new Set(MODEL_OPTIONS.map((model) => model.id));

/** Absent → default; unknown → null (the route rejects it). */
export function resolveRequestedModel(model: unknown): string | null {
  if (model === undefined || model === null || model === "") return DEFAULT_MODEL;
  return typeof model === "string" && MODEL_IDS.has(model) ? model : null;
}
