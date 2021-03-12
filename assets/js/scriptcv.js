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
      b64 = btoa(unescape(encodeURIComponent(e.target.result)));
      console.log('b64', b64);
      //get file content
      // do sth with text

      var li = document.createElement("li");
      var a = document.createElement("a");
      var html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
      </body>
      <script>
        document.write(atob('`+b64+`'));
      </script>
      </html>
      `;

      ul.appendChild(li);
      a.innerHTML = name;
      a.href = "data:application/octet-stream," + encodeURI(html);
      a.download = name;
      li.appendChild(a);
    };
    console.log('file', file);
    reader.readAsBinaryString(file);
  }

  for (var i = 0; i < files.length; i++) {
    setup_reader(files[i]);
  }
}