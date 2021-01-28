export const files = {
  searchParams: {
    module: './src/config/search-params.ts',
    importDir: ({ fileName }) => `../services/websites/${fileName}`,
    schema: './src/config/search-params.schema.json',
  },
}
