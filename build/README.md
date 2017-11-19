# Cutting a new release

1. Make changes to `build/emoji.js.template`
2. Update the `emoji-data` sub-module: `cd build/emoji-data && git pull`, update dependency in `package.json`
3. Rebuild the library with `grunt` in the root directory
4. Update version history in `CHANGES.md`
5. Put updated version number in `package.json`
6. Merge PR on GitHub
7. Add a Git tag
8. `npm publish`
