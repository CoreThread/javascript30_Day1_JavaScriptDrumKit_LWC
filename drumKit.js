import { LightningElement, track } from 'lwc';
import drumKitMedia from '@salesforce/resourceUrl/JS_30_D1_Drum_Kit_BG';

export default class DrumKit extends LightningElement {
	@track audioRef;
	@track keyPressed = '';
	keyList = [
		{ character: `A`, label: `CLAP`, audioUrl: `${drumKitMedia}/clap.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `S`, label: `HIHAT`, audioUrl: `${drumKitMedia}/hihat.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `D`, label: `KICK`, audioUrl: `${drumKitMedia}/kick.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `F`, label: `OPENHAT`, audioUrl: `${drumKitMedia}/openhat.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `G`, label: `BOOM`, audioUrl: `${drumKitMedia}/boom.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `H`, label: `RIDE`, audioUrl: `${drumKitMedia}/ride.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `J`, label: `SNARE`, audioUrl: `${drumKitMedia}/snare.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `K`, label: `TOM`, audioUrl: `${drumKitMedia}/tom.wav`, playing: false, keyStyle: `keyBox` },
		{ character: `L`, label: `TINK`, audioUrl: `${drumKitMedia}/tink.wav`, playing: false, keyStyle: `keyBox` }
	];
	connectedCallback() {
		window.addEventListener('keydown', this.handleKeyPress.bind(this));
	}
	disconnectedCallback() {
		window.removeEventListener('keydown', this.handleKeyPress.bind(this));
	}
	get backgroundStyle() {
		return `background: url('${drumKitMedia}/background.jpg') bottom center;`;
	}
	handleKeyPress(event) {
		this.keyPressed = event.key.toLowerCase();
		const pressedKey = this.keyList.find((key) => key.character.toLowerCase() === this.keyPressed);
		if (pressedKey) {
			this.keyList.forEach((key) => {
				key.playing = false; // Reset all keys to not playing
				key.keyStyle = 'keyBox';
			});

			pressedKey.playing = true; // Set the currently pressed key to playing
			pressedKey.keyStyle = 'keyBox playing';
			pressedKey.audioRef.pause();
			pressedKey.audioRef.currentTime = 0;
			pressedKey.audioRef.play();
			this.keyList = [...this.keyList]; // Trigger a re-render
	
			setTimeout(() => {
				pressedKey.keyStyle = 'keyBox';
				this.keyList = [...this.keyList]; // Trigger a re-render
			}, 150);
		}
		console.log('pressedKey : ', pressedKey);
	}
	renderedCallback() {
		if (!this.audioRef) {
			this.audioRef = this.template.querySelectorAll('audio');
			this.audioRef.forEach((audio, index) => {
				this.keyList[index].audioRef = audio;
			});
		}
	}
}