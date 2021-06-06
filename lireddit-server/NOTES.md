# Docs of things I learned during this build
## Package.json
- `ts-node` can be pointed to a TypeScript file, and it can directly run it. But this is bad because: slow (performance is laggy), and production setup is always to compile to JS and then run that. So best practice would be to mimic that setup in dev.
- `tsc -w` run compiler for TypeScript with the `-w` (watch) flag. Spits out a `dist` folder with the compiler JavaScript.
- `nodemon` automatically watches the files, and will re-run with the newly compiled code.
