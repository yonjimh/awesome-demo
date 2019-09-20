// Create XHR
var xhr = new XMLHttpRequest(),
    blob;

xhr.open("GET", "elephant.png", true);
// Set the responseType to blob
xhr.responseType = "blob";

xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
        console.log("Image retrieved");
        
        // File as response
        blob = xhr.response;

        // Put the received blob into IndexedDB
    }
}, false);
// Send XHR
xhr.send();