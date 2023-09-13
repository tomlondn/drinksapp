module.exports = (config) => {
  /*   Hilfsvariablen, um zwischen schneller lokaler Entwicklung ("Development") und optimierter
  Erzeugung des Codes, der tatsächlich online gestellt wird ("Production"), zu unterscheiden.  */
  const isProduction = config.env === 'production';

  /*   Nur nötig, wenn man OpenProps nutzt. Sorgt dafür, dass nur die Variablen
  in der CSS-Datei landen, die auch benutzt werden. */
  const postcssJitProps = require('postcss-jit-props');
  const OpenProps = require('open-props');

  /* Konvertiert so weit wie möglich neuen in alten CSS-Syntax,
  Mögliche Optionen für postcssPresetEnv:
  https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options */
  const postcssPresetEnv = require('postcss-preset-env');

  const plugins = [postcssJitProps(OpenProps), postcssPresetEnv()];

  if (isProduction) {
    // Optimiere (verkleinere) Dateien nur im Production-Modus.
    plugins.push(require('cssnano'));
  }

  return {
    plugins,
    map: {
      inline: false,
    },
  };
};
