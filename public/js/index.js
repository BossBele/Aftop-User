const admin = require('firebase-admin');
let serviceAccount = require('./serviceAccountKey.json');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
let category = "all";
let collection = "series";


getVideos(db, category, collection);

function getVideos(db, category, collection){

	let ref;

	if (collection == "movies") {

		if(category == "all" || category == "latest"){
		   ref = db.collection(collection)
		   			.where('launched', '==', true)
		   			.orderBy('launch_date', 'desc');
		}

		else {
		   ref = db.collection(collection)
		 		    .where('genre', '==', category)
		   			.where('launched', '==', true)
		   			.orderBy('launch_date', 'desc');
		}

	} else if (collection == "series") {

		if(category == "all" || category == "latest"){

	   		ref = db.collection(collection)
	 				.orderBy('release_date', 'desc');
		}

		else {
	   		ref = db.collection(collection)
		   			.where('genre', '==', category)
		   			.orderBy('release_date', 'desc');
		}

	}


	ref.get()
	   .then((snapshot) => {
		    snapshot.forEach((doc) => {
    	    console.log(doc.id, '=>', doc.data());
    		});
  		})
  		.catch((err) => {
    		console.log('Error getting documents', err);
  		});
}

