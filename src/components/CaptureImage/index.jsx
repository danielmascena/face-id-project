import { drawCanvas } from '../../utils';

let imageCapture;

export default () => {

	const onGetUserMediaButtonClick = () => {
		navigator.mediaDevices.getUserMedia({ video: true })
			.then(mediaStream => {
				document.querySelector('video').srcObject = mediaStream;

				const track = mediaStream.getVideoTracks()[0];
				imageCapture = new ImageCapture(track);
			})
			.catch(error => console.log(error));
	}

	const onGrabFrameButtonClick = () => {
		imageCapture.grabFrame()
			.then(imageBitmap => {
				const canvas = document.querySelector('#grabFrameCanvas');
				drawCanvas(canvas, imageBitmap);
			})
			.catch(error => console.log(error));
	}

	const onTakePhotoButtonClick = () => {
		imageCapture.takePhoto()
			.then(blob => createImageBitmap(blob))
			.then(imageBitmap => {
				const canvas = document.querySelector('#takePhotoCanvas');
				drawCanvas(canvas, imageBitmap);
			})
			.catch(error => console.log(error));
	}

	const onPlayHandler = function() {
	document.querySelector('#grabFrameButton').disabled = false;
	document.querySelector('#takePhotoButton').disabled = false;
	};

	return (
		<>
			<h3>Background</h3>
			<p>The ImageCapture Web API allows web developers to capture images from camera
				in the form of a Blob with <code>takePhoto()</code> or as a ImageBitmap with
				<code>grabFrame()</code>.</p>

			<div id='results'>
				<div>
					<video autoPlay onPlay={onPlayHandler}></video>
					<button id='getUserMediaButton' onClick={onGetUserMediaButtonClick}>Get User Media</button>
				</div>
				<div>
					<canvas id='grabFrameCanvas'></canvas>
					<button id='grabFrameButton' disabled onClick={onGrabFrameButtonClick}>Grab Frame</button>
				</div>
				<div>
					<canvas id='takePhotoCanvas'></canvas>
					<button id='takePhotoButton' disabled onClick={onTakePhotoButtonClick}>Take Photo</button>
				</div>
			</div>
		</>
	)
};