import firebase from 'firebase'

export const  getData = (postId)=> {
    console.log('postID', postId)
    console.log('usersRef', usersRef)
    const usersRef = firebase.database().ref('users/');

    usersRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log('dataFB', data)
        // updateStarCount(postElement, data);
    });
}

export const getDataSnapshot = (id) => {
    const dbRef = firebase.database().ref();
    console.log('dbRef', dbRef)
    dbRef.child("users").child(id).get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log('VAL SN',snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error('getDataSnapshot',error);
    });
}

