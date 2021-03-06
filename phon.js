/*
 * @Author: hwaphon
 * @Date:   2016-12-17 15:21:28
 * @Last Modified by:   hwaphon
 * @Last Modified time: 2016-12-17 22:18:33
 */

(function() {

	if (!window.phon) {
		window["phon"] = {};
	}

	function getPageWidth() {
		var pageWidth = window.innerWidth;

		if (typeof pageWidth != "number") {
			if (document.compatMode == "CSS1Compat") {
				pageWidth = document.documentElement.clientWidth;
			} else {
				pageWidth = document.body.clientWidth;
			}
		}

		return pageWidth;
	}

	function getPageHeight() {
		var pageHeight = window.innerHeight;

		if (typeof pageHeight != "number") {
			if (document.compatMode == "CSS1Compat") {
				pageHeight = document.documentElement.clientHeight;
			} else {
				pageHeight = document.body.clientHeight;
			}
		}

		return pageHeight;
	}

	function addHandler(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	}

	function removeHandler(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}

	function getEvent(event) {
		return event ? event : window.event;
	}

	function getTarget(event) {
		event = getEvent(event);
		return event.target || event.srcElement;
	}

	function preventDefault(event) {
		event = getEvent(event);

		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}

	function stopPropagation(event) {
		event = getEvent(event);

		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}

	// for mousedown and mouseup event
	function getMouseButton(event) {
		event = getEvent(event);

		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;

				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
				default:
					// no logic here
			}
		}
	}

	function getCharCode(event) {
		event = getEvent(event);
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	}

	function ready(handle) {
		
	}

	addFunction("getPageWidth", getPageWidth);
	addFunction("getPageHeight", getPageHeight);
	addFunction("addHandler", addHandler);
	addFunction("removeHandler", removeHandler);
	addFunction("getEvent", getEvent);
	addFunction("getTarget", getTarget);
	addFunction("preventDefault", preventDefault);
	addFunction("stopPropagation", stopPropagation);
	addFunction("getMouseButton", getMouseButton);
	addFunction("getCharCode", getCharCode);

	function addFunction(name, handler) {
		window["phon"][name] = handler;
	}
})();
