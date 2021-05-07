process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/preamble.js',
      'lib/emoji.min.js',
      'test/*.js'
    ],
    exclude: [
    ],
    reporters: ['story'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: 1,
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-story-reporter',
    ]
  })
}
