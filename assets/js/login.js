var loggedIn = false;
var status;

function authenticate() {
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  loggedIn = login(user, password);
  if(this.status === true){
    console.log("Hi! my dear dev! I'm so happy to be created by you! Love U! :3")
    nextPage();
  }
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
      this.status = response.success;
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });
}

function nextPage(){
  window.location.origin + '/dashboard.html';
}