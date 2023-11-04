function quitEditor() {
    // delete editor element 
    var parent = document.getElementById('editor');
    var editorElement = parent.getElementsByTagName('iframe')[0];
    editorElement.remove()

    // resize div
    var element = document.getElementById("editor");
    element.setAttribute("style", "height:70px")

    // disable buttons
    document.getElementById("quiteditor").disabled = true;
    document.getElementById("exporteditorhtml").disabled = true;
    document.getElementById("exporteditorjson").disabled = true;
    document.getElementById("importeditorhtml").disabled = true;
    document.getElementById("importeditorjson").disabled = true;
    document.getElementById("saveeditorjson").disabled = true;
    document.getElementById("openeditorjson").disabled = true;

    // enable start
    document.getElementById("starteditor").disabled = false;
}

function saveEditorJSON() {
    unlayer.exportHtml(function (data) {
        var json = data.design; // design json
        var html = data.html; // final html

        var link = document.createElement('a');
        var strjson = JSON.stringify(json);
        link.download = 'data.json';
        var blob = new Blob([strjson], { type: 'text/plain' });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    })
}

function openEditorJSON() {
    const fileList = this.files; /* now you can work with the file list */
    const reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
            // this will then display a text file
            unlayer.loadDesign(JSON.parse(reader.result));
        },
        false,
    );
    reader.readAsText(fileList[0]);
}

function exportEditorJSON() {
    unlayer.exportHtml(function (data) {
        var json = data.design; // design json
        var html = data.html; // final html

        navigator.clipboard.writeText(JSON.stringify(json));

        // Alert the copied tex
        alert("Copied the json to clipboard!");
    })
}

function exportEditorHTML() {
    unlayer.exportHtml(function (data) {
        var json = data.design; // design json
        var html = data.html; // final html

        navigator.clipboard.writeText(html);

        // Alert the copied tex
        alert("Copied the html to clipboard!");
    })
}

function importEditorHTML() {
    // import editor html
    var input = prompt("Please enter your html", "enter html here: ");
    if ((input == null || (typeof input === "string" && input.trim().length === 0))) {
        return;
    }
    unlayer.loadDesign({ html: input, classic: true });
}

function importEditorJSON() {
    // import editor json
    var input = prompt("Please enter your json", "enter json here: ");
    if ((input == null || (typeof input === "string" && input.trim().length === 0))) {
        return;
    }
    unlayer.loadDesign(JSON.parse(input));
}

function loadEditor() {
    // load editor
    unlayer.init({
        id: 'editor',
        displayMode: 'email',
        projectId: 194306,
        appearance:
        {
            theme: 'dark'
        }
    });

    // grow editor div
    element = document.getElementById("editor");
    element.setAttribute("style", "height:1000px")

    //enable buttons
    document.getElementById("starteditor").disabled = true;
    document.getElementById("quiteditor").disabled = false;
    document.getElementById("exporteditorhtml").disabled = false;
    document.getElementById("exporteditorjson").disabled = false;
    document.getElementById("importeditorhtml").disabled = false;
    document.getElementById("importeditorjson").disabled = false;
    document.getElementById("saveeditorjson").disabled = false;
    document.getElementById("openeditorjson").disabled = false;
}

