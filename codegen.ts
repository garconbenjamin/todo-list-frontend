import { CodegenConfig } from "@graphql-codegen/cli";

import { BACKEND_URL } from "./src/constant";

const config: CodegenConfig = {
  schema: BACKEND_URL + "/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
