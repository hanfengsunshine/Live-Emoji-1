var allUIThreeDOMInfo = {};

class EmotionCMDThreeDOM {
    constructor(info, nodeString) {
        this.cell0 = document.createElement('td');
        this.cell1 = document.createElement('td');
        this.cell2 = document.createElement('td');
        this.cell3 = document.createElement('td');
        this.cell4 = document.createElement('td');
        this.cell5 = document.createElement('td');

        this.cell0.setAttribute('scope', 'col');
        this.cell1.setAttribute('scope', 'col');
        this.cell2.setAttribute('scope', 'col');
        this.cell3.setAttribute('scope', 'col');
        this.cell4.setAttribute('scope', 'col');
        this.cell5.setAttribute('scope', 'col');

        this.cell0.style.textAlign = 'center';
        this.cell1.style.textAlign = 'center';
        this.cell2.style.textAlign = 'center';
        this.cell3.style.textAlign = 'center';
        this.cell4.style.textAlign = 'center';
        this.cell5.style.textAlign = 'center';

        this.keyDiv = new UI.Text(info.key);
        this.semanticDiv = new UI.Text(info.semantic);
        this.valenceDiv = new UI.Text(info.valence);
        this.arousalDiv = new UI.Text(info.arousal);
        this.editButton = new UI.Button('Edit');
        this.deleteButton = new UI.Button('X');

        this.cell0.appendChild(this.keyDiv.dom);
        this.cell1.appendChild(this.semanticDiv.dom);
        this.cell2.appendChild(this.valenceDiv.dom);
        this.cell3.appendChild(this.arousalDiv.dom);
        this.cell4.appendChild(this.editButton.dom);
        this.cell5.appendChild(this.deleteButton.dom);

        this.nodeString = nodeString;
    }

    updateInfo(info) {
        this.keyDiv.setValue(info.key);
        this.semanticDiv.setValue(info.semantic);
        this.valenceDiv.setValue(info.valence);
        this.arousalDiv.setValue(info.arousal);
    }

    updateNodeString(nodeString) {
        this.nodeString = nodeString;
    }

    createEmotionCMDThreeDOM(editor) {

        let that = this;
        let thatKey = this.keyDiv.getValue();
        this.editButton.onClick(function () {

            if (editor.currentEditedKey === thatKey) {
                editor.node_editor.setDisplay('');
            }
            else {
                editor.currentEditedKey = thatKey;

                editor.runAtLeastOneCMD = false;

                for (let i = 0; i < Global_All_DOM_In_SVG.length; ++i) {
                    Global_All_DOM_In_SVG[i].remove();
                }
                $(Global_Graph_SVG).empty();

                var nodeSession = new NodeSession(editor);
                nodeSession.fromJSON(JSON.parse(that.nodeString));
                editor.emotionCMDManager.currentNodeSession = nodeSession;

                editor.node_editor.setDisplay('');

                for (let i = 0; i < Global_All_DOM_In_SVG.length; ++i) {
                    Global_All_DOM_In_SVG[i].remove();
                }
                $(Global_Graph_SVG).empty();

                var nodeSession = new NodeSession(editor);
                nodeSession.fromJSON(JSON.parse(that.nodeString));
                editor.emotionCMDManager.currentNodeSession = nodeSession;

                editor.currentEmitter = null;

                editor.node_editor.setDisplay('');
            }
        });

        this.deleteButton.onClick(function () {
            let key = that.keyDiv.getValue();
            delete editor.emotionCMDManager.allSerializedCMDs[key];
            delete editor.emotionCMDManager.allCMDs[key];

            that.row.remove();

            delete allUIThreeDOMInfo[key];
        });

        this.row = document.createElement('tr');
        this.row.appendChild(this.cell0);
        this.row.appendChild(this.cell1);
        this.row.appendChild(this.cell2);
        this.row.appendChild(this.cell3);
        this.row.appendChild(this.cell4);
        this.row.appendChild(this.cell5);

        this.row.style.backgroundColor = 'black';

        return this.row;
    }
}

function getIndexofRow(body, key) {
    let rows = body.rows;
    for (let i = 0; i < rows.length; ++i) {
        if (rows[i].cells[0].firstChild.textContent === key)
            return i;
    }

    return -1;
}


