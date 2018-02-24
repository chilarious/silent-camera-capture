(function($) {

	var _$win,_$all;

	$(function() {

		_$win = $(window);
		_$all = $('#all');
		init();

	});

	function init() {

		var $canvas = $('<canvas></canvas>');
		var $video  = $('<video autoplay playsinline></video>');
		var canvas  = $canvas.get(0);
		var context = canvas.getContext('2d');
		var video   = $video.get(0);
		_$all.append($video).append($canvas);

		function update() {

			// window.requestAnimationFrame(update);
			context.drawImage(video,0,0);

		}

		function onSuccess(stream) {

			video.onloadedmetadata = function(event) {

				var width  = video.videoWidth;
				var height = video.videoHeight;

				$canvas.attr('width',width);
				$canvas.attr('height',height);

				update();

			}
			video.srcObject = stream;

		}

		function onError(message) {

			alert(message);
			
		}

		// facingMode: { exact: 'environment' }
		navigator.getUserMedia({ audio:false,video:{ facingMode: { exact: 'environment' } }},onSuccess,onError);

	}

})(jQuery);
