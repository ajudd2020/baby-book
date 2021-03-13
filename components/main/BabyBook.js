import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/posts';

// export function BabyBook(props) {
//   const [posts, setPosts] = React.useState([]);

//   React.useEffect(() => {
//     setPosts(props.posts);
//     console.log('POSTS IN USE EFFECT', posts);
//   }, [props.posts]);
// }

export class BabyBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    console.log('RUNNING');

    // console.log('POSTS??', this.props.posts);
    this.setState({ posts: this.props.posts });
  }

  componentDidUpdate(prevProps) {
    console.log('UPDATE');
    if (prevProps.posts < this.props.posts) {
      console.log('SOMETHIHNG HAS BEEN ADDED');
      this.setState({ posts: this.props.posts });
    }
    // console.log('UPDATE?', prevProps, 'NOW', this.props);
  }
  render() {
    console.log('POSTS IN BABY BOOK?', this.props.posts);

    return (
      <ScrollView>
        <View>
          {this.props.posts.length > 0 ? (
            this.props.posts.map((post) => {
              console.log('POST', post);
              return (
                <View key={post.creation} style={styles.entryBox}>
                  <Image
                    source={{
                      uri:
                        'https://i.picsum.photos/id/508/200/300.jpg?hmac=h7es7XtWndmLEtkzgE3VR1IHXLsLzKplxL_77_YNTGo',
                    }}
                    style={{ width: 200, height: 200 }}
                  />
                  <Text>{post.caption}</Text>
                </View>
              );
            })
          ) : (
            <Text>Hi</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}
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
  },
});
