function readmessages() {
	var userId = firebase.auth().currentUser.uid;
	const dbRef = firebase.database().ref("Contactanos");
	dbRef.get().then((snapshot) => {
	  if (snapshot.exists()) {
		console.log(snapshot.val());
	  } else {
		console.log("No data available");
	  }
	}).catch((error) => {
	  console.error(error);
	});
}