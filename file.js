
window.onload = function() {
    var input_file = document.getElementById('upload_file');
    var displayResult = document.getElementsByClassName('results')[0];
    input_file.addEventListener('change', function(e) {
	var file = input_file.files[0];
	var reader = new FileReader();

	reader.onload = function(e) {

		var select = document.getElementsByClassName("selections");
			for (var i = 0; i < select.length; i++) {
			    select[i].style.display = 'block';
			}

		var save = document.getElementsByClassName("save");
			for (var i = 0; i < save.length; i++) {
			    save[i].style.display = 'block';
			}
	    var extension = input_file.value.split(".")[1];
	    var fileText = reader.result;
	    if (extension === "xml"){
		var parser = new DOMParser();
		var doc = parser.parseFromString(fileText, "text/xml");
		var results = doc.getElementsByTagName("result");
		for (var i = 0; i < results.length; i++) {
		    var container = document.createElement("div");
		    container.className = "result";
		    var checkb = document.createElement("input");
		    checkb.type = "checkbox";
		    var link = document.createElement("a");
		    link.href = doc.getElementsByTagName("url")[i].textContent;
		    link.innerHTML = doc.getElementsByTagName("title")[i].textContent;
		    var url = document.createElement("p");
		    url.className = "url";
		    url.innerHTML = doc.getElementsByTagName("url")[i].textContent;
		    var desc = document.createElement("p");
		    desc.className = "desc";
		    desc.innerHTML = doc.getElementsByTagName("description")[i].textContent;
		    var br = document.createElement("br");
		    container.appendChild(checkb);
		    container.appendChild(link);
		    container.appendChild(url);
		    container.appendChild(desc);
		    container.appendChild(br);
		    displayResult.appendChild(container);
		}
	    }
	    else if (extension === "json") {
		let obj = JSON.parse(fileText);
		let results = obj.Result;
		for (var i = 0; i < results.length; i++) {
		    var container = document.createElement("div");
		    container.className = "result";
		    var checkb = document.createElement("input");
		    checkb.type = "checkbox";
		    var link = document.createElement("a");
		    link.href = results[i].url;
		    link.innerHTML = results[i].title;
		    var url = document.createElement("p");
		    url.className = "url";
		    url.innerHTML = results[i].url;
		    var desc = document.createElement("p");
		    desc.className = "desc";
		    desc.innerHTML = results[i].description;
		    var br = document.createElement("br");
		    container.appendChild(checkb);
		    container.appendChild(link);
		    container.appendChild(url);
		    container.appendChild(desc);
		    container.appendChild(br);
		    displayResult.appendChild(container);
		}
	    }
	    else if (extension === "csv") {
		var content = fileText.split('\n');
		for (var i = 0; i < content.length; i++) {
		    var elements = content[i].split(',');
		    var container = document.createElement("div");
                    container.className = "result";
                    var checkb = document.createElement("input");
                    checkb.type = "checkbox";
                    var link = document.createElement("a");
                    link.href = elements[1];
                    link.innerHTML = elements[0];
                    var url = document.createElement("p");
                    url.className = "url";
                    url.innerHTML = elements[1];
                    var desc = document.createElement("p");
                    desc.className = "desc";
                    desc.innerHTML = elements[2];
                    var br = document.createElement("br");
                    container.appendChild(checkb);
                    container.appendChild(link);
                    container.appendChild(url);
                    container.appendChild(desc);
                    container.appendChild(br);
                    displayResult.appendChild(container);
		}
	    }
	}

	reader.readAsText(file);
});
}
// for selectors
function selectAll() {
    var results = document.getElementsByClassName("results")[0];
    var indivResults = results.children;
    for (var i = 0; i < indivResults.length; i++) {
	indivResults[i].children[0].checked = true;
    }
}

function deselectAll() {
    var results = document.getElementsByClassName("results")[0];
    var indivResults = results.children;
    for (var i = 0; i < indivResults.length; i++) {
        indivResults[i].children[0].checked = false;
    }
}
//for exporting the file
function writeJSON() {
    var resultsObject = {"Result" : []};
    var name = prompt("Name the file without extension: ");
    name = name + ".json";
    var results = document.getElementsByClassName("results")[0];
    var indRes = results.children;
    for (var i = 0; i < indRes.length; i++) {
	if (indRes[i].children[0].checked) {
	    var title = indRes[i].children[1].innerHTML;
	    var url =   indRes[i].children[2].innerHTML;
	    var description = indRes[i].children[3].innerHTML;
	    var result = {"title": title, "url":url, "description":description};
	    resultsObject["Result"].push(result);
	}
    }
    download(JSON.stringify(resultsObject), name, 'text/plain');
}

function writeCSV() {
    var name = prompt("Name the file without extension: ");
    name = name + ".csv";
    var results = document.getElementsByClassName("results")[0];
    var indRes = results.children;
    var result = "";
    for (var i = 0; i < indRes.length; i++) {
        if (indRes[i].children[0].checked) {
            var title = indRes[i].children[1].innerHTML;
	    title = title.replace(',','');
            var url =   indRes[i].children[2].innerHTML;
	    url = url.replace(',','');
            var description = indRes[i].children[3].innerHTML;
	    description = description.replace(',','');
	    var result = result + title + "," + url + "," + description+"\n";
        }
    }
    result = result.trim();
    download(result, name, 'text/plain');
}

function writeXML() {
    var name = prompt("Name the file without extension: ");
    name = name + ".xml";
    var results = document.getElementsByClassName("results")[0];
    var indRes = results.children;
    var result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<results>\n";
    for (var i = 0; i < indRes.length; i++) {
        if (indRes[i].children[0].checked) {
            var title = indRes[i].children[1].innerHTML;
            title = title.replace(',','');
            var url =   indRes[i].children[2].innerHTML;
            url = url.replace(',','');
            var description = indRes[i].children[3].innerHTML;
            description = description.replace(',','');
            var result = result + "<result>\n<title>" + title + "</title>\n"
            + "<url>" + url + "</url>\n" + "<description>"
            + description + "</description>\n</result>\n";
        }
    }
    result += "</results>";
    download(result, name, 'text/plain');
}

function download(text, name, type) {
    var a = document.getElementById("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
//display fileName
$('#upload_file').on('change',function(){
    var fileName = $(this).val();
    fileName = fileName.replace('C:\\fakepath\\', " ")
    $(this).next('.custom-file-label').html(fileName);
})
