export const APP_NAME = "";
export const APP_ID = "";

export const Permissions = {
  sample: "sample",
  nested: {
    sample: "nested.sample",
  },
} as const;

export type Permission =
  | (typeof Permissions)["sample"]
  | (typeof Permissions)["nested"][keyof (typeof Permissions)["nested"]];
