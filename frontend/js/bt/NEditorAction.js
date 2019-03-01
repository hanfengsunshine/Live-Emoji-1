class SwapNode extends Node {
	constructor ( type, editor ) {
		super( 'Action: ' + type );
		this.type = type;

		this.editor = editor;

		this.addOutput();

		this.emotion = new LeafInput( '' );
		this.emotion.addSelectionInput( {
			'happy': 'happy',
			'sad': 'sad',
			'surprised': 'surprised',
			'disgusted': 'disgusted',
			'angry': 'angry',
			'fearful': 'fearful',
			'neutral': 'neutral'
		} );
		this.addInput( this.emotion );
		this.emotion.setArg( 'neutral' );

		this.moveTo( { x: 300, y: 80 } );
	}

	run ( component ) {
		if ( component !== 'puppet' ) {
			alert( 'Explode action ONLY allows puppet component input!' );
			return;
		}

		let that = this;
		let puppet = that.editor.selected;
		if ( puppet !== null ) {
			puppet.updateEmotion( that.emotion.getArg() );
			that.editor.signals.sceneGraphChanged.dispatch();
		}
	}

	toJSON () {
		return {
			type: this.type,
			offset: this.getOffset(),
			emotion: this.emotion.getArg()
		};
	}

	fromJSON ( state ) {
		this.type = state.type;
		this.setOffset( state.offset );
		this.emotion.setArg( state.emotion );
	}
}

class ParticleNode extends Node {
	constructor ( type, editor ) {
		super( 'Action: ' + type );

		this.type = type;
		this.editor = editor;

		this.image = new LeafInput( 'Image: ' );
		this.image.addSelectionInput( {
			'fire': 'fire',
			'heart': 'heart',
			'poop': 'poop',
			'raindrop': 'raindrop',
			'splatter1': 'splatter1',
			'splatter2': 'splatter2',
			'surprised': 'surprised',
			'yellowbubble': 'yellowbubble'
		} );
		this.addInput( this.image );
		this.image.setArg( 'yellowbubble' );

		// initialization configuration
		this.mass = new LeafInput( 'Speed: ' );
		this.mass.addSelectionInput( {
			1: 1,
			2: 2,
			5: 5,
			10: 10
		} );
		this.addInput( this.mass );
		this.mass.setArg( '1' );

		this.emitterX = new LeafInput( 'Emitter X: ' );
		// this.emitterX.addTextLabel( editor.protonPixi4Renderer.width / 2 );
		this.addInput( this.emitterX );

		this.emitterY = new LeafInput( 'Emitter Y: ' );
		// this.emitterY.addTextLabel( editor.protonPixi4Renderer.height / 2 );
		this.addInput( this.emitterY );

		this.manner = new LeafInput( 'Manner: ' );
		this.manner.addSelectionInput( {
			'rain': 'rain',
			'explode': 'explode',
			'jet': 'jet'
		} );
		this.addInput( this.manner );
		this.manner.setArg( 'explode' );

		this.addOutput();

		let that = this;
		this.domElement.onclick = function () {
		}
		this.moveTo( { x: 300, y: 80 } );
	}

	run ( component ) {
	}

	toJSON () {
		return {
			type: this.type,
			offset: this.getOffset(),
			image: this.image.getArg(),
			mass: this.mass.getArg(),
			manner: this.manner.getArg(),
			emitterX: this.emitterX.getArg(),
			emitterY: this.emitterY.getArg()
		};
	}

	fromJSON ( state ) {
		this.type = state.type;
		this.setOffset( state.offset );
		this.image.setArg( state.image );
		this.mass.setArg( state.mass );
		this.manner.setArg( state.manner );
		this.emitterX.setArg( state.emitterX );
		this.emitterY.setArg( state.emitterY );
	}
}


