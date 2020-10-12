// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),  /*comment out this line to disable the karma-chrome-launcher*/
      require('karma-phantomjs-launcher'),  /* add this line to disable the karma-phantomjs-launcher*/
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/GiftHub'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          //   '--remote-debugging-port=9222',
          //   '--enable-logging',
          //   '--user-data-dir=./karma-chrome',
          //   '--v=1',
          //   '--disable-background-timer-throttling',
          //   '--disable-renderer-backgrounding',
          '--proxy-bypass-list=*',
          '--proxy-server=\'http://<my org proxy server>:8080\''
        ]
      }
    },
    singleRun: true  /*make it true to run test suits only one time*/
  });
};

