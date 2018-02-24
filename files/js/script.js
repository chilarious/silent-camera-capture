(function($) {

	var _$win,_$all;

	$(function() {

		_$win = $(window);
		_$all = $('#all');
		init();

	});

	function init() {

		var $canvas  = $('<canvas></canvas>');
		var $video   = $('<video autoplay playsinline></video>');
		var $button  = $('<button>capture</button>');
		var $capture = $('<img>');

		var canvas  = $canvas.get(0);
		var context = canvas.getContext('2d');
		var video   = $video.get(0);
		_$all.append($video).append($canvas).append($button).append($capture);
		$canvas.hide();

		$button.on('click',onCapture);

		function onCapture() {

			var src = canvas.toDataURL('image/jpeg');
			$capture.attr('src',src);
			var time = new Date().getTime();
			var $anchor = $('<a href="'+src+'" download="' + time + '.jpg"></a>');
			$anchor.get(0).click();

		}

		function update() {

			window.requestAnimationFrame(update);
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
		// facingMode: 'user'
		navigator.getUserMedia({ audio:false,video:{ facingMode: { exact: 'environment' } }},onSuccess,onError);

	}

})(jQuery);
