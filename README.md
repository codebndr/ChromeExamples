# Chrome Examples

A set of examples on some chrome API calls and good ways of testing
them with selenium.

## Usage

Clone it

	git clone http://github.com/codebendercc/ChromeExamples
	cd ChromeExamples

Install dependencies with npm

	npm install

Run tests

	npm test

Selenium will fire up chrome, install the extension, run the tests
and finish. If chrome does not start within 10s it will time out. In
that case try again.

## What

The project currently tests message passing between the chrome
extension and a website. I found google's documentation and examples a
bit lacking in this area so I hope this helps.

## Where things live

The `extension` directory has the chrome extension and the `test`
directory contains the tests.
