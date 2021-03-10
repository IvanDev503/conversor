$(function () {
  var body = $("body"),
    stage = $("#stage"),
    back = $("a.back");

  /* Step 1 */

  $("#step1 .encrypt").click(function () {
    body.attr("class", "encrypt");
    console.log("Here I am");
    // Go to step 2
    step(2);
  });

  /* Step 2 */

  $("#step2 .button").click(function () {
    // Trigger the file browser dialog
    $(this).parent().find("input").click();
  });

  // Set up events for the file inputs

  var file = null;

  $("#step2").on("change", "#encrypt-input", function (e) {
    // Has a file been selected?

    /*    if (e.target.files.length != 1) {
      alert("Please select a file to encrypt!");
      return false;
    } */
    var filelist = e.target.files;

    for (var i = 0; i < filelist.length; i++) {
      file = e.target.files[i];
      console.log(file);
    }

    /* 
    if (file.size > 1024 * 1024) {
      alert(
        "Please choose files smaller than 1mb, otherwise you may crash your browser. \nThis is a known issue. See the tutorial."
      );
      return;
    } */

    step(3);
  });

  /* Step 3 */
  $("a.button.process").click(function () {
    (a = $("#step4 a.download")),
      // The HTML5 FileReader object will allow us to read the
      // contents of the	selected file.

      (reader = new FileReader());

    if (body.hasClass("encrypt")) {
      // Encrypt the file!

      reader.onload = function (e) {
        // Use the CryptoJS library and the AES cypher to encrypt the
        // contents of the file, held in e.target.result, with the password
        //resultList = e.target.result;
        var encrypted = document.write(escape(e.target.result));

        // The download attribute will cause the contents of the href
        // attribute to be downloaded when clicked. The download attribute
        // also holds the name of the file that is offered for download.
        a.attr("href", "data:application/octet-stream," + encrypted);
        a.attr("download", file.name);

        step(4);
      };

      // This will encode the contents of the file into a data-uri.
      // It will trigger the onload handler above, with the result

      console.log("File 2 : " + JSON.stringify(file));
      //reader.readAsDataURL(file);
      reader.readAsText(file);
    }
  });

  /* The back button */
  back.click(function () {
    // Reinitialize the hidden file inputs,
    // so that they don't hold the selection
    // from last time

    $("#step2 input[type=file]").replaceWith(function () {
      return $(this).clone();
    });

    step(1);
  });

  // Helper function that moves the viewport to the correct step div

  function step(i) {
    if (i == 1) {
      back.fadeOut();
    } else {
      back.fadeIn();
    }

    // Move the #stage div. Changing the top property will trigger
    // a css transition on the element. i-1 because we want the
    // steps to start from 1:

    stage.css("top", -(i - 1) * 100 + "%");
  }
});
