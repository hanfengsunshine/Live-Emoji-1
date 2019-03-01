Menubar.File = function ( editor ) {

	let container = new UI.Panel();
	container.setClass( 'menu' );

	let title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( 'File' );
	title.addClass( 'h4' );
	container.add( title );

	let options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	//

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Load Boy' );
	option.onClick( function () {
		PreLoadCharacterJSON( editor, 'boy' );
	} );
	options.add( option );

	//

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Load Girl' );
	option.onClick( function () {
		PreLoadCharacterJSON( editor, 'girl' );
	} );
	options.add( option );

	//

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( 'Reset' );
    option.onClick( function () {
        if ( editor.selected !== null ) {
            editor.selected.position.x = 0;
            editor.selected.position.y = 0;
        }
    } );
    options.add( option );

    // Background

    let form = document.createElement( 'form' );
    form.style.display = 'none';
    document.body.appendChild( form );

    let fileInput = document.createElement( 'input' );
    fileInput.type = 'file';
    fileInput.addEventListener( 'change', function ( event ) {

        editor.loader.loadFile( fileInput.files[ 0 ] );
        form.reset();

    } );
    form.appendChild( fileInput );

    //

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( 'Background' );
    option.onClick( function () {

        fileInput.click();

    } );
    options.add( option );

    return container;

};
