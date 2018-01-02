
var RemoveNEditorCommand = function ( object, script ) {

	Command.call( this );

	this.type = 'RemoveNEditorCommand';
	this.name = 'Remove NEditor';

	this.object = object;
	this.script = script;
	if ( this.object && this.script ) {

		this.index = this.editor.nEditor[ this.object.uuid ].indexOf( this.script );

	}

};

RemoveNEditorCommand.prototype = {

	execute: function () {

		if ( this.editor.nEditor[ this.object.uuid ] === undefined ) return;

		if ( this.index !== - 1 ) {

			this.editor.nEditor[ this.object.uuid ].splice( this.index, 1 );

		}

		this.editor.signals.nEditorRemoved.dispatch( this.script );

	},

	undo: function () {

		if ( this.editor.nEditor[ this.object.uuid ] === undefined ) {

			this.editor.nEditor[ this.object.uuid ] = [];

		}

		this.editor.nEditor[ this.object.uuid ].splice( this.index, 0, this.script );

		this.editor.signals.nEditorAdded.dispatch( this.script );

	},

	toJSON: function () {

		var output = Command.prototype.toJSON.call( this );

		output.objectUuid = this.object.uuid;
		output.script = this.script;
		output.index = this.index;

		return output;

	},

	fromJSON: function ( json ) {

		Command.prototype.fromJSON.call( this, json );

		this.script = json.script;
		this.index = json.index;
		this.object = this.editor.objectByUuid( json.objectUuid );

	}

};