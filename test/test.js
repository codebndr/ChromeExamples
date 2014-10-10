function log(id, msg) {
	var ele = document.getElementById(id);
	if (!ele) {
		ele = document.createElement('ul');
		ele.id = id;
		document.body.appendChild(ele);
	}

	ele.innerHTML += '<li>' + msg + '</li>';
}

window.onload = function () {
	// Ask from the 2nd listner
  chrome.runtime.sendMessage("aglnljndihallpoagagoemaopeonpmfk", 2, function (msg) {
    if (msg) {
      log("messages", "Receviced: " + msg);
    } else {
      throw chrome.runtime.lastError;
    }
  });

	var port = chrome.runtime.connect("aglnljndihallpoagagoemaopeonpmfk", {name: 'kokoko'});

	port.postMessage('good morning');
	port.onMessage.addListener( function (msg) {
		log('connections', msg);
	});
};
