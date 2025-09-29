process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/preamble.js',
      'lib/emoji.js',
      'test/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      "lib/*.js": "coverage"
    },
    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    },
    reporters: ['coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: false,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      },
    },
    singleRun: false,
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage'
    ],
    client: {
      jasmine: {
        random: false
      }
    }
  })
}
