/**
 * Created by gitbong on 4/7/16.
 */
var gbTween = (function () {

	var tweenId = 0;
	var eventId = 0;

	var Tween = function () {
		this._playId = 0;
	};
	Tween.prototype.set = function ($dom, styles) {

	};
	Tween.prototype.to = function ($dom, duration, params) {
		var $dom = $($dom);
		if ($dom.attr('gbtween') == null) {
			_initTranslate($dom, duration, params, '');
			$dom.attr('gbtween', tweenId);
			tweenId++;
		} else {
			var transitionVal = $dom.css('transition');
			_initTranslate($dom, duration, params, transitionVal);
		}


		var eId = eventId;
		eventId++;
		$dom.on('webkitTransitionEnd transitionend', _onComplete);
		function _onComplete(e) {
			console.log('end:', eId, e);
			// params.onComplete();
			// $dom.off('webkitTransitionEnd transitionend', _onComplete);
		}

		// clearTimeout(this._playId);
		// this._playId = setTimeout(function () {
		for (var j in params) {
			if (params != 'ease' && params != 'delay') {
				if (j != 'ease' && j != 'delay') {
					$dom.css(j, params[j]);
				}
			}
		}
		// }, 0);
	};

	function _initTranslate($dom, duration, params, transitionVal) {
		params.ease = params.ease == null ? 'ease' : params.ease;
		params.delay = '0s';//params.delay == null ? '0s' : params.delay + 's';

		var val = transitionVal;

		var valArr = val.split(',');

		if (valArr.length == 1 && valArr[0] == '')
			valArr = [];

		for (var i in params) {
			if (i != 'ease' && i != 'delay' && i != 'onComplete') {
				var valStr = i + ' ' + duration + 's ' + params.ease + ' ' + params.delay;
				if (val.indexOf(i) != -1) {
					for (var k in valArr) {
						if (valArr[k].indexOf(i) != -1) {
							valArr.splice(k, 1);
							// valStr = valStr.substring(0, valStr.length - 1);
							valArr.push(valStr);
						}
					}
				} else {
					valArr.push(valStr);
				}
			}
		}
		val = valArr.join(',');
		_setCSS('transition', val);

		function _setCSS(key, val) {
			$dom.css(key, val);
			$dom.css('-webkit-' + key, val);
			$dom.css('-moz-' + key, val);
		}
	}

	function set($dom, styles) {

	}

	function to($dom, duration, params) {

		var delay = params.delay == null ? '0s' : params.delay;

		var tween = new Tween();
		setTimeout(function () {
			tween.to($dom, duration, params);
		}, delay * 1000);
		return tween;
	}

	var _ins = {};
	_ins.set = set;
	_ins.to = to;
	return _ins;
})();