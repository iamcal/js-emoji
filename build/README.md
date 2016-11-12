# Cutting a new release

1. Make changes to `build/emoji.js.template`
2. Update the `emoji-data` sub-module: `cd build/emoji-data && git pull`
2. Rebuild the library with `grunt` in the root directory
3. Update version history in `CHANGES.md`
4. Put updated version number in `package.json`
5. Add a Git tag
6. Push to GitHub
