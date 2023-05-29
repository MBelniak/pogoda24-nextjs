import React from 'react';
import Post from '../../model/Post';
import PostsListItem from './PostsListItem';
import config from '../../config/config';
import { registerView } from '@/service';

const { nonExpandedPostLength } = config;

interface PostsProps {
    posts: Post[];
}

export const PostsList: React.FC<PostsProps> = ({ posts }) => {
    const isExpandedByDefault = (post: Post) => {
        return post.description.length <= nonExpandedPostLength && post.description.split(/[(\r\n)(\n)]/g).length <= 2;
    };

    const expandedPostsIds = posts.filter(post => isExpandedByDefault(post)).map(post => post.id);
    registerView(expandedPostsIds);

    return (
        <>
            {posts.map((post, i) => (
                <PostsListItem post={post} key={i} />
            ))}
        </>
    );
};
