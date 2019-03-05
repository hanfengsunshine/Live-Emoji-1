"use strict";
var LoadEmotionCMDJSONFile = function ( editor, filename ) {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if ( this.readyState == 4 && this.status == 200 ) {
            let jsonFile = JSON.parse( this.responseText );

            editor.emotionCMDManager.fromJSON( jsonFile );

            for ( let prop in editor.emotionCMDManager.all_emotion_cmds) {
                let cmd = editor.emotionCMDManager.all_emotion_cmds[prop];
                let info = {match_score: cmd.getMatchScore(), uuid: prop, name: cmd.getName()};
                editor.signals.saveEmotionCMD.dispatch( info );
            }
            editor.emotionCMDManager.stop();
        }
    };

    xhr.open( 'GET', './asset/' + filename, true );
    xhr.send();
}