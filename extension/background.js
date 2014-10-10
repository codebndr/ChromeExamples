console.log("Stuff and things");
chrome.runtime.onMessageExternal.addListener(
	function (req, sender, sendResp) {
		console.log("Rsponding 1");
		if (req == 1)
			sendResp('hello from 1');
	});

chrome.runtime.onMessageExternal.addListener(
	function (req, sender, sendResp) {
		console.log("Rsponding 2");
		if (req == 2)
			sendResp('hello from 2');
	});

chrome.runtime.onConnectExternal.addListener(function (port) {
	console.log("posting message.");
	if (port.name == 'muuuuu')
		port.onMessage.addListener(function (msg) {
			port.postMessage('Connector 1: you said ' + msg);
		});
});


chrome.runtime.onConnectExternal.addListener(function (port) {
	console.log("posting message.");
	if (port.name == 'kokoko')
		port.onMessage.addListener(function (msg) {
			port.postMessage('Connector 2: you said ' + msg);
		});
});

chrome.runtime.onConnectExternal.addListener(function (port) {
	console.log("posting message.");
	if (port.name == 'woof')
		port.onMessage.addListener(function (msg) {
			port.postMessage('Connector 3: you said ' + msg);
		});x
});
