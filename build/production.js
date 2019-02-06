const Bundler = require('parcel-bundler');
const common = require('./common');

const options = {
  watch: false,
  contentHash: false,
  minify: true,
  hmr: false,
  sourceMaps: false,
};

(async function () {
  const bundler = new Bundler(common.entries, options);

  bundler.on('bundled', common.renameManifest);

  const bundle = await bundler.bundle();
})();
