/* eslint-disable prettier/prettier */
const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.signUp = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Only POST requests are accepted');
        return;
    }

    const {fullName, email, password, dob} = request.body;
    if (!fullName || !email || !password || !dob) {
        response.status(400).send('Missing required parameters');
        return;
    }
    const userRef = admin.firestore().collection('users');
    const userDoc = userRef.doc();
    const userId = userDoc.id;
    const userData = {
        id: userId,
        fullName: fullName,
        email: email,
        password: password,
        dob: admin.firestore.Timestamp.fromDate(new Date(dob)),
        createdAt: new Date(),
        trips: [],
        swipes: [],
    };
    userDoc.set(userData);
    response.status(200).send(userData);

});

exports.getUser = functions.https.onRequest((request, response) => {
    if (request.method !== 'GET') {
        response.status(400).send('Only GET requests are accepted');
        return;
    }

    const {email} = request.query;
    const userRef = admin.firestore().collection('users');
    const userQuery = userRef.where('email', '==', email);
    userQuery.get().then(snapshot => {
        if (snapshot.empty) {
            response.status(404).send('User not found');
            return;
        }
        const userData = snapshot.docs[0].data();
        response.status(200).send(userData);
    });
});

exports.login = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Only POST requests are accepted');
        return;
    }

    const {email, password} = request.body;
    if (!email || !password) {
        response.status(400).send('Missing required parameters');
        return;
    }
    const userRef = admin.firestore().collection('users');
    const userQuery = userRef.where('email', '==', email);
    userQuery.get().then(snapshot => {
        if (snapshot.empty) {
            response.status(404).send('User not found');
            return;
        }
        const userData = snapshot.docs[0].data();
        if (userData.password !== password) {
            response.status(401).send({login: false, message: 'Wrong password'});
            return;
        }
        response.status(200).send({...userData, login: true});
    });
});

exports.createNewTrip = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Only POST requests are accepted');
        return;
    }

    const {email, tripImage, tripName, tripDateStart,tripDateEnd , tripDestination, itenerary} = request.body;
    if (!email || !tripImage || !tripName  || !tripDestination || !itenerary) {
        response.status(400).send('Missing required parameters');
        return;
    }
    const tripData = {
        tripImage: tripImage,
        tripName: tripName,
        tripDestination: tripDestination,
        itenerary: itenerary,
        createdAt: new Date(),
        email: email,
    };

    if (tripDateStart && tripDateEnd) {
        tripData.tripDateStart = admin.firestore.Timestamp.fromDate(new Date(tripDateStart));
        tripData.tripDateEnd = admin.firestore.Timestamp.fromDate(new Date(tripDateEnd));
    } else {
        tripData.tripDateStart = admin.firestore.Timestamp.fromDate(new Date());
        tripData.tripDateEnd = admin.firestore.Timestamp.fromDate(new Date());
    }
    const tripRef = admin.firestore().collection('trips');
    const tripDoc = tripRef.doc();
    const tripId = tripDoc.id;
    tripData.id = tripId;
    tripDoc.set(tripData);

    const userRef = admin.firestore().collection("users");
    const userQuery = userRef.where("email", "==", email);
    userQuery.get().then(snapshot => {
        if (snapshot.empty) {
            response.status(404).send('User not found');
            return;
        }
        snapshot.docs[0].ref.update({
            trips: admin.firestore.FieldValue.arrayUnion(tripData),
        });
    });
    response.status(200).send(tripData);
});

exports.getTripsForUser = functions.https.onRequest((request, response) => {
    if (request.method !== 'GET') {
        response.status(400).send('Only GET requests are accepted');
        return;
    }

    const {email} = request.query;
    const userRef = admin.firestore().collection('users');
    const userQuery = userRef.where('email', '==', email);
    userQuery.get().then(snapshot => {
        if (snapshot.empty) {
            response.status(404).send('User not found');
            return;
        }
        const userData = snapshot.docs.map(doc => doc.data())[0];
        response.status(200).send(userData.trips);
    });
});

exports.updateTripDates = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Only POST requests are accepted');
        return;
    }

    const {tripId, tripDateStart, tripDateEnd} = request.body;
    if (!tripId || !tripDateStart || !tripDateEnd) {
        response.status(400).send('Missing required parameters');
        return;
    }
    const tripRef = admin.firestore().collection('trips').doc(tripId);
    tripRef.update({
        tripDateStart: admin.firestore.Timestamp.fromDate(new Date(tripDateStart)),
        tripDateEnd: admin.firestore.Timestamp.fromDate(new Date(tripDateEnd)),
    });
    response.status(200).send({tripId, tripDateStart, tripDateEnd});
});

exports.getTripDates = functions.https.onRequest((request, response) => {
    if (request.method != "GET") {
        response.status(400).send("Only GET requests are accepted");
        return;
    }

    const {tripId} = request.query;
    if (!tripId) {
        response.status(400).send("Missing required parameters");
        return;
    }
    const tripRef = admin.firestore().collection('trips').doc(tripId);
    tripRef.get().then(snapshot => {
        if (snapshot.empty) {
            response.status(404).send("Trip not found");
            return;
        }
        const tripData = snapshot.data();
        response.status(200).send({tripDateStart: tripData.tripDateStart.toDate(), tripDateEnd: tripData.tripDateEnd.toDate()});
    });
});

exports.getATrip = functions.https.onRequest((request, response) => {
    if (request.method !== 'GET') {
        response.status(400).send('Only GET requests are accepted');
        return;
    }

    const {tripId} = request.query;
    if (!tripId) {
        response.status(400).send('Missing required parameters');
        return;
    }
    const tripRef = admin.firestore().collection('trips').doc(tripId);
    tripRef.get().then(snapshot => {
        if (snapshot.empty) {
            response.status(404).send('Trip not found');
            return;
        }
        const tripData = snapshot.data();
        response.status(200).send(tripData);
    });
});
