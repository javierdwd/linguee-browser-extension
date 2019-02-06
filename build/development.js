const Bundler = require('parcel-bundler');
const common = require('./common');

const options = {
  watch: true,
  contentHash: false,
  minify: false,
  hmr: false,
  sourceMaps: true,
};

(async function () {
  const bundler = new Bundler(common.entries, options);

  bundler.on('bundled', common.renameManifest);

  const bundle = await bundler.bundle();
})();
