const admin = require("./node_modules/firebase-admin");
const serviceAccount = require("./firebase.json");
const data = require("./data.json");
const collectionKey = "rates"; //name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && typeof data === "object") {
  Object.keys(data).forEach((docKey) => {
    firestore
      .collection(collectionKey)
      .add(data[docKey])
      .then((docRef) => {
        console.log(`${data[docKey].name} ==> ${docRef.id}`);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}
