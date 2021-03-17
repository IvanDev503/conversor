var loggedIn = false;

function authenticate() {
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  loggedIn = login(user, password);
  status();
}

function login(user, password) {
  let url = "https://beta.stream.api.toc-goldratt.com/app/login";
  var dataLogin = {
    user: user,
    password: password,
    csrf: "",
  };

  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(dataLogin),
    success: "Success!",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });

  console.log(JSON.stringify(dataLogin));
}

function status() {
  if (loggedIn) {
    console.log("You are in :)");
  } else {
    console.log("You are not in :(");
  }
}
