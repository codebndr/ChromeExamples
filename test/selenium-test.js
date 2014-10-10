var assert = require('chai').assert,
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    chromedriver = require('selenium-webdriver/chrome');

// @param extensions: string of unpacked extension path to install.
function chrome_driver(extension) {
	var logperfs = new webdriver.logging.Preferences(),
			opts = new chromedriver.Options().
				addArguments("--load-extension=" + extension ||
										 '../extension');

	logperfs.setLevel(webdriver.logging.Type.BROWSER,
										webdriver.logging.Level.ALL);

	var chrome = new webdriver.Builder().
				withCapabilities(webdriver.Capabilities.chrome()).
				setChromeOptions(opts).
				setLoggingPrefs(logperfs).
				build();

	chrome.manage().timeouts().pageLoadTimeout(5000);
	return chrome;
}

function browser_logs(driver, callback) {
	driver.manage().logs().
		get(webdriver.logging.Type.BROWSER).then(callback);
}

function show_new_logs (driver) {
	if (!show_new_logs.logs) show_new_logs.logs = [];
	browser_logs(driver, function (lgs) {
		if(show_new_logs.logs.length < lgs.length) {
			lgs.slice(show_new_logs.logs).forEach(function (msg) {
				console.log("BrowserLog: " + msg.message);
			});
		}
	});
}


function get_elements(driver, css) {
	return driver.findElements(webdriver.By.css(css));
}

function wait_for(driver, css, cb) {
	return driver.wait((function (driver, css) {
		show_new_logs(driver);
		return driver.isElementPresent(webdriver.By.css(css));
	}).bind(null, driver, css), 3000, 'Took too long for extension to answer.').
		then(function () {
			get_elements(driver, css).then(function (el) {
				cb(el);
			});
		});
};

test.describe('Test', function() {
	var chrome;
	this.timeout(10000);

	test.before(function() {
		chrome = chrome_driver("extension");
	});

	test.it("Test messages", function () {
		chrome.get("http://localhost:8088/test/index.html").
			then( function () {
				// Test messages
				wait_for(chrome, 'ul#messages li', function (ele) {
					ele[0].getText().then(function (txt) {assert.match(txt, /.*hello from 2.*/, "Can't receve messages");});
				});

				// Test connections
				wait_for(chrome, 'ul#connections li', function (ele) {
					ele[0].getText().then(function (txt) {
						assert.match(txt, /.*Connector 2.*/, "Connected to the wrong place.");
					});
				});
			});
	});

	test.after(function() {
		chrome.quit();
	});
});
