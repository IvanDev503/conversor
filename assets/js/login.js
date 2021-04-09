var loggedIn = false;

///////////// Funciones para cookies //////////////
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//////////////////////////////////////////////////////////////////////////////////////


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
        //generar cookie
        setCookie('logcookie','testcookie',7);
      }
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });
}

function nextPage(){
  var location = window.open(window.location.origin + '/dashboard.html','_self');
  console.log(location);
}

$('document').ready(function(){
  
  $('[data-login-button], [data-logout-button]').click(function(){
    $('[data-login-form], [data-login-user]').toggleClass('state-hidden');
    $('[data-header]').toggleClass('state-logged-in');
  });
  
});

function handleLogout( ){
  window.localStorage.clear();
  window.location.reload(true);
  window.location.replace('/');
  //eliminar cookie
  eraseCookie('logcookie');
};
