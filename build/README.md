# Cutting a new release

1. Make changes to `build/emoji.js.template`
2. Update the `emoji-data` sub-module: `cd build/emoji-data && git pull`, update dependency in `package.json`
3. Rebuild the library with `npm run build` in the root directory
4. Update version history in `CHANGES.md`
5. Put updated version number in `package.json`
6. Merge PR on GitHub
7. Add a Git tag
8. `npm publish`


## Build options

`build.php [--tpl=<tpl>] [--skip-nq]`

* `--tpl=<tpl>` - provide a custom template to build from, instead of the default `build/emoji.js.template`
* `--skip-nq` - skip conversion of non qualified emoji bytes. This avoids matching plain characters like © as an emoji.
