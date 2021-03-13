import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/posts';

export class BabyBook extends React.Component {
  componentDidMount() {
    console.log('RUNNING');
    this.props.getPosts();
  }
  render() {
    console.log('POSTS IN BABY BOOK?', this.props.posts);

    return (
      <View>
        {this.props.posts.length > 0 ? (
          this.props.posts.map((post) => {
            return (
              <View>
                <Text>{post.caption}</Text>
                <Image
                  source={{ uri: post.downloadURL }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            );
          })
        ) : (
          <TEXT>No posts to show. Start saving those memories now!</TEXT>
        )}
      </View>
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
