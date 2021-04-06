var loggedIn = false;

function authenticate() {
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
    success: function(response){
      if(response.success === true){
        nextPage();
      }
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });
}

function nextPage(){
  var location = window.open(window.location.origin + '/dashboard.html');
  console.log(location);
}