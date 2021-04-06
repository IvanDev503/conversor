var loggedIn = false;

function authenticate() {
  nextPage();
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  loggedIn = login(user, password);
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

  console.log(success);
}

function nextPage(){
  console.log('next page');
  window.location.origin + '/dashboard.html';
}