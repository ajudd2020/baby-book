import firebase from 'firebase';
import 'firebase/firestore';

// ACTION CONSTANTS
const GOT_POSTS = 'GOT_POSTS';

// ACTION CREATORS
export const gotPosts = (posts) => ({
  type: GOT_POSTS,
  posts,
});

// THUNKS
export const getPosts = () => {
  const postsArr = [];
  return (dispatch) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('babyBookPosts')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          postsArr.push(doc.data());
        });
        if (postsArr.length > 0) {
          dispatch(gotPosts(postsArr));
        }
      });
  };
};

// INITIAL STATE
const initialState = [];

// REDUCER
function postReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_POSTS:
      return action.posts;
    default:
      return state;
  }
}

export default postReducer;

// const saveDataToDb = (downloadURL) => {
//   firebase
//     .firestore()
//     .collection('posts')
//     .doc(firebase.auth().currentUser.uid)
//     .collection('babyBookPosts')
//     .add({
//       downloadURL,
//       caption,
//       category,
//       tags,
//       creation: firebase.firestore.FieldValue.serverTimestamp(),
//     })
//     .then(() => props.navigation.popToTop());
// };
