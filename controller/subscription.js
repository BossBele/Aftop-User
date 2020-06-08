const BASE_URL = "http://172.105.157.88/";
const VOUCHERS_COLLECTION = "vouchers";

let is_user_subscribed = false;
let end_time = 0;

let downloading = false;
let playing_full_video = false;

const credential = require('./connection/firebase_credential');
const db = credential.firestore();

// set_subscription();

function wallet_pay(input_data) {

    $.post(BASE_URL, input_data, function (data, status) {

        let result = JSON.parse(data);

        if (status === 200 && result.resultcode === "000") {
            // set subscription listener
            set_subscription_listener(db, input_data.order_id);

            // Notify user that the PIN request has been sent. UI

            // If PAY method is M-PESA.
            if (input_data.payment_method === "M-PESA") {
                // Display payment instructions

            }
        } else {
            // Notify the user that something went wrong. UI

        }

    });
}

function set_subscription_listener(db, order_id) {
    db.collection(VOUCHERS_COLLECTION).doc(order_id)
        .onSnapshot(function (doc) {
            if (doc.exists) {
                update_info(doc)
                // Resume the pending action that required subscription
                if (downloading) {
                    resume_download();
                } else if (playing_full_video) {
                    resume_full_video();
                }

            }
        });
}

function is_subscribed() {
    return is_user_subscribed && end_time > get_current_time();
}

function get_current_time() {
    let d = new Date()
    return d.getTime() / 1000;
}

exports.set_subscription = function(firebase) {

    let current_time = get_current_time();
    console.log(get_user_email(firebase));
    let query = db.collection(VOUCHERS_COLLECTION)
        .where("customerId", "==", get_user_email(firebase))
        .where("end", ">", current_time)
        .orderBy("end", "desc")
        .limit(1);

    query.get().then(function (doc) {
        update_info(doc);
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function my_subscription_info() {

}

function update_info(doc) {
    is_user_subscribed = doc.exists;
    if (is_user_subscribed) {
        let data = doc.data();
        end_time = data.end;
    }

    console.log("subscription is set");;
}

function get_user_email(firebase) {
    let user = firebase.auth().currentUser;
    return user != null ? user.email : null;
}

function set_playing_full_video() {
    downloading = false;
    playing_full_video = true;
}

function set_downloading() {
    downloading = true;
    playing_full_video = false;
}

function resume_download() {

}

function resume_full_video() {

}
