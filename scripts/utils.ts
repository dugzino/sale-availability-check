export const files = {
  searchParams: {
    module: './src/config/search-params.ts',
    importDir: ({ fileName }) => `../websites-services/${fileName}`,
    schema: './src/config/search-params.schema.json',
  },
}
