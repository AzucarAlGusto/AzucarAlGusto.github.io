// reference your database
var ContactanosDB = firebase.database().ref("Contactanos");

document.getElementById("Contactanos").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var phone = getElementVal("phone");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, phone, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
	closeMessagePopup();
  }, 2000);

  //   reset the form
  document.getElementById("Contactanos").reset();
  update();
}

const saveMessages = (name, phone, msgContent) => {
  var newContactanos = ContactanosDB.push();

  newContactanos.set({
    name: name,
    phone: phone,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
