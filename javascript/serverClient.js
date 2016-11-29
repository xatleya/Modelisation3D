window.addEventListener("load", Ready);

function Ready(){ 
	if(window.File && window.FileReader){ 	//check if the files API are supported
		document.getElementById('UploadButton').addEventListener('click', StartUpload);  
		document.getElementById('FileBox').addEventListener('change', FileChosen);
	}
	else
	{
		document.getElementById('UploadArea').innerHTML = "Your Browser Doesn't Support The File API Please Update Your Browser";
	}
}

var SelectedFile;
function FileChosen(evnt) {
	SelectedFile = evnt.target.files[0];	//get the file chosen
	document.getElementById('NameBox').value = SelectedFile.name;	//print his name
}

var socket = io.connect('http://localhost:8080');	//connect to the server
var FReader;
var Name;

function StartUpload(){
	if(document.getElementById('FileBox').value != "")	//if you selected a file
	{
		FReader = new FileReader();		//to chunk a file 
		Name = document.getElementById('NameBox').value;
		FReader.onload = function(evnt){	//to capture the file informations
			socket.emit('Upload', { 'Name' : Name, Data : evnt.target.result });	//send data with label "Upload"
		}
		socket.emit('Start', { 'Name' : Name, 'Size' : SelectedFile.size });
	}
	else
	{
		alert("Please Select A File");
	}
}

socket.on('MoreData', function (data){
	var Place = data['Place'] * 524288;
	var NewFile; //The Variable that will hold the new Block of Data
	if(SelectedFile.webkitSlice) 
		NewFile = SelectedFile.webkitSlice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
	else
		NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
	FReader.readAsBinaryString(NewFile);
});