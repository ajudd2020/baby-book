import firebase from 'firebase';
import 'firebase/firestore';

// ACTION CONSTANTS
const GOT_USER = 'GOT_USER';

// ACTION CREATORS
export const gotUser = (user) => ({
  type: GOT_USER,
  user,
});

// THUNKS
export const getUser = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch(gotUser(snapshot.data()));
        } else {
          console.log('USER DOES NOT EXIST');
        }
      });
  };
};

// INITIAL STATE
const initialState = {};

// REDUCER
function userReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    default:
      return state;
  }
}

export default userReducer;