function createEditor() {
    // create editor div
    var div = document.createElement('div');
    div.setAttribute('id', 'editor');

    // create start button
    var startEditorButton = document.createElement('button')
    startEditorButton.setAttribute('id', 'starteditor')
    startEditorButton.setAttribute('class', 'editorbutton')
    startEditorButton.setAttribute('onclick', 'loadEditor()')
    startEditorButton.insertAdjacentText('beforeend', 'Start Editor');
    div.appendChild(startEditorButton)

    // quit editor button
    var quitEditorButton = document.createElement('button')
    quitEditorButton.setAttribute('id', 'quiteditor')
    quitEditorButton.setAttribute('class', 'editorbutton')
    quitEditorButton.setAttribute('onclick', 'quitEditor()')
    quitEditorButton.insertAdjacentText('beforeend', 'Quit');
    quitEditorButton.disabled = true;
    div.appendChild(quitEditorButton)

    // create export button
    var exportEditorButton = document.createElement('button')
    exportEditorButton.setAttribute('id', 'exporteditorhtml')
    exportEditorButton.setAttribute('class', 'editorbutton')
    exportEditorButton.setAttribute('onclick', 'exportEditorHTML()')
    exportEditorButton.insertAdjacentText('beforeend', 'Export HTML');
    exportEditorButton.disabled = true;
    div.appendChild(exportEditorButton)

    // create export json button
    var exportEditorJSONButton = document.createElement('button')
    exportEditorJSONButton.setAttribute('id', 'exporteditorjson')
    exportEditorJSONButton.setAttribute('class', 'editorbutton')
    exportEditorJSONButton.setAttribute('onclick', 'exportEditorJSON()')
    exportEditorJSONButton.insertAdjacentText('beforeend', 'Export JSON');
    exportEditorJSONButton.disabled = true;
    div.appendChild(exportEditorJSONButton)

    // create import html button
    var importHTMLEditorButton = document.createElement('button')
    importHTMLEditorButton.setAttribute('id', 'importeditorhtml')
    importHTMLEditorButton.setAttribute('class', 'editorbutton')
    importHTMLEditorButton.setAttribute('onclick', 'importEditorHTML()')
    importHTMLEditorButton.insertAdjacentText('beforeend', 'Import HTML');
    importHTMLEditorButton.disabled = true;
    div.appendChild(importHTMLEditorButton)

    // create import json button
    var importJSONEditorButton = document.createElement('button')
    importJSONEditorButton.setAttribute('id', 'importeditorjson')
    importJSONEditorButton.setAttribute('class', 'editorbutton')
    importJSONEditorButton.setAttribute('onclick', 'importEditorJSON()')
    importJSONEditorButton.insertAdjacentText('beforeend', 'Import JSON ');
    importJSONEditorButton.disabled = true;
    div.appendChild(importJSONEditorButton)

    // create save json button
    var saveJSONEditorButton = document.createElement('button')
    saveJSONEditorButton.setAttribute('id', 'saveeditorjson')
    saveJSONEditorButton.setAttribute('class', 'editorbutton')
    saveJSONEditorButton.setAttribute('onclick', 'saveEditorJSON()')
    saveJSONEditorButton.insertAdjacentText('beforeend', 'Save JSON');
    saveJSONEditorButton.disabled = true;
    div.appendChild(saveJSONEditorButton)

    // create save json button
    var openJSONEditorButton = document.createElement('input')
    openJSONEditorButton.setAttribute('id', 'openeditorjson')
    openJSONEditorButton.setAttribute('type', 'file')
    //openJSONEditorButton.setAttribute('onclick', 'openEditorJSON()')
    openJSONEditorButton.disabled = true;
    div.appendChild(openJSONEditorButton)

    // add warning message
    var warningMessage = document.createTextNode("WARNING: Do not change from campaign pages before saving your work!");
    div.appendChild(warningMessage);

    // add to editor
    document.body.appendChild(div);

    const inputElement = document.getElementById("openeditorjson");
    inputElement.addEventListener("change", openEditorJSON, false);
}

// import script
let scriptEle = document.createElement("script");
scriptEle.setAttribute("src", "https://editor.unlayer.com/embed.js");
scriptEle.setAttribute("type", "text/javascript");
document.body.appendChild(scriptEle);

let pageScript = document.createElement("script");
pageScript.text = "if(window.location.href.includes(\"/admin/campaigns\")){createEditor();}"
document.body.appendChild(pageScript);

const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            if (window.location.href.includes("campaigns")) {
                element = document.getElementById('editor');
                if (!(typeof (element) != 'undefined' && element != null)) {
                    createEditor();
                }
            }
            else {
                var parent = document.getElementById('editor');
                if (parent != null) {
                    parent.remove()
                }
            }
        }
    });
    observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;