class DanmakuNode extends Node {
	constructor ( type, editor ) {
		super( 'Action: ' + type );

		this.type = type;
		this.editor = editor;

		this.text = new LeafInput( 'Text: ' );
		this.text.addTextInput();
		this.addInput( this.text );

		this.color = new LeafInput( 'Color: ' );
		this.color.addColorInput();
		this.addInput( this.color );

		this.size = new LeafInput( 'Size: ' );
		this.size.addSelectionInput( {
			'20': 'small',
			'50': 'middle',
			'100': 'big'
		} );
		this.addInput( this.size );
		this.size.setArg( '100' );

		this.font = new LeafInput( 'Font: ' );
		this.font.addSelectionInput( {
			'cursive': 'cursive',
			'fantasy': 'fantasy',
			'monospace': 'monospace',
			'unset': 'unset'
		} );
		this.addInput( this.font );
		this.font.setArg( 'cursive' );

		this.elasp = new LeafInput( 'Moving Time: ' );
		this.elasp.addSelectionInput( {
			'100': '100',
			'500': '500',
			'1000': '1000',
			'5000': '5000',
			'10000': '10000',
			'20000': '20000'
		} );
		this.addInput( this.elasp );
		this.elasp.setArg( '1000' );

		this.shift = new LeafInput( 'Shift:' );
		this.shift.addSelectionInput( {
			'no': 'no',
			'small': 'small',
			'middle': 'middle',
			'big': 'big'
		} );
		this.addInput( this.shift );
		this.shift.setArg( 'no' );

		this.manner = new LeafInput( 'Manner: ' );
		this.manner.addSelectionInput( {
			'l2r_top': 'Left to right [TOP]',
			'r2l_top': 'Right to left [TOP]',
			'l2r_bottom': 'Left to right [BOTTOM]',
			'r2l_bottom': 'Right to left [BOTTOM]'
		} );
		this.addInput( this.manner );
		this.manner.setArg( 'r2l_top' );

		this.addOutput();

		this.moveTo( { x: 300, y: 80 } );
	}

	getManner ( val, _shift ) {
		let shift = 0;
		switch ( _shift ) {
			case 'no':
				shift=0;
				break;
			case 'small':
				shift = 50;
				break;
			case 'middle':
				shift = 100;
				break;
			case 'big':
				shift = 200;
				break;
		}

		switch ( val ) {
			case 'l2r_top':
				return { sx: 0, sy: 100+shift, ex: 800, ey: 100+shift };
			case 'r2l_top':
				return { sx: 800, sy: 100+shift, ex: 0, ey: 100+shift };
			case 'l2r_bottom':
				return { sx: 0, sy: 500+shift, ex: 800, ey: 500+shift };
			case 'r2l_bottom':
				return { sx: 800, sy: 500+shift, ex: 0, ey: 500+shift };
		}
	}

	run ( component ) {

		if ( component !== 'text' ) {
			alert( 'Danmaku action ONLY allows text component input!' );
			return;
		}

		let text = this.text.getArg();
		let color = this.color.getArg();
		let size = Number( this.size.getArg() );
		let font = this.font.getArg();
		let elapse = Number( this.elasp.getArg() );
		let manner = this.getManner( this.manner.getArg(), this.shift.getArg() );
	}

	toJSON () {
		return {
			type: this.type,
			offset: this.getOffset(),
			text: this.text.getArg(),
			color: this.color.getArg(),
			size: this.size.getArg(),
			font: this.font.getArg(),
			elapse: this.elasp.getArg(),
			manner: this.manner.getArg(),
			shift: this.shift.getArg()
		};
	}

	fromJSON ( state ) {
		this.type = state.type;
		this.setOffset( state.offset );
		this.text.setArg( state.text );
		this.color.setArg( state.color );
		this.size.setArg( state.size );
		this.font.setArg( state.font );
		this.elasp.setArg( state.elapse );
		this.manner.setArg( state.manner );
		this.shift.setArg( state.shift );
	}
}

