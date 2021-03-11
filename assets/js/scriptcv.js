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
      //get file content
      // do sth with text

      var li = document.createElement("li");
      var a = document.createElement("a");
      ul.appendChild(li);
      a.innerHTML = name;
      a.href = "data:application/octet-stream," + bin;
      a.download = name;
      li.appendChild(a);
    };
    reader.readAsDataURL(file);
  }

  for (var i = 0; i < files.length; i++) {
    setup_reader(files[i]);
  }
}
