import firebase from 'firebase'

export const getData =  async (postId) => {
    console.log('postID', postId)
    let firebaseUserId = []
    const usersRef =  firebase.database().ref('users/' + postId);
    console.log('usersRef2', usersRef)
    await usersRef.once('value', (snapshot) => {
        let data = snapshot.val();
        console.log('ddd', data)
        console.log('firebaseUserId', firebaseUserId)
        firebaseUserId.push(data)
        console.log('firebaseUserId!!!!', firebaseUserId)
        // return firebaseUserId
    });
    return firebaseUserId
}

// const dialogsRef = firebase.database().ref('/users');
// dialogsRef.on('value', snapshot => {
//     const firebaseData = [];
//     snapshot.forEach(childSnapshot => {
//         const uid = childSnapshot.uid;
//         const data = childSnapshot.val();
//         firebaseData.push({
//             uid: uid,
//             ...data,
//         });
//     });
//     dispatch(signIn(firebaseData));

export const getDataSnapshot = (id) => {
    const dbRef = firebase.database().ref();
    console.log('dbRef', dbRef)
    dbRef.child("users").child(id).get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log('VAL SN', snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error('getDataSnapshot', error);
    });
}