class ViberationNode extends Node {
	constructor ( type, editor ) {
		super( 'Action: ' + type );

		this.type = type;
		this.editor = editor;

		this.frequency = new LeafInput( 'Frequency: ' );
		this.frequency.addSelectionInput( {
			'low': 'low',
			'middle': 'middle',
			'high': 'high'
		} );
		this.addInput( this.frequency );
		this.frequency.setArg( 'middle' );

		this.amplitude = new LeafInput( 'Amplitude: ' );
		this.amplitude.addSelectionInput( {
			'low': 'low',
			'middle': 'middle',
			'high': 'high'
		} );
		this.addInput( this.amplitude );
		this.amplitude.setArg( 'middle' );

		this.addOutput();

		this.moveTo( { x: 300, y: 80 } );

	}

	toJSON () {
		return {
			type: this.type,
			offset: this.getOffset(),
			frequency: this.frequency.getArg(),
			amplitude: this.amplitude.getArg()
		};
	}

	fromJSON ( state ) {
		this.type = state.type;
		this.setOffset( state.offset );
		this.frequency.setArg( state.frequency );
		this.amplitude.setArg( state.amplitude );
	}

	run ( component ) {
		if ( component === 'puppet' || component === 'background' ) {
			let puppet = this.editor.selected;

			let timestep = null;
			let diststep = null;
			switch ( this.frequency.getArg() ) {
				case 'low': {
					timestep = 200;
					break;
				}
				case 'middle': {
					timestep = 100;
					break;
				}
				case 'high': {
					timestep = 50;
					break;
				}
			}

			switch ( this.amplitude.getArg() ) {
				case 'low': {
					diststep = 0.5;
					break;
				}
				case 'middle': {
					diststep = 1;
					break;
				}
				case 'high': {
					diststep = 2;
					break;
				}
			}

			let target = null;

			target = this.editor.selected;


			let state0 = {
				x: target.position.x,
				y: target.position.y
			}

			let state1 = {
				x: state0.x + diststep,
				y: state0.y + diststep / 2
			}

			let state2 = {
				x: state1.x - diststep,
				y: state1.y - diststep / 2
			}

			let stage3 = {
				x: target.position.x,
				y: target.position.y
			};

			let tween0 = new TWEEN.Tween( state0 ).to( state1, timestep ).onUpdate( function ( obj ) {
				target.position.x = obj.x;
				target.position.y = obj.y
			} );

			let tween1 = new TWEEN.Tween( state1 ).to( state2, timestep ).onUpdate( function ( obj ) {
				target.position.x = obj.x;
				target.position.y = obj.y
			} );

			let tween2 = new TWEEN.Tween( state2 ).to( stage3, timestep ).onUpdate( function ( obj ) {
				target.position.x = obj.x;
				target.position.y = obj.y
			} );

			tween0.chain( tween1 );
			tween0.chain( tween2 );
			tween0.repeat( 100 );

			if ( component === 'puppet' ) {
				let that = this;
				that.editor.facePositionMutex = true;
				setTimeout( function () {
					that.editor.facePositionMutex = false;
				}, 5000 );
			}

			tween0.start();
		}
	}
}

class SoundNode extends Node {
	constructor ( type, editor ) {
		super( 'Actioin: ' + type );

		this.type = type;
		this.editor = editor;

		this.sound = new LeafInput( 'Sound: ' );
		this.sound.addSelectionInput( {
			'bill': 'bill',
			'burp': 'burp',
			'cry': 'cry',
			'laugh': 'laugh',
			'scream': 'scream',
			'slurp': 'slurp'
		} );
		this.addInput( this.sound );
		this.sound.setArg( 'laugh' );

		this.addOutput();

		this.moveTo( { x: 300, y: 80 } );
	}

	toJSON () {
		return {
			type: this.type,
			offset: this.getOffset(),
			sound: this.sound.getArg()
		}
	}

	fromJSON ( state ) {
		this.type = state.type;
		this.setOffset( state.offset );
		this.sound.setArg( state.sound );
	}

	getIdx ( name ) {
		switch ( name ) {
			case 'bill':
				return 0;
			case 'burp':
				return 1;
			case 'cry':
				return 2;
			case 'laugh':
				return 3;
			case 'scream':
				return 4;
			case 'slurp':
				return 5;
		}
	}

	run ( component ) {
		this.editor.soundPlayer.play( this.getIdx( this.sound.getArg() ) );
	}
}