import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/posts';

import { useFocusEffect } from '@react-navigation/native';

export function BabyBook(props) {
  const [posts, setPosts] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      props.getPosts();
    }, [])
  );

  // console.log(props.posts[0].creation.toDate().toString());

  return (
    <ScrollView style={styles.container}>
      <View>
        {props.posts.length > 0 ? (
          props.posts.map((post) => {
            return (
              <View key={post.caption} style={styles.entryBox}>
                <Image
                  source={{
                    uri: post.downloadURL,
                  }}
                  style={styles.image}
                />
                <View style={styles.content}>
                  <Text style={styles.caption}>{post.caption}</Text>
                  <Text style={styles.date}>
                    {post.creation.toDate().toString().slice(0, 25)}
                  </Text>
                  {/* <Text style={styles.date}>
                    Date: {new Date().toString().slice(0, 25)}
                  </Text> */}
                  <Text style={styles.category}>Category: {post.category}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <View>
            <Text style={styles.empty}>No Posts Yet!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
// }
const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BabyBook);

const styles = StyleSheet.create({
  entryBox: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  caption: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  date: {
    fontSize: 8,
  },
  category: {
    fontSize: 10,
  },
  image: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: 200,
    height: 200,
  },
  empty: {
    textAlign: 'center',
    margin: 50,
  },
  container: {
    backgroundColor: '#EDF5E1',
  },
});
