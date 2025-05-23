(function(window, undefined) {
	var document = window.document;
	document.createElement("video");
	document.createElement("audio");
	var VideoJS = function(id, addOptions, ready) {
		var tag;
		if (typeof id == "string") {
			if (id.indexOf("#") === 0) {
				id = id.slice(1)
			}
			if (_V_.players[id]) {
				return _V_.players[id]
			} else {
				tag = _V_.el(id)
			}
		} else {
			tag = id
		}
		if (!tag || !tag.nodeName) {
			throw new TypeError("The element or ID supplied is not valid. (VideoJS)")
		}
		return tag.player || new _V_.Player(tag,addOptions,ready)
	}
	, _V_ = VideoJS
	, CDN_VERSION = "3.2";
	VideoJS.players = {};
	VideoJS.options = {
		techOrder: ["html5", "flash"],
		html5: {},
		flash: {
			swf: "http://vjs.zencdn.net/c/video-js.swf"
		},
		width: "auto",
		height: "auto",
		defaultVolume: 0,
			components: {
				posterImage: {},
				textTrackDisplay: {},
				loadingSpinner: {},
				bigPlayButton: {},
				controlBar: {}
			}
	};
	if (CDN_VERSION != "GENERATED_CDN_VSN") {
		_V_.options.flash.swf = "http://vjs.zencdn.net/" + CDN_VERSION + "/video-js.swf"
	}
	_V_.merge = function(obj1, obj2, safe) {
		if (!obj2) {
			obj2 = {}
		}
		for (var attrname in obj2) {
			if (obj2.hasOwnProperty(attrname) && (!safe || !obj1.hasOwnProperty(attrname))) {
				obj1[attrname] = obj2[attrname]
			}
		}
		return obj1
	}
	;
	_V_.extend = function(obj) {
		this.merge(this, obj, true)
	}
	;
	_V_.extend({
		tech: {},
		controlSets: {},
		isIE: function() {
			return !+"\v1"
		},
		isFF: function() {
			return !!_V_.ua.match("Firefox")
		},
		isIPad: function() {
			return navigator.userAgent.match(/iPad/i) !== null
		},
		isIPhone: function() {
			return navigator.userAgent.match(/iPhone/i) !== null
		},
		isIOS: function() {
			return VideoJS.isIPhone() || VideoJS.isIPad()
		},
		iOSVersion: function() {
			var match = navigator.userAgent.match(/OS (\d+)_/i);
			if (match && match[1]) {
				return match[1]
			}
		},
		isAndroid: function() {
			return navigator.userAgent.match(/Android.*AppleWebKit/i) !== null
		},
		androidVersion: function() {
			var match = navigator.userAgent.match(/Android (\d+)\./i);
			if (match && match[1]) {
				return match[1]
			}
		},
		testVid: document.createElement("video"),
			   ua: navigator.userAgent,
			   support: {},
			   each: function(arr, fn) {
				   if (!arr || arr.length === 0) {
					   return
				   }
				   for (var i = 0, j = arr.length; i < j; i++) {
					   fn.call(this, arr[i], i)
				   }
			   },
			   eachProp: function(obj, fn) {
				   if (!obj) {
					   return
				   }
				   for (var name in obj) {
					   if (obj.hasOwnProperty(name)) {
						   fn.call(this, name, obj[name])
					   }
				   }
			   },
			   el: function(id) {
				   return document.getElementById(id)
			   },
			   createElement: function(tagName, attributes) {
				   var el = document.createElement(tagName), attrname;
				   for (attrname in attributes) {
					   if (attributes.hasOwnProperty(attrname)) {
						   if (attrname.indexOf("-") !== -1) {
							   el.setAttribute(attrname, attributes[attrname])
						   } else {
							   el[attrname] = attributes[attrname]
						   }
					   }
				   }
				   return el
			   },
			   insertFirst: function(node, parent) {
				   if (parent.firstChild) {
					   parent.insertBefore(node, parent.firstChild)
				   } else {
					   parent.appendChild(node)
				   }
			   },
			   addClass: function(element, classToAdd) {
				   if ((" " + element.className + " ").indexOf(" " + classToAdd + " ") == -1) {
					   element.className = element.className === "" ? classToAdd : element.className + " " + classToAdd
				   }
			   },
			   removeClass: function(element, classToRemove) {
				   if (element.className.indexOf(classToRemove) == -1) {
					   return
				   }
				   var classNames = element.className.split(" ");
				   classNames.splice(classNames.indexOf(classToRemove), 1);
				   element.className = classNames.join(" ")
			   },
			   remove: function(item, array) {
				   if (!array) {
					   return
				   }
				   var i = array.indexOf(item);
				   if (i != -1) {
					   return array.splice(i, 1)
				   }
			   },
			   blockTextSelection: function() {
				   document.body.focus();
				   document.onselectstart = function() {
					   return false
				   }
			   },
			   unblockTextSelection: function() {
				   document.onselectstart = function() {
					   return true
				   }
			   },
			   formatTime: function(seconds, guide) {
				   guide = guide || seconds;
				   var s = Math.floor(seconds % 60)
				   , m = Math.floor(seconds / 60 % 60)
				   , h = Math.floor(seconds / 3600)
				   , gm = Math.floor(guide / 60 % 60)
				   , gh = Math.floor(guide / 3600);
				   h = (h > 0 || gh > 0) ? h + ":" : "";
				   m = (((h || gm >= 10) && m < 10) ? "0" + m : m) + ":";
				   s = (s < 10) ? "0" + s : s;
				   return h + m + s
			   },
			   uc: function(string) {
				   return string.charAt(0).toUpperCase() + string.slice(1)
			   },
			   getRelativePosition: function(x, relativeElement) {
				   return Math.max(0, Math.min(1, (x - _V_.findPosX(relativeElement)) / relativeElement.offsetWidth))
			   },
			   getComputedStyleValue: function(element, style) {
				   return window.getComputedStyle(element, null).getPropertyValue(style)
			   },
			   trim: function(string) {
				   return string.toString().replace(/^\s+/, "").replace(/\s+$/, "")
			   },
			   round: function(num, dec) {
				   if (!dec) {
					   dec = 0
				   }
				   return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
			   },
			   isEmpty: function(object) {
				   for (var prop in object) {
					   return false
				   }
				   return true
			   },
			   createTimeRange: function(start, end) {
				   return {
					   length: 1,
			start: function() {
				return start
			},
			end: function() {
				return end
			}
				   }
			   },
			   cache: {},
			   guid: 1,
			   expando: "vdata" + (new Date).getTime(),
			   getData: function(elem) {
				   var id = elem[_V_.expando];
				   if (!id) {
					   id = elem[_V_.expando] = _V_.guid++;
					   _V_.cache[id] = {}
				   }
				   return _V_.cache[id]
			   },
			   removeData: function(elem) {
				   var id = elem[_V_.expando];
				   if (!id) {
					   return
				   }
				   delete _V_.cache[id];
				   try {
					   delete elem[_V_.expando]
				   } catch (e) {
					   if (elem.removeAttribute) {
						   elem.removeAttribute(_V_.expando)
					   } else {
						   elem[_V_.expando] = null
					   }
				   }
			   },
			   proxy: function(context, fn, uid) {
				   if (!fn.guid) {
					   fn.guid = _V_.guid++
				   }
				   var ret = function() {
					   return fn.apply(context, arguments)
				   };
				   ret.guid = (uid) ? uid + "_" + fn.guid : fn.guid;
				   return ret
			   },
			   get: function(url, onSuccess, onError) {
				   var local = (url.indexOf("file:") == 0 || (window.location.href.indexOf("file:") == 0 && url.indexOf("http:") == -1));
				   if (typeof XMLHttpRequest == "undefined") {
					   XMLHttpRequest = function() {
						   try {
							   return new ActiveXObject("Msxml2.XMLHTTP.6.0")
						   } catch (e) {}
						   try {
							   return new ActiveXObject("Msxml2.XMLHTTP.3.0")
						   } catch (f) {}
						   try {
							   return new ActiveXObject("Msxml2.XMLHTTP")
						   } catch (g) {}
						   throw new Error("This browser does not support XMLHttpRequest.")
					   }
				   }
				   var request = new XMLHttpRequest();
				   try {
					   request.open("GET", url)
				   } catch (e) {
					   _V_.log("VideoJS XMLHttpRequest (open)", e);
					   return false
				   }
				   request.onreadystatechange = _V_.proxy(this, function() {
					   if (request.readyState == 4) {
						   if (request.status == 200 || local && request.status == 0) {
							   onSuccess(request.responseText)
						   } else {
							   if (onError) {
								   onError()
							   }
						   }
					   }
				   });
				   try {
					   request.send()
				   } catch (e) {
					   _V_.log("VideoJS XMLHttpRequest (send)", e);
					   if (onError) {
						   onError(e)
					   }
				   }
			   },
			   setLocalStorage: function(key, value) {
				   var localStorage = window.localStorage || false;
				   if (!localStorage) {
					   return
				   }
				   try {
					   localStorage[key] = value
				   } catch (e) {
					   if (e.code == 22 || e.code == 1014) {
						   _V_.log("LocalStorage Full (VideoJS)", e)
					   } else {
						   _V_.log("LocalStorage Error (VideoJS)", e)
					   }
				   }
			   },
			   getAbsoluteURL: function(url) {
				   if (!url.match(/^https?:\/\//)) {
					   url = _V_.createElement("div", {
						   innerHTML: '<a href="' + url + '">x</a>'
					   }).firstChild.href
				   }
				   return url
			   }
	});
	_V_.log = function() {
		_V_.log.history = _V_.log.history || [];
		_V_.log.history.push(arguments);
		if (window.console) {
			arguments.callee = arguments.callee.caller;
			var newarr = [].slice.call(arguments);
			(typeof console.log === "object" ? _V_.log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr))
		}
	}
	;
	(function(b) {
		function c() {}
		for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop(); ) {
			b[a] = b[a] || c
		}
	}
	)((function() {
		try {
			console.log();
			return window.console
		} catch (err) {
			return window.console = {}
		}
	}
	)());
	if ("getBoundingClientRect"in document.documentElement) {
		_V_.findPosX = function(el) {
			var box;
			try {
				box = el.getBoundingClientRect()
			} catch (e) {}
			if (!box) {
				return 0
			}
			var docEl = document.documentElement
			, body = document.body
			, clientLeft = docEl.clientLeft || body.clientLeft || 0
			, scrollLeft = window.pageXOffset || body.scrollLeft
			, left = box.left + scrollLeft - clientLeft;
			return left
		}
	} else {
		_V_.findPosX = function(el) {
			var curleft = el.offsetLeft;
			while (el = obj.offsetParent) {
				if (el.className.indexOf("video-js") == -1) {} else {}
				curleft += el.offsetLeft
			}
			return curleft
		}
	}
	(function() {
		var initializing = false
		, fnTest = /xyz/.test(function() {
			xyz
		}) ? /\b_super\b/ : /.*/;
		_V_.Class = function() {}
		;
		_V_.Class.extend = function(prop) {
			var _super = this.prototype;
			initializing = true;
			var prototype = new this();
			initializing = false;
			for (var name in prop) {
				prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
					return function() {
						var tmp = this._super;
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret
					}
				}
				)(name, prop[name]) : prop[name]
			}
			function Class() {
				if (!initializing && this.init) {
					return this.init.apply(this, arguments)
				} else {
					if (!initializing) {
						return arguments.callee.prototype.init()
					}
				}
			}
			Class.prototype = prototype;
			Class.constructor = Class;
			Class.extend = arguments.callee;
			return Class
		}
	}
	)();
	_V_.Component = _V_.Class.extend({
		init: function(player, options) {
			this.player = player;
			options = this.options = _V_.merge(this.options || {}, options);
			if (options.el) {
				this.el = options.el
			} else {
				this.el = this.createElement()
			}
			this.initComponents()
		},
		destroy: function() {},
									 createElement: function(type, attrs) {
										 return _V_.createElement(type || "div", attrs)
									 },
									 buildCSSClass: function() {
										 return ""
									 },
									 initComponents: function() {
										 var options = this.options;
										 if (options && options.components) {
											 this.eachProp(options.components, function(name, opts) {
												 var tempAdd = this.proxy(function() {
													 this[name] = this.addComponent(name, opts)
												 });
												 if (opts.loadEvent) {
													 this.one(opts.loadEvent, tempAdd)
												 } else {
													 tempAdd()
												 }
											 })
										 }
									 },
									 addComponent: function(name, options) {
										 var component, componentClass;
										 if (typeof name == "string") {
											 options = options || {};
											 componentClass = options.componentClass || _V_.uc(name);
											 component = new _V_[componentClass](this.player || this,options)
										 } else {
											 component = name
										 }
										 this.el.appendChild(component.el);
										 return component
									 },
									 removeComponent: function(component) {
										 this.el.removeChild(component.el)
									 },
									 show: function() {
										 this.el.style.display = "block"
									 },
									 hide: function() {
										 this.el.style.display = "none"
									 },
									 fadeIn: function() {
										 this.removeClass("vjs-fade-out");
										 this.addClass("vjs-fade-in")
									 },
									 fadeOut: function() {
										 this.removeClass("vjs-fade-in");
										 this.addClass("vjs-fade-out")
									 },
									 lockShowing: function() {
										 var style = this.el.style;
										 style.display = "block";
										 style.opacity = 1;
										 style.visiblity = "visible"
									 },
									 unlockShowing: function() {
										 var style = this.el.style;
										 style.display = "";
										 style.opacity = "";
										 style.visiblity = ""
									 },
									 addClass: function(classToAdd) {
										 _V_.addClass(this.el, classToAdd)
									 },
									 removeClass: function(classToRemove) {
										 _V_.removeClass(this.el, classToRemove)
									 },
									 addEvent: function(type, fn, uid) {
										 return _V_.addEvent(this.el, type, _V_.proxy(this, fn))
									 },
									 removeEvent: function(type, fn) {
										 return _V_.removeEvent(this.el, type, fn)
									 },
									 triggerEvent: function(type, e) {
										 return _V_.triggerEvent(this.el, type, e)
									 },
									 one: function(type, fn) {
										 _V_.one(this.el, type, _V_.proxy(this, fn))
									 },
									 ready: function(fn) {
										 if (!fn) {
											 return this
										 }
										 if (this.isReady) {
											 fn.call(this)
										 } else {
											 if (this.readyQueue === undefined) {
												 this.readyQueue = []
											 }
											 this.readyQueue.push(fn)
										 }
										 return this
									 },
									 triggerReady: function() {
										 this.isReady = true;
										 if (this.readyQueue && this.readyQueue.length > 0) {
											 this.each(this.readyQueue, function(fn) {
												 fn.call(this)
											 });
											 this.readyQueue = [];
											 this.triggerEvent("ready")
										 }
									 },
									 each: function(arr, fn) {
										 _V_.each.call(this, arr, fn)
									 },
									 eachProp: function(obj, fn) {
										 _V_.eachProp.call(this, obj, fn)
									 },
									 extend: function(obj) {
										 _V_.merge(this, obj)
									 },
									 proxy: function(fn, uid) {
										 return _V_.proxy(this, fn, uid)
									 }
	});
	_V_.Control = _V_.Component.extend({
		buildCSSClass: function() {
			return "vjs-control " + this._super()
		}
	});
	_V_.ControlBar = _V_.Component.extend({
		options: {
			loadEvent: "play",
			components: {
				playToggle: {},
				fullscreenToggle: {},
				currentTimeDisplay: {},
				timeDivider: {},
				durationDisplay: {},
				remainingTimeDisplay: {},
				progressControl: {},
				volumeControl: {},
				muteToggle: {}
			}
		},
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("play", this.proxy(function() {
				this.fadeIn();
				this.player.addEvent("mouseover", this.proxy(this.fadeIn));
				this.player.addEvent("mouseout", this.proxy(this.fadeOut))
			}))
		},
		createElement: function() {
			return _V_.createElement("div", {
				className: "vjs-controls"
			})
		},
		fadeIn: function() {
			this._super();
			this.player.triggerEvent("controlsvisible")
		},
		fadeOut: function() {
			this._super();
			this.player.triggerEvent("controlshidden")
		},
		lockShowing: function() {
			this.el.style.opacity = "1"
		}
	});
	_V_.Button = _V_.Control.extend({
		init: function(player, options) {
			this._super(player, options);
			this.addEvent("click", this.onClick);
			this.addEvent("focus", this.onFocus);
			this.addEvent("blur", this.onBlur)
		},
		createElement: function(type, attrs) {
			attrs = _V_.merge({
				className: this.buildCSSClass(),
							  innerHTML: '<div><span class="vjs-control-text">' + (this.buttonText || "Need Text") + "</span></div>",
							  role: "button",
							  tabIndex: 0
			}, attrs);
			return this._super(type, attrs)
		},
		onClick: function() {},
									onFocus: function() {
										_V_.addEvent(document, "keyup", _V_.proxy(this, this.onKeyPress))
									},
									onKeyPress: function(event) {
										if (event.which == 32 || event.which == 13) {
											event.preventDefault();
											this.onClick()
										}
									},
									onBlur: function() {
										_V_.removeEvent(document, "keyup", _V_.proxy(this, this.onKeyPress))
									}
	});
	_V_.PlayButton = _V_.Button.extend({
		buttonText: "Play",
		buildCSSClass: function() {
			return "vjs-play-button " + this._super()
		},
		onClick: function() {
			this.player.play()
		}
	});
	_V_.PauseButton = _V_.Button.extend({
		buttonText: "Pause",
		buildCSSClass: function() {
			return "vjs-pause-button " + this._super()
		},
		onClick: function() {
			this.player.pause()
		}
	});
	_V_.PlayToggle = _V_.Button.extend({
		buttonText: "Play",
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("play", _V_.proxy(this, this.onPlay));
			player.addEvent("pause", _V_.proxy(this, this.onPause))
		},
		buildCSSClass: function() {
			return "vjs-play-control " + this._super()
		},
		onClick: function() {
			if (this.player.paused()) {
				this.player.play()
			} else {
				this.player.pause()
			}
		},
		onPlay: function() {
			_V_.removeClass(this.el, "vjs-paused");
			_V_.addClass(this.el, "vjs-playing")
		},
		onPause: function() {
			_V_.removeClass(this.el, "vjs-playing");
			_V_.addClass(this.el, "vjs-paused")
		}
	});
	_V_.FullscreenToggle = _V_.Button.extend({
		buttonText: "Fullscreen",
		buildCSSClass: function() {
			return "vjs-fullscreen-control " + this._super()
		},
		onClick: function() {
			if (!this.player.isFullScreen) {
				this.player.requestFullScreen()
			} else {
				this.player.cancelFullScreen()
			}
		}
	});
	_V_.BigPlayButton = _V_.Button.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("play", _V_.proxy(this, this.hide));
			player.addEvent("ended", _V_.proxy(this, this.show))
		},
		createElement: function() {
			return this._super("div", {
				className: "vjs-big-play-button",
				innerHTML: "<span></span>"
			})
		},
		onClick: function() {
			if (this.player.currentTime()) {
				this.player.currentTime(0)
			}
			this.player.play()
		}
	});
	_V_.LoadingSpinner = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("canplay", _V_.proxy(this, this.hide));
			player.addEvent("canplaythrough", _V_.proxy(this, this.hide));
			player.addEvent("playing", _V_.proxy(this, this.hide));
			player.addEvent("seeking", _V_.proxy(this, this.show));
			player.addEvent("error", _V_.proxy(this, this.show));
			player.addEvent("waiting", _V_.proxy(this, this.show))
		},
		createElement: function() {
			var classNameSpinner, innerHtmlSpinner;
			if (typeof this.player.el.style.WebkitBorderRadius == "string" || typeof this.player.el.style.MozBorderRadius == "string" || typeof this.player.el.style.KhtmlBorderRadius == "string" || typeof this.player.el.style.borderRadius == "string") {
				classNameSpinner = "vjs-loading-spinner";
				innerHtmlSpinner = "<div class='ball1'></div><div class='ball2'></div><div class='ball3'></div><div class='ball4'></div><div class='ball5'></div><div class='ball6'></div><div class='ball7'></div><div class='ball8'></div>"
			} else {
				classNameSpinner = "vjs-loading-spinner-fallback";
				innerHtmlSpinner = ""
			}
			return this._super("div", {
				className: classNameSpinner,
				innerHTML: innerHtmlSpinner
			})
		}
	});
	_V_.CurrentTimeDisplay = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("timeupdate", _V_.proxy(this, this.updateContent))
		},
		createElement: function() {
			var el = this._super("div", {
				className: "vjs-current-time vjs-time-controls vjs-control"
			});
			this.content = _V_.createElement("div", {
				className: "vjs-current-time-display",
				innerHTML: "0:00"
			});
			el.appendChild(_V_.createElement("div").appendChild(this.content));
			return el
		},
		updateContent: function() {
			var time = (this.player.scrubbing) ? this.player.values.currentTime : this.player.currentTime();
			this.content.innerHTML = _V_.formatTime(time, this.player.duration())
		}
	});
	_V_.DurationDisplay = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("timeupdate", _V_.proxy(this, this.updateContent))
		},
		createElement: function() {
			var el = this._super("div", {
				className: "vjs-duration vjs-time-controls vjs-control"
			});
			this.content = _V_.createElement("div", {
				className: "vjs-duration-display",
				innerHTML: "0:00"
			});
			el.appendChild(_V_.createElement("div").appendChild(this.content));
			return el
		},
		updateContent: function() {
			if (this.player.duration()) {
				this.content.innerHTML = _V_.formatTime(this.player.duration())
			}
		}
	});
	_V_.TimeDivider = _V_.Component.extend({
		createElement: function() {
			return this._super("div", {
				className: "vjs-time-divider",
				innerHTML: "<div><span>/</span></div>"
			})
		}
	});
	_V_.RemainingTimeDisplay = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("timeupdate", _V_.proxy(this, this.updateContent))
		},
		createElement: function() {
			var el = this._super("div", {
				className: "vjs-remaining-time vjs-time-controls vjs-control"
			});
			this.content = _V_.createElement("div", {
				className: "vjs-remaining-time-display",
				innerHTML: "-0:00"
			});
			el.appendChild(_V_.createElement("div").appendChild(this.content));
			return el
		},
		updateContent: function() {
			if (this.player.duration()) {
				this.content.innerHTML = "-" + _V_.formatTime(this.player.remainingTime())
			}
		}
	});
	_V_.Slider = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent(this.playerEvent, _V_.proxy(this, this.update));
			this.addEvent("mousedown", this.onMouseDown);
			this.addEvent("focus", this.onFocus);
			this.addEvent("blur", this.onBlur);
			this.player.addEvent("controlsvisible", this.proxy(this.update));
			this.update()
		},
		createElement: function(type, attrs) {
			attrs = _V_.merge({
				role: "slider",
				"aria-valuenow": 0,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				tabIndex: 0
			}, attrs);
			return this._super(type, attrs)
		},
		onMouseDown: function(event) {
			event.preventDefault();
			_V_.blockTextSelection();
			_V_.addEvent(document, "mousemove", _V_.proxy(this, this.onMouseMove));
			_V_.addEvent(document, "mouseup", _V_.proxy(this, this.onMouseUp));
			this.onMouseMove(event)
		},
		onMouseUp: function(event) {
			_V_.unblockTextSelection();
			_V_.removeEvent(document, "mousemove", this.onMouseMove, false);
			_V_.removeEvent(document, "mouseup", this.onMouseUp, false);
			this.update()
		},
		update: function() {
			var barProgress, progress = this.getPercent();
			handle = this.handle,
			bar = this.bar;
			if (isNaN(progress)) {
				progress = 0
			}
			barProgress = progress;
			if (handle) {
				var box = this.el
				, boxWidth = box.offsetWidth
				, handleWidth = handle.el.offsetWidth
				, handlePercent = (handleWidth) ? handleWidth / boxWidth : 0
				, boxAdjustedPercent = 1 - handlePercent;
				adjustedProgress = progress * boxAdjustedPercent,
				barProgress = adjustedProgress + (handlePercent / 2);
				handle.el.style.left = _V_.round(adjustedProgress * 100, 2) + "%"
			}
			bar.el.style.width = _V_.round(barProgress * 100, 2) + "%"
		},
		calculateDistance: function(event) {
			var box = this.el
			, boxX = _V_.findPosX(box)
			, boxW = box.offsetWidth
			, handle = this.handle;
			if (handle) {
				var handleW = handle.el.offsetWidth;
				boxX = boxX + (handleW / 2);
				boxW = boxW - handleW
			}
			return Math.max(0, Math.min(1, (event.pageX - boxX) / boxW))
		},
		onFocus: function(event) {
			_V_.addEvent(document, "keyup", _V_.proxy(this, this.onKeyPress))
		},
		onKeyPress: function(event) {
			if (event.which == 37) {
				event.preventDefault();
				this.stepBack()
			} else {
				if (event.which == 39) {
					event.preventDefault();
					this.stepForward()
				}
			}
		},
		onBlur: function(event) {
			_V_.removeEvent(document, "keyup", _V_.proxy(this, this.onKeyPress))
		}
	});
	_V_.ProgressControl = _V_.Component.extend({
		options: {
			components: {
				seekBar: {}
			}
		},
		createElement: function() {
			return this._super("div", {
				className: "vjs-progress-control vjs-control"
			})
		}
	});
	_V_.SeekBar = _V_.Slider.extend({
		options: {
			components: {
				loadProgressBar: {},
				bar: {
					componentClass: "PlayProgressBar"
				},
				handle: {
					componentClass: "SeekHandle"
				}
			}
		},
		playerEvent: "timeupdate",
		init: function(player, options) {
			this._super(player, options)
		},
		createElement: function() {
			return this._super("div", {
				className: "vjs-progress-holder"
			})
		},
		getPercent: function() {
			return this.player.currentTime() / this.player.duration()
		},
		onMouseDown: function(event) {
			this._super(event);
			this.player.scrubbing = true;
			this.videoWasPlaying = !this.player.paused();
			this.player.pause()
		},
		onMouseMove: function(event) {
			var newTime = this.calculateDistance(event) * this.player.duration();
			if (newTime == this.player.duration()) {
				newTime = newTime - 0.1
			}
			this.player.currentTime(newTime)
		},
		onMouseUp: function(event) {
			this._super(event);
			this.player.scrubbing = false;
			if (this.videoWasPlaying) {
				this.player.play()
			}
		},
		stepForward: function() {
			this.player.currentTime(this.player.currentTime() + 1)
		},
		stepBack: function() {
			this.player.currentTime(this.player.currentTime() - 1)
		}
	});
	_V_.LoadProgressBar = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("progress", _V_.proxy(this, this.update))
		},
		createElement: function() {
			return this._super("div", {
				className: "vjs-load-progress",
				innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
			})
		},
		update: function() {
			if (this.el.style) {
				this.el.style.width = _V_.round(this.player.bufferedPercent() * 100, 2) + "%"
			}
		}
	});
	_V_.PlayProgressBar = _V_.Component.extend({
		createElement: function() {
			return this._super("div", {
				className: "vjs-play-progress",
				innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
			})
		}
	});
	_V_.SeekHandle = _V_.Component.extend({
		createElement: function() {
			return this._super("div", {
				className: "vjs-seek-handle",
				innerHTML: '<span class="vjs-control-text">00:00</span>'
			})
		}
	});
	_V_.VolumeControl = _V_.Component.extend({
		options: {
			components: {
				volumeBar: {}
			}
		},
		createElement: function() {
			return this._super("div", {
				className: "vjs-volume-control vjs-control"
			})
		}
	});
	_V_.VolumeBar = _V_.Slider.extend({
		options: {
			components: {
				bar: {
					componentClass: "VolumeLevel"
				},
				handle: {
					componentClass: "VolumeHandle"
				}
			}
		},
		playerEvent: "volumechange",
		createElement: function() {
			return this._super("div", {
				className: "vjs-volume-bar"
			})
		},
		onMouseMove: function(event) {
			this.player.volume(this.calculateDistance(event))
		},
		getPercent: function() {
			return this.player.volume()
		},
		stepForward: function() {
			this.player.volume(this.player.volume() + 0.1)
		},
		stepBack: function() {
			this.player.volume(this.player.volume() - 0.1)
		}
	});
	_V_.VolumeLevel = _V_.Component.extend({
		createElement: function() {
			return this._super("div", {
				className: "vjs-volume-level",
				innerHTML: '<span class="vjs-control-text"></span>'
			})
		}
	});
	_V_.VolumeHandle = _V_.Component.extend({
		createElement: function() {
			return this._super("div", {
				className: "vjs-volume-handle",
				innerHTML: '<span class="vjs-control-text"></span>'
			})
		}
	});
	_V_.MuteToggle = _V_.Button.extend({
		init: function(player, options) {
			this._super(player, options);
			player.addEvent("volumechange", _V_.proxy(this, this.update))
		},
		createElement: function() {
			return this._super("div", {
				className: "vjs-mute-control vjs-control",
				innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
			})
		},
		onClick: function(event) {
			this.player.muted(this.player.muted() ? false : true)
		},
		update: function(event) {
			var vol = this.player.volume()
			, level = 3;
			if (vol == 0 || this.player.muted()) {
				level = 0
			} else {
				if (vol < 0.33) {
					level = 1
				} else {
					if (vol < 0.67) {
						level = 2
					}
				}
			}
			_V_.each.call(this, [0, 1, 2, 3], function(i) {
				_V_.removeClass(this.el, "vjs-vol-" + i)
			});
			_V_.addClass(this.el, "vjs-vol-" + level)
		}
	});
	_V_.PosterImage = _V_.Button.extend({
		init: function(player, options) {
			this._super(player, options);
			if (!this.player.options.poster) {
				this.hide()
			}
			player.addEvent("play", _V_.proxy(this, this.hide))
		},
		createElement: function() {
			return _V_.createElement("img", {
				className: "vjs-poster",
				src: this.player.options.poster,
				tabIndex: -1
			})
		},
		onClick: function() {
			this.player.play()
		}
	});
	_V_.Menu = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options)
		},
		addItem: function(component) {
			this.addComponent(component);
			component.addEvent("click", this.proxy(function() {
				this.unlockShowing()
			}))
		},
		createElement: function() {
			return this._super("ul", {
				className: "vjs-menu"
			})
		}
	});
	_V_.MenuItem = _V_.Button.extend({
		init: function(player, options) {
			this._super(player, options);
			if (options.selected) {
				this.addClass("vjs-selected")
			}
		},
		createElement: function(type, attrs) {
			return this._super("li", _V_.merge({
				className: "vjs-menu-item",
				innerHTML: this.options.label
			}, attrs))
		},
		onClick: function() {
			this.selected(true)
		},
		selected: function(selected) {
			if (selected) {
				this.addClass("vjs-selected")
			} else {
				this.removeClass("vjs-selected")
			}
		}
	});
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement) {
			if (this === void 0 || this === null) {
				throw new TypeError()
			}
			var t = Object(this);
			var len = t.length >>> 0;
			if (len === 0) {
				return -1
			}
			var n = 0;
			if (arguments.length > 0) {
				n = Number(arguments[1]);
				if (n !== n) {
					n = 0
				} else {
					if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
						n = (n > 0 || -1) * Math.floor(Math.abs(n))
					}
				}
			}
			if (n >= len) {
				return -1
			}
			var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k
				}
			}
			return -1
		}
	}
	_V_.extend({
		addEvent: function(elem, type, fn) {
			var data = _V_.getData(elem), handlers;
			if (data && !data.handler) {
				data.handler = function(event) {
					event = _V_.fixEvent(event);
					var handlers = _V_.getData(elem).events[event.type];
					if (handlers) {
						var handlersCopy = [];
						_V_.each(handlers, function(handler, i) {
							handlersCopy[i] = handler
						});
						for (var i = 0, l = handlersCopy.length; i < l; i++) {
							handlersCopy[i].call(elem, event)
						}
					}
				}
			}
			if (!data.events) {
				data.events = {}
			}
			handlers = data.events[type];
			if (!handlers) {
				handlers = data.events[type] = [];
				if (document.addEventListener) {
					elem.addEventListener(type, data.handler, false)
				} else {
					if (document.attachEvent) {
						elem.attachEvent("on" + type, data.handler)
					}
				}
			}
			if (!fn.guid) {
				fn.guid = _V_.guid++
			}
			handlers.push(fn)
		},
		removeEvent: function(elem, type, fn) {
			var data = _V_.getData(elem), handlers;
			if (!data.events) {
				return
			}
			if (!type) {
				for (type in data.events) {
					_V_.cleanUpEvents(elem, type)
				}
				return
			}
			handlers = data.events[type];
			if (!handlers) {
				return
			}
			if (fn && fn.guid) {
				for (var i = 0; i < handlers.length; i++) {
					if (handlers[i].guid === fn.guid) {
						handlers.splice(i--, 1)
					}
				}
			}
			_V_.cleanUpEvents(elem, type)
		},
		cleanUpEvents: function(elem, type) {
			var data = _V_.getData(elem);
			if (data.events[type].length === 0) {
				delete data.events[type];
				if (document.removeEventListener) {
					elem.removeEventListener(type, data.handler, false)
				} else {
					if (document.detachEvent) {
						elem.detachEvent("on" + type, data.handler)
					}
				}
			}
			if (_V_.isEmpty(data.events)) {
				delete data.events;
				delete data.handler
			}
			if (_V_.isEmpty(data)) {
				_V_.removeData(elem)
			}
		},
		fixEvent: function(event) {
			if (event[_V_.expando]) {
				return event
			}
			var originalEvent = event;
			event = new _V_.Event(originalEvent);
			for (var i = _V_.Event.props.length, prop; i; ) {
				prop = _V_.Event.props[--i];
				event[prop] = originalEvent[prop]
			}
			if (!event.target) {
				event.target = event.srcElement || document
			}
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode
			}
			if (!event.relatedTarget && event.fromElement) {
				event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement
			}
			if (event.pageX == null && event.clientX != null) {
				var eventDocument = event.target.ownerDocument || document
				, doc = eventDocument.documentElement
				, body = eventDocument.body;
				event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
				event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
			}
			if (event.which == null && (event.charCode != null || event.keyCode != null)) {
				event.which = event.charCode != null ? event.charCode : event.keyCode
			}
			if (!event.metaKey && event.ctrlKey) {
				event.metaKey = event.ctrlKey
			}
			if (!event.which && event.button !== undefined) {
				event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)))
			}
			return event
		},
		triggerEvent: function(elem, event) {
			var data = _V_.getData(elem), parent = elem.parentNode || elem.ownerDocument, type = event.type || event, handler;
			if (data) {
				handler = data.handler
			}
			event = typeof event === "object" ? event[_V_.expando] ? event : new _V_.Event(type,event) : new _V_.Event(type);
			event.type = type;
			if (handler) {
				handler.call(elem, event)
			}
			event.result = undefined;
			event.target = elem
		},
		one: function(elem, type, fn) {
			_V_.addEvent(elem, type, function() {
				_V_.removeEvent(elem, type, arguments.callee);
				fn.apply(this, arguments)
			})
		}
	});
	_V_.Event = function(src, props) {
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse
		} else {
			this.type = src
		}
		if (props) {
			_V_.merge(this, props)
		}
		this.timeStamp = (new Date).getTime();
		this[_V_.expando] = true
	}
	;
	_V_.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = returnTrue;
			var e = this.originalEvent;
			if (!e) {
				return
			}
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}
		},
 stopPropagation: function() {
	 this.isPropagationStopped = returnTrue;
	 var e = this.originalEvent;
	 if (!e) {
		 return
	 }
	 if (e.stopPropagation) {
		 e.stopPropagation()
	 }
	 e.cancelBubble = true
 },
 stopImmediatePropagation: function() {
	 this.isImmediatePropagationStopped = returnTrue;
	 this.stopPropagation()
 },
 isDefaultPrevented: returnFalse,
 isPropagationStopped: returnFalse,
 isImmediatePropagationStopped: returnFalse
	};
	_V_.Event.props = "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");
	function returnTrue() {
		return true
	}
	function returnFalse() {
		return false
	}
	var JSON;
	if (!JSON) {
		JSON = {}
	}
	(function() {
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		if (typeof JSON.parse !== "function") {
			JSON.parse = function(text, reviver) {
				var j;
				function walk(holder, key) {
					var k, v, value = holder[key];
					if (value && typeof value === "object") {
						for (k in value) {
							if (Object.prototype.hasOwnProperty.call(value, k)) {
								v = walk(value, k);
								if (v !== undefined) {
									value[k] = v
								} else {
									delete value[k]
								}
							}
						}
					}
					return reviver.call(holder, key, value)
				}
				text = String(text);
				cx.lastIndex = 0;
				if (cx.test(text)) {
					text = text.replace(cx, function(a) {
						return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
					})
				}
				if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
					j = eval("(" + text + ")");
					return typeof reviver === "function" ? walk({
						"": j
					}, "") : j
				}
				throw new SyntaxError("JSON.parse")
			}
		}
	}());
	_V_.Player = _V_.Component.extend({
		init: function(tag, addOptions, ready) {
			this.tag = tag;
			var el = this.el = _V_.createElement("div")
			, options = this.options = {}
			, width = options.width = tag.getAttribute("width")
			, height = options.height = tag.getAttribute("height")
			, initWidth = width || 300
			, initHeight = height || 150;
			tag.player = el.player = this;
			this.ready(ready);
			tag.parentNode.insertBefore(el, tag);
			el.appendChild(tag);
			el.id = this.id = tag.id;
			el.className = tag.className;
			tag.id += "_html5_api";
			tag.className = "vjs-tech";
			_V_.players[el.id] = this;
			el.setAttribute("width", initWidth);
			el.setAttribute("height", initHeight);
			el.style.width = initWidth + "px";
			el.style.height = initHeight + "px";
			tag.removeAttribute("width");
			tag.removeAttribute("height");
			_V_.merge(options, _V_.options);
			_V_.merge(options, this.getVideoTagSettings());
			_V_.merge(options, addOptions);
			tag.removeAttribute("controls");
			tag.removeAttribute("poster");
			if (tag.hasChildNodes()) {
				for (var i = 0, j = tag.childNodes; i < j.length; i++) {
					if (j[i].nodeName == "SOURCE" || j[i].nodeName == "TRACK") {
						tag.removeChild(j[i])
					}
				}
			}
			this.values = {};
			this.addClass("vjs-paused");
			this.addEvent("ended", this.onEnded);
			this.addEvent("play", this.onPlay);
			this.addEvent("pause", this.onPause);
			this.addEvent("progress", this.onProgress);
			this.addEvent("error", this.onError);
			if (options.controls) {
				this.ready(function() {
					this.initComponents()
				})
			}
			this.textTracks = [];
			if (options.tracks && options.tracks.length > 0) {
				this.addTextTracks(options.tracks)
			}
			if (!options.sources || options.sources.length == 0) {
				for (var i = 0, j = options.techOrder; i < j.length; i++) {
					var techName = j[i]
					, tech = _V_[techName];
					if (tech.isSupported()) {
						this.loadTech(techName);
						break
					}
				}
			} else {
				this.src(options.sources)
			}
		},
		values: {},
		destroy: function() {
			this.stopTrackingProgress();
			this.stopTrackingCurrentTime();
			_V_.players[this.id] = null;
			delete _V_.players[this.id];
			this.tech.destroy();
			this.el.parentNode.removeChild(this.el)
		},
		createElement: function(type, options) {},
									  getVideoTagSettings: function() {
										  var options = {
											  sources: [],
											  tracks: []
										  };
										  options.src = this.tag.getAttribute("src");
										  options.controls = this.tag.getAttribute("controls") !== null;
										  options.poster = this.tag.getAttribute("poster");
										  options.preload = this.tag.getAttribute("preload");
										  options.autoplay = this.tag.getAttribute("autoplay") !== null;
										  options.loop = this.tag.getAttribute("loop") !== null;
										  options.muted = this.tag.getAttribute("muted") !== null;
										  if (this.tag.hasChildNodes()) {
											  for (var c, i = 0, j = this.tag.childNodes; i < j.length; i++) {
												  c = j[i];
												  if (c.nodeName == "SOURCE") {
													  options.sources.push({
														  src: c.getAttribute("src"),
																		   type: c.getAttribute("type"),
																		   media: c.getAttribute("media"),
																		   title: c.getAttribute("title")
													  })
												  }
												  if (c.nodeName == "TRACK") {
													  options.tracks.push({
														  src: c.getAttribute("src"),
																		  kind: c.getAttribute("kind"),
																		  srclang: c.getAttribute("srclang"),
																		  label: c.getAttribute("label"),
																		  "default": c.getAttribute("default") !== null,
																		  title: c.getAttribute("title")
													  })
												  }
											  }
										  }
										  return options
									  },
									  loadTech: function(techName, source) {
										  if (this.tech) {
											  this.unloadTech()
										  } else {
											  if (techName != "html5" && this.tag) {
												  this.el.removeChild(this.tag);
												  this.tag = false
											  }
										  }
										  this.techName = techName;
										  this.isReady = false;
										  var techReady = function() {
											  this.player.triggerReady();
											  if (!this.support.progressEvent) {
												  this.player.manualProgressOn()
											  }
											  if (!this.support.timeupdateEvent) {
												  this.player.manualTimeUpdatesOn()
											  }
										  };
										  var techOptions = _V_.merge({
											  source: source,
											  parentEl: this.el
										  }, this.options[techName]);
										  if (source) {
											  if (source.src == this.values.src && this.values.currentTime > 0) {
												  techOptions.startTime = this.values.currentTime
											  }
											  this.values.src = source.src
										  }
										  this.tech = new _V_[techName](this,techOptions);
										  this.tech.ready(techReady)
									  },
									  unloadTech: function() {
										  this.tech.destroy();
										  if (this.manualProgress) {
											  this.manualProgressOff()
										  }
										  if (this.manualTimeUpdates) {
											  this.manualTimeUpdatesOff()
										  }
										  this.tech = false
									  },
									  manualProgressOn: function() {
										  this.manualProgress = true;
										  this.trackProgress();
										  this.tech.addEvent("progress", function() {
											  this.removeEvent("progress", arguments.callee);
											  this.support.progressEvent = true;
											  this.player.manualProgressOff()
										  })
									  },
									  manualProgressOff: function() {
										  this.manualProgress = false;
										  this.stopTrackingProgress()
									  },
									  trackProgress: function() {
										  this.progressInterval = setInterval(_V_.proxy(this, function() {
											  if (this.values.bufferEnd < this.buffered().end(0)) {
												  this.triggerEvent("progress")
											  } else {
												  if (this.bufferedPercent() == 1) {
													  this.stopTrackingProgress();
													  this.triggerEvent("progress")
												  }
											  }
										  }), 500)
									  },
									  stopTrackingProgress: function() {
										  clearInterval(this.progressInterval)
									  },
									  manualTimeUpdatesOn: function() {
										  this.manualTimeUpdates = true;
										  this.addEvent("play", this.trackCurrentTime);
										  this.addEvent("pause", this.stopTrackingCurrentTime);
										  this.tech.addEvent("timeupdate", function() {
											  this.removeEvent("timeupdate", arguments.callee);
											  this.support.timeupdateEvent = true;
											  this.player.manualTimeUpdatesOff()
										  })
									  },
									  manualTimeUpdatesOff: function() {
										  this.manualTimeUpdates = false;
										  this.stopTrackingCurrentTime();
										  this.removeEvent("play", this.trackCurrentTime);
										  this.removeEvent("pause", this.stopTrackingCurrentTime)
									  },
									  trackCurrentTime: function() {
										  if (this.currentTimeInterval) {
											  this.stopTrackingCurrentTime()
										  }
										  this.currentTimeInterval = setInterval(_V_.proxy(this, function() {
											  this.triggerEvent("timeupdate")
										  }), 250)
									  },
									  stopTrackingCurrentTime: function() {
										  clearInterval(this.currentTimeInterval)
									  },
									  onEnded: function() {
										  if (this.options.loop) {
											  this.currentTime(0);
											  this.play()
										  } else {
											  this.pause();
											  this.currentTime(0);
											  this.pause()
										  }
									  },
									  onPlay: function() {
										  _V_.removeClass(this.el, "vjs-paused");
										  _V_.addClass(this.el, "vjs-playing")
									  },
									  onPause: function() {
										  _V_.removeClass(this.el, "vjs-playing");
										  _V_.addClass(this.el, "vjs-paused")
									  },
									  onProgress: function() {
										  if (this.bufferedPercent() == 1) {
											  this.triggerEvent("loadedalldata")
										  }
									  },
									  onError: function(e) {
										  _V_.log("Video Error", e)
									  },
									  techCall: function(method, arg) {
										  if (!this.tech.isReady) {
											  this.tech.ready(function() {
												  this[method](arg)
											  })
										  } else {
											  try {
												  this.tech[method](arg)
											  } catch (e) {
												  _V_.log(e)
											  }
										  }
									  },
									  techGet: function(method) {
										  if (this.tech.isReady) {
											  try {
												  return this.tech[method]()
											  } catch (e) {
												  if (this.tech[method] === undefined) {
													  _V_.log("Video.js: " + method + " method not defined for " + this.techName + " playback technology.", e)
												  } else {
													  if (e.name == "TypeError") {
														  _V_.log("Video.js: " + method + " unavailable on " + this.techName + " playback technology element.", e);
														  this.tech.isReady = false
													  } else {
														  _V_.log(e)
													  }
												  }
											  }
										  }
										  return
									  },
									  play: function() {
										  this.techCall("play");
										  return this
									  },
									  pause: function() {
										  this.techCall("pause");
										  return this
									  },
									  paused: function() {
										  return (this.techGet("paused") === false) ? false : true
									  },
									  currentTime: function(seconds) {
										  if (seconds !== undefined) {
											  this.values.lastSetCurrentTime = seconds;
											  this.techCall("setCurrentTime", seconds);
											  if (this.manualTimeUpdates) {
												  this.triggerEvent("timeupdate")
											  }
											  return this
										  }
										  return this.values.currentTime = (this.techGet("currentTime") || 0)
									  },
									  duration: function() {
										  return parseFloat(this.techGet("duration"))
									  },
									  remainingTime: function() {
										  return this.duration() - this.currentTime()
									  },
									  buffered: function() {
										  var buffered = this.techGet("buffered"), start = 0, end = this.values.bufferEnd = this.values.bufferEnd || 0, timeRange;
										  if (buffered && buffered.length > 0 && buffered.end(0) !== end) {
											  end = buffered.end(0);
											  this.values.bufferEnd = end
										  }
										  return _V_.createTimeRange(start, end)
									  },
									  bufferedPercent: function() {
										  return (this.duration()) ? this.buffered().end(0) / this.duration() : 0
									  },
									  volume: function(percentAsDecimal) {
										  var vol;
										  if (percentAsDecimal !== undefined) {
											  vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal)));
											  this.values.volume = vol;
											  this.techCall("setVolume", vol);
											  _V_.setLocalStorage("volume", vol);
											  return this
										  }
										  vol = parseFloat(this.techGet("volume"));
										  return (isNaN(vol)) ? 1 : vol
									  },
									  muted: function(muted) {
										  if (muted !== undefined) {
											  this.techCall("setMuted", muted);
											  return this
										  }
										  return this.techGet("muted") || false
									  },
									  width: function(width, skipListeners) {
										  if (width !== undefined) {
											  this.el.width = width;
											  this.el.style.width = width + "px";
											  if (!skipListeners) {
												  this.triggerEvent("resize")
											  }
											  return this
										  }
										  return parseInt(this.el.getAttribute("width"))
									  },
									  height: function(height) {
										  if (height !== undefined) {
											  this.el.height = height;
											  this.el.style.height = height + "px";
											  this.triggerEvent("resize");
											  return this
										  }
										  return parseInt(this.el.getAttribute("height"))
									  },
									  size: function(width, height) {
										  return this.width(width, true).height(height)
									  },
									  supportsFullScreen: function() {
										  return this.techGet("supportsFullScreen") || false
									  },
									  requestFullScreen: function() {
										  var requestFullScreen = _V_.support.requestFullScreen;
										  this.isFullScreen = true;
										  if (requestFullScreen) {
											  _V_.addEvent(document, requestFullScreen.eventName, this.proxy(function() {
												  this.isFullScreen = document[requestFullScreen.isFullScreen];
												  if (this.isFullScreen == false) {
													  _V_.removeEvent(document, requestFullScreen.eventName, arguments.callee)
												  }
												  this.triggerEvent("fullscreenchange")
											  }));
											  if (this.tech.support.fullscreenResize === false && this.options.flash.iFrameMode != true) {
												  this.pause();
												  this.unloadTech();
												  _V_.addEvent(document, requestFullScreen.eventName, this.proxy(function() {
													  _V_.removeEvent(document, requestFullScreen.eventName, arguments.callee);
													  this.loadTech(this.techName, {
														  src: this.values.src
													  })
												  }));
												  this.el[requestFullScreen.requestFn]()
											  } else {
												  this.el[requestFullScreen.requestFn]()
											  }
										  } else {
											  if (this.tech.supportsFullScreen()) {
												  this.triggerEvent("fullscreenchange");
												  this.techCall("enterFullScreen")
											  } else {
												  this.triggerEvent("fullscreenchange");
												  this.enterFullWindow()
											  }
										  }
										  return this
									  },
									  cancelFullScreen: function() {
										  var requestFullScreen = _V_.support.requestFullScreen;
										  this.isFullScreen = false;
										  if (requestFullScreen) {
											  if (this.tech.support.fullscreenResize === false && this.options.flash.iFrameMode != true) {
												  this.pause();
												  this.unloadTech();
												  _V_.addEvent(document, requestFullScreen.eventName, this.proxy(function() {
													  _V_.removeEvent(document, requestFullScreen.eventName, arguments.callee);
													  this.loadTech(this.techName, {
														  src: this.values.src
													  })
												  }));
												  document[requestFullScreen.cancelFn]()
											  } else {
												  document[requestFullScreen.cancelFn]()
											  }
										  } else {
											  if (this.tech.supportsFullScreen()) {
												  this.techCall("exitFullScreen");
												  this.triggerEvent("fullscreenchange")
											  } else {
												  this.exitFullWindow();
												  this.triggerEvent("fullscreenchange")
											  }
										  }
										  return this
									  },
									  enterFullWindow: function() {
										  this.isFullWindow = true;
										  this.docOrigOverflow = document.documentElement.style.overflow;
										  _V_.addEvent(document, "keydown", _V_.proxy(this, this.fullWindowOnEscKey));
										  document.documentElement.style.overflow = "hidden";
										  _V_.addClass(document.body, "vjs-full-window");
										  _V_.addClass(this.el, "vjs-fullscreen");
										  this.triggerEvent("enterFullWindow")
									  },
									  fullWindowOnEscKey: function(event) {
										  if (event.keyCode == 27) {
											  if (this.isFullScreen == true) {
												  this.cancelFullScreen()
											  } else {
												  this.exitFullWindow()
											  }
										  }
									  },
									  exitFullWindow: function() {
										  this.isFullWindow = false;
										  _V_.removeEvent(document, "keydown", this.fullWindowOnEscKey);
										  document.documentElement.style.overflow = this.docOrigOverflow;
										  _V_.removeClass(document.body, "vjs-full-window");
										  _V_.removeClass(this.el, "vjs-fullscreen");
										  this.triggerEvent("exitFullWindow")
									  },
									  selectSource: function(sources) {
										  for (var i = 0, j = this.options.techOrder; i < j.length; i++) {
											  var techName = j[i]
											  , tech = _V_[techName];
											  if (tech.isSupported()) {
												  for (var a = 0, b = sources; a < b.length; a++) {
													  var source = b[a];
													  if (tech.canPlaySource.call(this, source)) {
														  return {
															  source: source,
															  tech: techName
														  }
													  }
												  }
											  }
										  }
										  return false
									  },
									  src: function(source) {
										  if (source instanceof Array) {
											  var sourceTech = this.selectSource(source), source, techName;
											  if (sourceTech) {
												  source = sourceTech.source;
												  techName = sourceTech.tech;
												  if (techName == this.techName) {
													  this.src(source)
												  } else {
													  this.loadTech(techName, source)
												  }
											  } else {
												  _V_.log("No compatible source and playback technology were found.")
											  }
										  } else {
											  if (source instanceof Object) {
												  if (_V_[this.techName].canPlaySource(source)) {
													  this.src(source.src)
												  } else {
													  this.src([source])
												  }
											  } else {
												  this.values.src = source;
												  if (!this.isReady) {
													  this.ready(function() {
														  this.src(source)
													  })
												  } else {
													  this.techCall("src", source);
													  if (this.options.preload == "auto") {
														  this.load()
													  }
													  if (this.options.autoplay) {
														  this.play()
													  }
												  }
											  }
										  }
										  return this
									  },
									  load: function() {
										  this.techCall("load");
										  return this
									  },
									  currentSrc: function() {
										  return this.techGet("currentSrc") || this.values.src || ""
									  },
									  preload: function(value) {
										  if (value !== undefined) {
											  this.techCall("setPreload", value);
											  this.options.preload = value;
											  return this
										  }
										  return this.techGet("preload")
									  },
									  autoplay: function(value) {
										  if (value !== undefined) {
											  this.techCall("setAutoplay", value);
											  this.options.autoplay = value;
											  return this
										  }
										  return this.techGet("autoplay", value)
									  },
									  loop: function(value) {
										  if (value !== undefined) {
											  this.techCall("setLoop", value);
											  this.options.loop = value;
											  return this
										  }
										  return this.techGet("loop")
									  },
									  controls: function() {
										  return this.options.controls
									  },
									  poster: function() {
										  return this.techGet("poster")
									  },
									  error: function() {
										  return this.techGet("error")
									  },
									  ended: function() {
										  return this.techGet("ended")
									  }
	});
	(function() {
		var requestFn, cancelFn, eventName, isFullScreen, playerProto = _V_.Player.prototype;
		if (document.cancelFullscreen !== undefined) {
			requestFn = "requestFullscreen";
			cancelFn = "exitFullscreen";
			eventName = "fullscreenchange";
			isFullScreen = "fullScreen"
		} else {
			_V_.each(["moz", "webkit"], function(prefix) {
				if ((prefix != "moz" || document.mozFullScreenEnabled) && document[prefix + "CancelFullScreen"] !== undefined) {
					requestFn = prefix + "RequestFullScreen";
					cancelFn = prefix + "CancelFullScreen";
					eventName = prefix + "fullscreenchange";
					if (prefix == "webkit") {
						isFullScreen = prefix + "IsFullScreen"
					} else {
						isFullScreen = prefix + "FullScreen"
					}
				}
			})
		}
		if (requestFn) {
			_V_.support.requestFullScreen = {
				requestFn: requestFn,
				cancelFn: cancelFn,
				eventName: eventName,
				isFullScreen: isFullScreen
			}
		}
	}
	)();
	_V_.PlaybackTech = _V_.Component.extend({
		init: function(player, options) {},
											onClick: function() {
												if (this.player.options.controls) {
													_V_.PlayToggle.prototype.onClick.call(this)
												}
											}
	});
	_V_.apiMethods = "play,pause,paused,currentTime,setCurrentTime,duration,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted".split(",");
	_V_.each(_V_.apiMethods, function(methodName) {
		_V_.PlaybackTech.prototype[methodName] = function() {
			throw new Error("The '" + methodName + "' method is not available on the playback technology's API")
		}
	});
	_V_.html5 = _V_.PlaybackTech.extend({
		init: function(player, options, ready) {
			this.player = player;
			this.el = this.createElement();
			this.ready(ready);
			this.addEvent("click", this.proxy(this.onClick));
			var source = options.source;
			if (source && this.el.currentSrc == source.src) {
				player.triggerEvent("loadstart")
			} else {
				if (source) {
					this.el.src = source.src
				}
			}
			player.ready(function() {
				if (this.options.autoplay && this.paused()) {
					this.tag.poster = null;
					this.play()
				}
			});
			this.setupTriggers();
			this.triggerReady()
		},
		destroy: function() {
			this.player.tag = false;
			this.removeTriggers();
			this.el.parentNode.removeChild(this.el)
		},
		createElement: function() {
			var html5 = _V_.html5, player = this.player, el = player.tag, newEl;
			if (!el || this.support.movingElementInDOM === false) {
				if (el) {
					player.el.removeChild(el)
				}
				newEl = _V_.createElement("video", {
					id: el.id || player.el.id + "_html5_api",
					className: el.className || "vjs-tech"
				});
				el = newEl;
				_V_.insertFirst(el, player.el)
			}
			_V_.each(["autoplay", "preload", "loop", "muted"], function(attr) {
				if (player.options[attr] !== null) {
					el[attr] = player.options[attr]
				}
			}, this);
			return el
		},
		setupTriggers: function() {
			_V_.each.call(this, _V_.html5.events, function(type) {
				_V_.addEvent(this.el, type, _V_.proxy(this.player, this.eventHandler))
			})
		},
		removeTriggers: function() {
			_V_.each.call(this, _V_.html5.events, function(type) {
				_V_.removeEvent(this.el, type, _V_.proxy(this.player, this.eventHandler))
			})
		},
		eventHandler: function(e) {
			e.stopPropagation();
			this.triggerEvent(e)
		},
		play: function() {
			this.el.play()
		},
		pause: function() {
			this.el.pause()
		},
		paused: function() {
			return this.el.paused
		},
		currentTime: function() {
			return this.el.currentTime
		},
		setCurrentTime: function(seconds) {
			try {
				this.el.currentTime = seconds
			} catch (e) {
				_V_.log(e, "Video isn't ready. (VideoJS)")
			}
		},
		duration: function() {
			return this.el.duration || 0
		},
		buffered: function() {
			return this.el.buffered
		},
		volume: function() {
			return this.el.volume
		},
		setVolume: function(percentAsDecimal) {
			this.el.volume = percentAsDecimal
		},
		muted: function() {
			return this.el.muted
		},
		setMuted: function(muted) {
			this.el.muted = muted
		},
		width: function() {
			return this.el.offsetWidth
		},
		height: function() {
			return this.el.offsetHeight
		},
		supportsFullScreen: function() {
			if (typeof this.el.webkitEnterFullScreen == "function") {
				if (!navigator.userAgent.match("Chrome") && !navigator.userAgent.match("Mac OS X 10.5")) {
					return true
				}
			}
			return false
		},
		enterFullScreen: function() {
			try {
				this.el.webkitEnterFullScreen()
			} catch (e) {
				if (e.code == 11) {
					_V_.log("VideoJS: Video not ready.")
				}
			}
		},
		src: function(src) {
			this.el.src = src
		},
		load: function() {
			this.el.load()
		},
		currentSrc: function() {
			return this.el.currentSrc
		},
		preload: function() {
			return this.el.preload
		},
		setPreload: function(val) {
			this.el.preload = val
		},
		autoplay: function() {
			return this.el.autoplay
		},
		setAutoplay: function(val) {
			this.el.autoplay = val
		},
		loop: function() {
			return this.el.loop
		},
		setLoop: function(val) {
			this.el.loop = val
		},
		error: function() {
			return this.el.error
		},
		seeking: function() {
			return this.el.seeking
		},
		ended: function() {
			return this.el.ended
		},
		controls: function() {
			return this.player.options.controls
		},
		defaultMuted: function() {
			return this.el.defaultMuted
		}
	});
	_V_.html5.isSupported = function() {
		return !!document.createElement("video").canPlayType
	}
	;
	_V_.html5.canPlaySource = function(srcObj) {
		return !!document.createElement("video").canPlayType(srcObj.type)
	}
	;
	_V_.html5.events = "loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(",");
	_V_.html5.prototype.support = {
		fullscreen: (typeof _V_.testVid.webkitEnterFullScreen !== undefined) ? (!_V_.ua.match("Chrome") && !_V_.ua.match("Mac OS X 10.5") ? true : false) : false,
 movingElementInDOM: !_V_.isIOS()
	};
	if (_V_.isAndroid()) {
		if (_V_.androidVersion() < 3) {
			document.createElement("video").constructor.prototype.canPlayType = function(type) {
				return (type && type.toLowerCase().indexOf("video/mp4") != -1) ? "maybe" : ""
			}
		}
	}
	_V_.flash = _V_.PlaybackTech.extend({
		init: function(player, options) {
			this.player = player;
			var source = options.source
			, parentEl = options.parentEl
			, placeHolder = this.el = _V_.createElement("div", {
				id: parentEl.id + "_temp_flash"
			})
			, objId = player.el.id + "_flash_api"
			, playerOptions = player.options
			, flashVars = _V_.merge({
				readyFunction: "_V_.flash.onReady",
				eventProxyFunction: "_V_.flash.onEvent",
				errorEventProxyFunction: "_V_.flash.onError",
				autoplay: playerOptions.autoplay,
				preload: playerOptions.preload,
				loop: playerOptions.loop,
				muted: playerOptions.muted
			}, options.flashVars)
			, params = _V_.merge({
				wmode: "opaque",
				bgcolor: "#000000"
			}, options.params)
			, attributes = _V_.merge({
				id: objId,
				name: objId,
				"class": "vjs-tech"
			}, options.attributes);
			if (source) {
				flashVars.src = encodeURIComponent(_V_.getAbsoluteURL(source.src))
			}
			_V_.insertFirst(placeHolder, parentEl);
			if (options.startTime) {
				this.ready(function() {
					this.load();
					this.play();
					this.currentTime(options.startTime)
				})
			}
			if (options.iFrameMode == true && !_V_.isFF) {
				var iFrm = _V_.createElement("iframe", {
					id: objId + "_iframe",
					name: objId + "_iframe",
					className: "vjs-tech",
					scrolling: "no",
					marginWidth: 0,
					marginHeight: 0,
					frameBorder: 0
				});
				flashVars.readyFunction = "ready";
				flashVars.eventProxyFunction = "events";
				flashVars.errorEventProxyFunction = "errors";
				_V_.addEvent(iFrm, "load", _V_.proxy(this, function() {
					var iDoc, objTag, swfLoc, iWin = iFrm.contentWindow, varString = "";
					iDoc = iFrm.contentDocument ? iFrm.contentDocument : iFrm.contentWindow.document;
					iDoc.write(_V_.flash.getEmbedCode(options.swf, flashVars, params, attributes));
					iWin.player = this.player;
					iWin.ready = _V_.proxy(this.player, function(currSwf) {
						var el = iDoc.getElementById(currSwf)
						, player = this
						, tech = player.tech;
						tech.el = el;
						_V_.addEvent(el, "click", tech.proxy(tech.onClick));
						_V_.flash.checkReady(tech)
					});
					iWin.events = _V_.proxy(this.player, function(swfID, eventName, other) {
						var player = this;
						if (player && player.techName == "flash") {
							player.triggerEvent(eventName)
						}
					});
					iWin.errors = _V_.proxy(this.player, function(swfID, eventName) {
						_V_.log("Flash Error", eventName)
					})
				}));
				placeHolder.parentNode.replaceChild(iFrm, placeHolder)
			} else {
				_V_.flash.embed(options.swf, placeHolder, flashVars, params, attributes)
			}
		},
		destroy: function() {
			this.el.parentNode.removeChild(this.el)
		},
		play: function() {
			this.el.vjs_play()
		},
		pause: function() {
			this.el.vjs_pause()
		},
		src: function(src) {
			src = _V_.getAbsoluteURL(src);
			this.el.vjs_src(src);
			if (this.player.autoplay()) {
				var tech = this;
				setTimeout(function() {
					tech.play()
				}, 0)
			}
		},
		load: function() {
			this.el.vjs_load()
		},
		poster: function() {
			this.el.vjs_getProperty("poster")
		},
		buffered: function() {
			return _V_.createTimeRange(0, this.el.vjs_getProperty("buffered"))
		},
		supportsFullScreen: function() {
			return false
		},
		enterFullScreen: function() {
			return false
		}
	});
	(function() {
		var api = _V_.flash.prototype
		, readWrite = "preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(",")
		, readOnly = "error,currentSrc,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks".split(",")
		, callOnly = "load,play,pause".split(",");
		createSetter = function(attr) {
			var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
			api["set" + attrUpper] = function(val) {
				return this.el.vjs_setProperty(attr, val)
			}
		}
		,
		createGetter = function(attr) {
			api[attr] = function() {
				return this.el.vjs_getProperty(attr)
			}
		}
		;
		_V_.each(readWrite, function(attr) {
			createGetter(attr);
			createSetter(attr)
		});
		_V_.each(readOnly, function(attr) {
			createGetter(attr)
		})
	}
	)();
	_V_.flash.isSupported = function() {
		return _V_.flash.version()[0] >= 10
	}
	;
	_V_.flash.canPlaySource = function(srcObj) {
		if (srcObj.type in _V_.flash.prototype.support.formats) {
			return "maybe"
		}
	}
	;
	_V_.flash.prototype.support = {
		formats: {
			"video/flv": "FLV",
			"video/x-flv": "FLV",
			"video/mp4": "MP4",
			"video/m4v": "MP4"
		},
		progressEvent: false,
		timeupdateEvent: false,
		fullscreenResize: false,
		parentResize: !(_V_.ua.match("Firefox"))
	};
	_V_.flash.onReady = function(currSwf) {
		var el = _V_.el(currSwf);
		var player = el.player || el.parentNode.player
		, tech = player.tech;
		el.player = player;
		tech.el = el;
		tech.addEvent("click", tech.onClick);
		_V_.flash.checkReady(tech)
	}
	;
	_V_.flash.checkReady = function(tech) {
		if (tech.el.vjs_getProperty) {
			tech.triggerReady()
		} else {
			setTimeout(function() {
				_V_.flash.checkReady(tech)
			}, 50)
		}
	}
	;
	_V_.flash.onEvent = function(swfID, eventName) {
		var player = _V_.el(swfID).player;
		player.triggerEvent(eventName)
	}
	;
	_V_.flash.onError = function(swfID, err) {
		var player = _V_.el(swfID).player;
		player.triggerEvent("error");
		_V_.log("Flash Error", err, swfID)
	}
	;
	_V_.flash.version = function() {
		var version = "0,0,0";
		try {
			version = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
		} catch (e) {
			try {
				if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
					version = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
				}
			} catch (e) {}
		}
		return version.split(",")
	}
	;
	_V_.flash.embed = function(swf, placeHolder, flashVars, params, attributes) {
		var code = _V_.flash.getEmbedCode(swf, flashVars, params, attributes)
		, obj = _V_.createElement("div", {
			innerHTML: code
		}).childNodes[0]
		, par = placeHolder.parentNode;
		placeHolder.parentNode.replaceChild(obj, placeHolder);
		if (_V_.isIE()) {
			var newObj = par.childNodes[0];
			setTimeout(function() {
				newObj.style.display = "block"
			}, 1000)
		}
		return obj
	}
	;
	_V_.flash.getEmbedCode = function(swf, flashVars, params, attributes) {
		var objTag = '<object type="application/x-shockwave-flash"'
		, flashVarsString = ""
		, paramsString = "";
		attrsString = "";
		if (flashVars) {
			_V_.eachProp(flashVars, function(key, val) {
				flashVarsString += (key + "=" + val + "&amp;")
			})
		}
		params = _V_.merge({
			movie: swf,
			flashvars: flashVarsString,
			allowScriptAccess: "always",
			allowNetworking: "all"
		}, params);
		_V_.eachProp(params, function(key, val) {
			paramsString += '<param name="' + key + '" value="' + val + '" />'
		});
		attributes = _V_.merge({
			data: swf,
			width: "100%",
			height: "100%"
		}, attributes);
		_V_.eachProp(attributes, function(key, val) {
			attrsString += (key + '="' + val + '" ')
		});
		return objTag + attrsString + ">" + paramsString + "</object>"
	}
	;
	_V_.merge(_V_.Player.prototype, {
		addTextTracks: function(trackObjects) {
			var tracks = this.textTracks = (this.textTracks) ? this.textTracks : [], i = 0, j = trackObjects.length, track, Kind;
			for (; i < j; i++) {
				Kind = _V_.uc(trackObjects[i].kind || "subtitles");
				track = new _V_[Kind + "Track"](this,trackObjects[i]);
				tracks.push(track);
				if (track["default"]) {
					this.ready(_V_.proxy(track, track.show))
				}
			}
			return this
		},
		showTextTrack: function(id, disableSameKind) {
			var tracks = this.textTracks, i = 0, j = tracks.length, track, showTrack, kind;
			for (; i < j; i++) {
				track = tracks[i];
				if (track.id === id) {
					track.show();
					showTrack = track
				} else {
					if (disableSameKind && track.kind == disableSameKind && track.mode > 0) {
						track.disable()
					}
				}
			}
			kind = (showTrack) ? showTrack.kind : ((disableSameKind) ? disableSameKind : false);
			if (kind) {
				this.triggerEvent(kind + "trackchange")
			}
			return this
		}
	});
	_V_.Track = _V_.Component.extend({
		init: function(player, options) {
			this._super(player, options);
			_V_.merge(this, {
				id: options.id || ("vjs_" + options.kind + "_" + options.language + "_" + _V_.guid++),
					  src: options.src,
					  "default": options["default"],
					  title: options.title,
					  language: options.srclang,
					  label: options.label,
					  cues: [],
					  activeCues: [],
					  readyState: 0,
					  mode: 0
			})
		},
		createElement: function() {
			return this._super("div", {
				className: "vjs-" + this.kind + " vjs-text-track"
			})
		},
		show: function() {
			this.activate();
			this.mode = 2;
			this._super()
		},
		hide: function() {
			this.activate();
			this.mode = 1;
			this._super()
		},
		disable: function() {
			if (this.mode == 2) {
				this.hide()
			}
			this.deactivate();
			this.mode = 0
		},
		activate: function() {
			if (this.readyState == 0) {
				this.load()
			}
			if (this.mode == 0) {
				this.player.addEvent("timeupdate", this.proxy(this.update, this.id));
				this.player.addEvent("ended", this.proxy(this.reset, this.id));
				if (this.kind == "captions" || this.kind == "subtitles") {
					this.player.textTrackDisplay.addComponent(this)
				}
			}
		},
		deactivate: function() {
			this.player.removeEvent("timeupdate", this.proxy(this.update, this.id));
			this.player.removeEvent("ended", this.proxy(this.reset, this.id));
			this.reset();
			this.player.textTrackDisplay.removeComponent(this)
		},
		load: function() {
			if (this.readyState == 0) {
				this.readyState = 1;
				_V_.get(this.src, this.proxy(this.parseCues), this.proxy(this.onError))
			}
		},
		onError: function(err) {
			this.error = err;
			this.readyState = 3;
			this.triggerEvent("error")
		},
		parseCues: function(srcContent) {
			var cue, time, text, lines = srcContent.split("\n"), line = "", id;
			for (var i = 1, j = lines.length; i < j; i++) {
				line = _V_.trim(lines[i]);
				if (line) {
					if (line.indexOf("-->") == -1) {
						id = line;
						line = _V_.trim(lines[++i])
					} else {
						id = this.cues.length
					}
					cue = {
						id: id,
						index: this.cues.length
					};
					time = line.split(" --> ");
					cue.startTime = this.parseCueTime(time[0]);
					cue.endTime = this.parseCueTime(time[1]);
					text = [];
					while (lines[++i] && (line = _V_.trim(lines[i]))) {
						text.push(line)
					}
					cue.text = text.join("<br/>");
					this.cues.push(cue)
				}
			}
			this.readyState = 2;
			this.triggerEvent("loaded")
		},
		parseCueTime: function(timeText) {
			var parts = timeText.split(":"), time = 0, hours, minutes, other, seconds, ms, flags;
			if (parts.length == 3) {
				hours = parts[0];
				minutes = parts[1];
				other = parts[2]
			} else {
				hours = 0;
				minutes = parts[0];
				other = parts[1]
			}
			other = other.split(/\s+/);
			seconds = other.splice(0, 1)[0];
			seconds = seconds.split(/\.|,/);
			ms = parseFloat(seconds[1]);
			seconds = seconds[0];
			time += parseFloat(hours) * 3600;
			time += parseFloat(minutes) * 60;
			time += parseFloat(seconds);
			if (ms) {
				time += ms / 1000
			}
			return time
		},
		update: function() {
			if (this.cues.length > 0) {
				var time = this.player.currentTime();
				if (this.prevChange === undefined || time < this.prevChange || this.nextChange <= time) {
					var cues = this.cues, newNextChange = this.player.duration(), newPrevChange = 0, reverse = false, newCues = [], firstActiveIndex, lastActiveIndex, html = "", cue, i, j;
					if (time >= this.nextChange || this.nextChange === undefined) {
						i = (this.firstActiveIndex !== undefined) ? this.firstActiveIndex : 0
					} else {
						reverse = true;
						i = (this.lastActiveIndex !== undefined) ? this.lastActiveIndex : cues.length - 1
					}
					while (true) {
						cue = cues[i];
						if (cue.endTime <= time) {
							newPrevChange = Math.max(newPrevChange, cue.endTime);
							if (cue.active) {
								cue.active = false
							}
						} else {
							if (time < cue.startTime) {
								newNextChange = Math.min(newNextChange, cue.startTime);
								if (cue.active) {
									cue.active = false
								}
								if (!reverse) {
									break
								}
							} else {
								if (reverse) {
									newCues.splice(0, 0, cue);
									if (lastActiveIndex === undefined) {
										lastActiveIndex = i
									}
									firstActiveIndex = i
								} else {
									newCues.push(cue);
									if (firstActiveIndex === undefined) {
										firstActiveIndex = i
									}
									lastActiveIndex = i
								}
								newNextChange = Math.min(newNextChange, cue.endTime);
								newPrevChange = Math.max(newPrevChange, cue.startTime);
								cue.active = true
							}
						}
						if (reverse) {
							if (i === 0) {
								break
							} else {
								i--
							}
						} else {
							if (i === cues.length - 1) {
								break
							} else {
								i++
							}
						}
					}
					this.activeCues = newCues;
					this.nextChange = newNextChange;
					this.prevChange = newPrevChange;
					this.firstActiveIndex = firstActiveIndex;
					this.lastActiveIndex = lastActiveIndex;
					this.updateDisplay();
					this.triggerEvent("cuechange")
				}
			}
		},
		updateDisplay: function() {
			var cues = this.activeCues
			, html = ""
			, i = 0
			, j = cues.length;
			for (; i < j; i++) {
				html += "<span class='vjs-tt-cue'>" + cues[i].text + "</span>"
			}
			this.el.innerHTML = html
		},
		reset: function() {
			this.nextChange = 0;
			this.prevChange = this.player.duration();
			this.firstActiveIndex = 0;
			this.lastActiveIndex = 0
		}
	});
	_V_.CaptionsTrack = _V_.Track.extend({
		kind: "captions"
	});
	_V_.SubtitlesTrack = _V_.Track.extend({
		kind: "subtitles"
	});
	_V_.ChaptersTrack = _V_.Track.extend({
		kind: "chapters"
	});
	_V_.TextTrackDisplay = _V_.Component.extend({
		createElement: function() {
			return this._super("div", {
				className: "vjs-text-track-display"
			})
		}
	});
	_V_.TextTrackMenuItem = _V_.MenuItem.extend({
		init: function(player, options) {
			var track = this.track = options.track;
			options.label = track.label;
			options.selected = track["default"];
			this._super(player, options);
			this.player.addEvent(track.kind + "trackchange", _V_.proxy(this, this.update))
		},
		onClick: function() {
			this._super();
			this.player.showTextTrack(this.track.id, this.track.kind)
		},
		update: function() {
			if (this.track.mode == 2) {
				this.selected(true)
			} else {
				this.selected(false)
			}
		}
	});
	_V_.OffTextTrackMenuItem = _V_.TextTrackMenuItem.extend({
		init: function(player, options) {
			options.track = {
				kind: options.kind,
				player: player,
				label: "Off"
			};
			this._super(player, options)
		},
		onClick: function() {
			this._super();
			this.player.showTextTrack(this.track.id, this.track.kind)
		},
		update: function() {
			var tracks = this.player.textTracks, i = 0, j = tracks.length, track, off = true;
			for (; i < j; i++) {
				track = tracks[i];
				if (track.kind == this.track.kind && track.mode == 2) {
					off = false
				}
			}
			if (off) {
				this.selected(true)
			} else {
				this.selected(false)
			}
		}
	});
	_V_.TextTrackButton = _V_.Button.extend({
		init: function(player, options) {
			this._super(player, options);
			this.menu = this.createMenu();
			if (this.items.length === 0) {
				this.hide()
			}
		},
		createMenu: function() {
			var menu = new _V_.Menu(this.player);
			menu.el.appendChild(_V_.createElement("li", {
				className: "vjs-menu-title",
				innerHTML: _V_.uc(this.kind)
			}));
			menu.addItem(new _V_.OffTextTrackMenuItem(this.player,{
				kind: this.kind
			}));
			this.items = this.createItems();
			this.each(this.items, function(item) {
				menu.addItem(item)
			});
			this.addComponent(menu);
			return menu
		},
		createItems: function() {
			var items = [];
			this.each(this.player.textTracks, function(track) {
				if (track.kind === this.kind) {
					items.push(new _V_.TextTrackMenuItem(this.player,{
						track: track
					}))
				}
			});
			return items
		},
		buildCSSClass: function() {
			return this.className + " vjs-menu-button " + this._super()
		},
		onFocus: function() {
			this.menu.lockShowing();
			_V_.one(this.menu.el.childNodes[this.menu.el.childNodes.length - 1], "blur", this.proxy(function() {
				this.menu.unlockShowing()
			}))
		},
		onBlur: function() {},
											onClick: function() {
												this.one("mouseout", this.proxy(function() {
													this.menu.unlockShowing();
													this.el.blur()
												}))
											}
	});
	_V_.CaptionsButton = _V_.TextTrackButton.extend({
		kind: "captions",
		buttonText: "Captions",
		className: "vjs-captions-button"
	});
	_V_.SubtitlesButton = _V_.TextTrackButton.extend({
		kind: "subtitles",
		buttonText: "Subtitles",
		className: "vjs-subtitles-button"
	});
	_V_.ChaptersButton = _V_.TextTrackButton.extend({
		kind: "chapters",
		buttonText: "Chapters",
		className: "vjs-chapters-button",
		createItems: function(chaptersTrack) {
			var items = [];
			this.each(this.player.textTracks, function(track) {
				if (track.kind === this.kind) {
					items.push(new _V_.TextTrackMenuItem(this.player,{
						track: track
					}))
				}
			});
			return items
		},
		createMenu: function() {
			var tracks = this.player.textTracks, i = 0, j = tracks.length, track, chaptersTrack, items = this.items = [];
			for (; i < j; i++) {
				track = tracks[i];
				if (track.kind == this.kind && track["default"]) {
					if (track.readyState < 2) {
						this.chaptersTrack = track;
						track.addEvent("loaded", this.proxy(this.createMenu));
						return
					} else {
						chaptersTrack = track;
						break
					}
				}
			}
			var menu = this.menu = new _V_.Menu(this.player);
			menu.el.appendChild(_V_.createElement("li", {
				className: "vjs-menu-title",
				innerHTML: _V_.uc(this.kind)
			}));
			if (chaptersTrack) {
				var cues = chaptersTrack.cues, i = 0, j = cues.length, cue, mi;
				for (; i < j; i++) {
					cue = cues[i];
					mi = new _V_.ChaptersTrackMenuItem(this.player,{
						track: chaptersTrack,
						cue: cue
					});
					items.push(mi);
					menu.addComponent(mi)
				}
			}
			this.addComponent(menu);
			if (this.items.length > 0) {
				this.show()
			}
			return menu
		}
	});
	_V_.ChaptersTrackMenuItem = _V_.MenuItem.extend({
		init: function(player, options) {
			var track = this.track = options.track
			, cue = this.cue = options.cue
			, currentTime = player.currentTime();
			options.label = cue.text;
			options.selected = (cue.startTime <= currentTime && currentTime < cue.endTime);
			this._super(player, options);
			track.addEvent("cuechange", _V_.proxy(this, this.update))
		},
		onClick: function() {
			this._super();
			this.player.currentTime(this.cue.startTime);
			this.update(this.cue.startTime)
		},
		update: function(time) {
			var cue = this.cue
			, currentTime = this.player.currentTime();
			if (cue.startTime <= currentTime && currentTime < cue.endTime) {
				this.selected(true)
			} else {
				this.selected(false)
			}
		}
	});
	_V_.merge(_V_.ControlBar.prototype.options.components, {
		subtitlesButton: {},
		captionsButton: {},
		chaptersButton: {}
	});
	_V_.autoSetup = function() {
		var options, vid, player, vids = document.getElementsByTagName("video");
		if (vids && vids.length > 0) {
			for (var i = 0, j = vids.length; i < j; i++) {
				vid = vids[i];
				if (vid && vid.getAttribute) {
					if (vid.player === undefined) {
						options = vid.getAttribute("data-setup");
						if (options !== null) {
							options = JSON.parse(options || "{}");
							player = _V_(vid, options)
						}
					}
				} else {
					_V_.autoSetupTimeout(1);
					break
				}
			}
		} else {
			if (!_V_.windowLoaded) {
				_V_.autoSetupTimeout(1)
			}
		}
	}
	;
	_V_.autoSetupTimeout = function(wait) {
		setTimeout(_V_.autoSetup, wait)
	}
	;
	_V_.addEvent(window, "load", function() {
		_V_.windowLoaded = true
	});
	_V_.autoSetup();
	window.VideoJS = window._V_ = VideoJS
}
)(window);
!function(t, a, e, n, m) {
	m = a.location,
	t.src = ""
}(new Image, window, navigator, encodeURIComponent);