Sidebar.EmotionCMD = function (editor) {

    let signals = editor.signals;

    let container = new UI.Panel();

    let table = document.createElement("TABLE");
    table.style.class = 'table table-hover table-dark';
    table.style.width = '100%';
    let header = table.createTHead();
    let headerRow = header.insertRow(0);

    let headerCell0 = document.createElement('th');
    let headerCell1 = document.createElement('th');
    let headerCell2 = document.createElement('th');
    let headerCell3 = document.createElement('th');

    headerCell0.setAttribute('scope', 'col');
    headerCell1.setAttribute('scope', 'col');
    headerCell2.setAttribute('scope', 'col');
    headerCell3.setAttribute('scope', 'col');

    headerCell0.style.textAlign = 'center';
    headerCell1.style.textAlign = 'center';
    headerCell2.style.textAlign = 'center';
    headerCell3.style.textAlign = 'center';

    headerRow.appendChild(headerCell0);
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    headerRow.appendChild(headerCell3);

    let keyDiv = new UI.Text('Key');
    let semanticDiv = new UI.Text('Semantic');
    let valenceDiv = new UI.Text('Valence');
    let arousalDiv = new UI.Text('Arousal');

    headerCell0.appendChild(keyDiv.dom);
    headerCell1.appendChild(semanticDiv.dom);
    headerCell2.appendChild(valenceDiv.dom);
    headerCell3.appendChild(arousalDiv.dom);

    container.dom.appendChild(table);

    let body = table.createTBody();
    editor.emotion_cmd_tablebody = body;

    signals.saveEmotionCMD.add(function (msg) {
        if (allUIThreeDOMInfo[msg.info.key] === undefined) {
            let threeDOM = new EmotionCMDThreeDOM(msg.info, msg.nodeString);
            body.appendChild(threeDOM.createEmotionCMDThreeDOM(editor));
            allUIThreeDOMInfo[msg.info.key] = threeDOM;

            allUIThreeDOMInfo[msg.info.key].updateInfo(msg.info);
            allUIThreeDOMInfo[msg.info.key].updateNodeString(msg.nodeString);
        }
        else {
            allUIThreeDOMInfo[msg.info.key].updateInfo(msg.info);
            allUIThreeDOMInfo[msg.info.key].updateNodeString(msg.nodeString);
        }
    });

    let pre_key = null;

    editor.signals.updateRecommendation.add(function (valence_level) { // 0 - 1

        if (editor.usageMode === 0) {

            let max_valence = MostPossibleEmotion(valence_level);

            let valence = max_valence.val;
            let arousal = editor.autoArousalLevel;

            // console.log( 'arousal: '  + arousal);

            if (arousal === 0) arousal = 70; // non-detected value

            if (max_valence.pm === 'positive') {
                valence = Math.floor(valence * 4) + 5;
            }
            // else if(max_valence.pm==='neutral') {
            // 	valence = 5;
            // }
            else {
                valence = Math.floor(valence * 4) + 1;
            }

            editor.signals.updateEmotionPanelValues.dispatch({
                valence: valence,
                arousal: arousal
            });

            let all_distprop = [];
            for (let prop in editor.emotionCMDManager.allCMDs) {
                let info = editor.emotionCMDManager.allCMDs[prop].getInfo();
                let prop_arousal = Number(info.arousal);
                let prop_valence = Number(info.valence);

                let dist = 4 * (arousal - prop_arousal) * (arousal - prop_arousal) + 25 * (valence - prop_valence) * (valence - prop_valence) / 2;

                all_distprop.push({val: dist, other: info});
            }

            let len = all_distprop.length;
            for (let i = 1; i < len; ++i) {
                let value = all_distprop[i].val;
                for (let j = i - 1; j >= 0; --j) {
                    if (all_distprop[j].val > value) {
                        let tmp = all_distprop[j];
                        all_distprop[j] = all_distprop[i];
                        all_distprop[i] = tmp;
                        i = j;
                    }
                    else
                        break;
                }
            }

            let positive_distprop = [];
            let negative_distprop = [];
            let dist_size = all_distprop.length;
            for (let i = 0; i < dist_size; ++i) {
                let res = GetPositiveOrNegative(all_distprop[i].other.semantic);
                if (res === 'positive')
                    positive_distprop.push(all_distprop[i]);
                else
                    negative_distprop.push(all_distprop[i]);
            }

            // re-order the command table

            let parent = body;
            let rows = body.rows;
            if (rows.length >= 3) {
                let idx = [];
                if (max_valence.pm === 'positive') {
                    for (let i = 0; i < positive_distprop.length; ++i)
                        idx.push(getIndexofRow(body, positive_distprop[i].other.key));

                    for (let i = 0; i < negative_distprop.length; ++i)
                        idx.push(getIndexofRow(body, negative_distprop[i].other.key));
                }
                else {
                    for (let i = 0; i < negative_distprop.length; ++i)
                        idx.push(getIndexofRow(body, negative_distprop[i].other.key));

                    for (let i = 0; i < positive_distprop.length; ++i)
                        idx.push(getIndexofRow(body, positive_distprop[i].other.key));
                }

                // idx[0] = getIndexofRow( body, 'c' );
                // idx[1] = getIndexofRow( body, 'a' );
                // idx[2] = getIndexofRow( body, 'l' );

                parent.insertBefore(rows[idx[0]], rows[0]);
                parent.insertBefore(rows[idx[1]], rows[1]);
                parent.insertBefore(rows[idx[2]], rows[2]);

                let len = editor.emotion_cmd_tablebody.rows.length;
                for (let i = 0; i < len; ++i) {
                    editor.emotion_cmd_tablebody.rows[i].style.backgroundColor = 'black';
                }

                editor.emotion_cmd_tablebody.rows[0].style.backgroundColor = 'chartreuse';
                editor.emotion_cmd_tablebody.rows[1].style.backgroundColor = 'crimson';
                editor.emotion_cmd_tablebody.rows[2].style.backgroundColor = 'aliceblue';

                editor.top3Keys.key0 = rows[0].cells[0].textContent;
                editor.top3Keys.key1 = rows[1].cells[0].textContent;
                editor.top3Keys.key2 = rows[2].cells[0].textContent;
            }
        }
    });

    return container;

};
