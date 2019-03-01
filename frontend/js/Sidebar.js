var Sidebar = function ( editor ) {

	let container = new UI.Panel();
	container.setId( 'sidebar' );
	container.dom.style.zIndex = '4';

	editor.sidebar = container;

	//

	let scene = new UI.Span().add(
		new Sidebar.Scene( editor ),
		new Sidebar.Properties( editor )
	);

	let history = new UI.Span().add(
		new Sidebar.History( editor ),
		new Sidebar.Settings( editor )
	);

	// for debug
	// container.add( scene );

	let titleMode = new UI.Text( 'Setting' );
	titleMode.addClass( 'h4' );
	titleMode.setTextAlign( 'center' );
	titleMode.setColor( 'whitesmoke' );
	titleMode.setWidth( '300px' );
	titleMode.setBackgroundColor( 'blueviolet' );
	container.add( titleMode );

	// role radio buttons

	let roleSideButtons = new UI.Div();
	roleSideButtons.setMargin( '5px' );
	roleSideButtons.addClass( 'btn-group' );
	roleSideButtons.addClass( 'btn-group-toggle' );
	roleSideButtons.dom.setAttribute( 'data-toggle', 'buttons' );
	container.add( roleSideButtons );

	// choose boy or girl

	let characterButtons = new UI.Div();
	characterButtons.setMargin( '5px' );
	characterButtons.addClass( 'btn-group' );
	characterButtons.addClass( 'btn-group-toggle' );
	characterButtons.dom.setAttribute( 'data-toggle', 'buttons' );
	container.add( characterButtons );

	let boyLabel = new UI.Label();
	boyLabel.addClass( 'btn' );
	boyLabel.addClass( 'btn-secondary' );
	boyLabel.setWidth( '140px' );
	characterButtons.add( boyLabel );
	boyLabel.dom.innerHTML = 'Boy';

	let boyInput = new UI.Input( '' );
	boyInput.dom.setAttribute( 'type', 'radio' );
	boyInput.dom.setAttribute( 'name', 'options' );
	boyInput.dom.setAttribute( 'autocomplete', 'off' );
	boyLabel.add( boyInput );

	let girlLabel = new UI.Label();
	girlLabel.addClass( 'btn' );
	girlLabel.addClass( 'btn-secondary' );
	girlLabel.setWidth( '150px' );
	characterButtons.add( girlLabel );
	girlLabel.dom.innerHTML = 'Girl';

	let girlInput = new UI.Input( '' );
	girlInput.dom.setAttribute( 'type', 'radio' );
	girlInput.dom.setAttribute( 'name', 'options' );
	girlInput.dom.setAttribute( 'autocomplete', 'off' );
	girlLabel.add( girlInput );

	editor.boyLabel = boyLabel;
	editor.girlLabel = girlLabel;

	boyLabel.dom.onclick = function () {

		if( editor.boyLoaded===false ) {
			alert( 'Please load boy character first!' );
			return;
		}

		if( editor.boy!==null ) {
			editor.selected = editor.boy;
			editor.boy.visible = true;

			if( editor.girl!==null )
				editor.girl.visible = false;
		}

		boyLabel.addClass( 'active' );
		girlLabel.removeClass( 'active' );

		boyLabel.setOpacity( '1' );
		girlLabel.setOpacity( '0.2' );
	}

	girlLabel.dom.onclick = function () {

		if( editor.girlLoaded===false ) {
			alert( 'Please load girl character first!' );
			return;
		}

		if( editor.girl!==null ) {
			editor.selected = editor.girl;
			editor.girl.visible = true;

			if( editor.boy!==null )
				editor.boy.visible = false;
		}

		boyLabel.removeClass( 'active' );
		girlLabel.addClass( 'active' );

		boyLabel.setOpacity( '0.2' );
		girlLabel.setOpacity( '1' );
	}

	boyLabel.setOpacity( '0.2' );
	girlLabel.setOpacity( '0.2' );

	//

	let titleEmotionCommand = new UI.Text( 'Emotion Command' );
	titleEmotionCommand.addClass( 'h4' );
	titleEmotionCommand.setTextAlign( 'center' );
	titleEmotionCommand.setColor( 'whitesmoke' );
	titleEmotionCommand.setMarginTop( '15px' );
	titleEmotionCommand.setWidth( '300px' );
	titleEmotionCommand.setBackgroundColor( 'blueviolet' );
	container.add( titleEmotionCommand );

	let emotionCommandView = new Sidebar.EmotionCMD( editor );
	container.add( emotionCommandView );

	return container;

};
