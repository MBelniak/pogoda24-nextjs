import React from 'react';
import Post from '../../model/Post';
import PostsListItem from './PostsListItem';
import config from '../../config/config';

const { nonExpandedPostLength } = config;

interface PostsProps {
    posts: Post[];
}

export const PostsList: React.FC<PostsProps> = ({ posts }) => {
    // constructor(props) {
    //     super(props);
    //     this.registerView = this.registerView.bind(this);
    // }

    // private registerView(ids: number[]) {
    //     const body = ids.map(postId => {
    //         return {
    //             postId: postId,
    //             views: 1
    //         };
    //     });
    //     fetchApi('api/views/registerViews', {
    //         method: 'POST',
    //         body: JSON.stringify(body),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // }

    // private registerPostsExpandedByDefault() {
    //     const expandedPostsIds = this.props.posts.filter(post => this.isExpandedByDefault(post)).map(post => post.id);
    //     this.registerView(expandedPostsIds);
    // }
    //
    // private isExpandedByDefault(post: Post) {
    //     return post.description.length <= nonExpandedPostLength && post.description.split(/[(\r\n)(\n)]/g).length <= 2;
    // }
    //
    // componentDidMount() {
    //     this.registerPostsExpandedByDefault();
    // }

    return (
        <>
            {posts.map((post, i) => (
                <PostsListItem post={post} key={i} />
                // <PostsListItem post={post} registerView={this.registerView} key={i} />
            ))}
        </>
    );
};
