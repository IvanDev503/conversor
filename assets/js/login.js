var loggedIn = false;
var status;

function authenticate() {
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  loggedIn = login(user, password);
  nextPage();
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
    success: function(response){
     for(let status in response){
      console.log(status);
     }
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });
}

function nextPage(){
  window.location.origin + '/dashboard.html';
}