document.getElementById("loginForm").addEventListener("login", iniciarsecion);
document.getElementById("loginForm").addEventListener("newreg", nuevousuario);


function iniciarsecion() {
	
  var email = getElementVal("email");
  var password = getElementVal("password");
  // [START auth_signup_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
	alert("Bienvenido!");
	  document.getElementById("loginForm").reset();
	  closeLoginPopup();
	  if (email = "fabriziocaceresruz@hotmail.com") {isadmin = true} else {};
	  update();
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
	alert(error.message);
	  update();
  });
  // [END auth_signup_password]
}

function nuevousuario() {
  var email = getElementVal("email");
  var password = getElementVal("password");
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
	  alert("Cuenta creada!");
	  document.getElementById("loginForm").reset();
	  closeLoginPopup();
	  update();
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
	  alert(error.message);
	  update();
    });
  // [END auth_signup_password]
}

function sendPasswordReset() {
  const email = getElementVal("email");
  // [START auth_send_password_reset]
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
	  alert("Mail Sent");
	  document.getElementById("loginForm").reset();
	  closeLoginPopup();
	  update();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
	  alert(error.message);
	  update();
    });
  // [END auth_send_password_reset]
}
function closesecion() {
	firebase.auth().signOut().then(() => {
		alert("Seción Cerrada");
			document.getElementById('bott01.1').style.display = 'none';
			document.getElementById('bott01.0').style.display = 'block';
			document.getElementById('bott05').style.display = 'none';
			document.getElementById('bott03').style.display = 'block';
		update();
	  // Sign-out successful.
	}).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(error.message);
		update();
	  // An error happened.
	});
}