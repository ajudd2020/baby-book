const posts = [
  {
    caption: 'Maecenas mus. Quam litora congue sollicitudin lore',
    category: 'Birthdays',
    creation: {
      nanoseconds: 871000001,
      seconds: 1615608546,
    },
    downloadURL: 'https://picsum.photos/200',
    tags: 'Fun, Happy, Friends, Family',
  },
  {
    caption: 'Posuere libero pulvinar aliquet vel morbi. Nibh eg',
    category: 'Milestones',
    creation: {
      nanoseconds: 871000002,
      seconds: 1615608546,
    },
    downloadURL: 'https://picsum.photos/200',
    tags: 'Walking, Talking, Running',
  },
];

import firebase from 'firebase';
import 'firebase/firestore';

// ACTION CONSTANTS
const GOT_POSTS = 'GOT_POSTS';
const CLEAR_POSTS = 'CLEAR_POSTS';

// ACTION CREATORS
export const gotPosts = (posts) => ({
  type: GOT_POSTS,
  posts,
});

export const clearPosts = () => ({
  type: CLEAR_POSTS,
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
      .orderBy('creation')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          postsArr.push(doc.data());
        });
        if (postsArr.length > 0) {
          dispatch(gotPosts(postsArr));
        }
      });
    // dispatch(gotPosts(posts));
  };
};

// INITIAL STATE
const initialState = [];

// REDUCER
function postReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_POSTS:
      return action.posts;
    case CLEAR_POSTS:
      return [];
    default:
      return state;
  }
}

export default postReducer;

// to order:
// .orderBy('creation')
