window.onload = function () {
  if (typeof window.FileReader !== "function") {
    alert("The file API isn't supported on this browser yet.");
  }
};

function readmultifiles(files) {
  var reader = new FileReader();
  function readFile(index) {
    if (index >= files.length) return;
    var file = files[index];
    reader.onload = function (e) {
      // get file content
      var bin = e.target.result;
      // do sth with bin
      readFile(index + 1);
    };
    reader.readAsBinaryString(file);
  }
  readFile(0);

  function setup_reader(file) {
    var name = file.name;
    var reader = new FileReader();

    var ul = document.createElement("ul");
    document.getElementById("bag").appendChild(ul);
    reader.onload = function (e) {
      var bin = escape(e.target.result);
      var unbin = e.target.result;
      // var decrypt = document.write(unescape(bin));
      //b64 = btoa(unescape(encodeURIComponent(e.target.result)));
      function b64EncodeUnicode(string) {
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
          codeUnits[i] = string.charCodeAt(i);
        }
        return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
      }
      b64 = b64EncodeUnicode(bin);
      //get file content
      // do sth with text
      var li = document.createElement("li");
      var a = document.createElement("a");

      var html =
        `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
      <script>
      function b64DecodeUnicode(encoded) {
        binary = atob(encoded)
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return String.fromCharCode(...new Uint16Array(bytes.buffer));
      }      
      document.write(decodeURIComponent(b64DecodeUnicode('` + b64 + `')));
      </script>
      </body>
      </html>
      `;

      ul.appendChild(li);
      a.innerHTML = name + '<button class="ctimes">&times</button>';
      a.href = "data:application/octet-stream," + encodeURI(html);
      a.download = name;
      a.setAttribute('b64', b64);
      a.className = 'd-link';
      li.appendChild(a);

      // Función para eliminar archivos individuales
      $(document).ready(function(){
        $( ".ctimes" ).click(function(e) {
          e.preventDefault();
          $(this).parent().parent().parent().remove();
        });
      });

      var links = document.querySelectorAll("a");
      function get_hrefs(links) {
        links = Array.prototype.slice.call(links);
        return links.map(function (elem) {
          if (
            elem.getAttribute("href") ===
            "data:application/octet-stream," + encodeURI(html)
          ) {
            return elem.getAttribute("href");
          }
        });
      }
      get_hrefs(links);
    };
    //console.log("file", file);
    reader.readAsBinaryString(file);

    return
  }

  for (var i = 0; i < files.length; i++) {
    setup_reader(files[i]);
  }
}

function create_zip() {
  var zip = new JSZip();
	// zip.file("hello1.txt", "Hello First World\n");
	// zip.file("hello2.txt", "Hello Second World\n");
  zip.file("index - copia (39).html");
  // for (var i = 0; i < files.length; i++) {
  //   zip.file(files[i]);
  // }
  content = zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});



}