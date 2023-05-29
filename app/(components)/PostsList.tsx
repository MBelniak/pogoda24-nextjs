import React from 'react';
import PostDTO from '../../model/PostDTO';
import PostsListItem from './PostsListItem';
import config from '../../config/config';
import { registerView } from '@/service';

const { nonExpandedPostLength } = config;

interface PostsProps {
    posts: PostDTO[];
}

export const PostsList: React.FC<PostsProps> = ({ posts }) => {
    const isExpandedByDefault = (post: PostDTO) => {
        return post.description.length <= nonExpandedPostLength && post.description.split(/[(\r\n)(\n)]/g).length <= 2;
    };

    const expandedPostsIds = posts.filter(post => isExpandedByDefault(post)).map(post => post.id);
    registerView(expandedPostsIds);

    return (
        <>
            {posts.map((post, i) => (
                // @ts-expect-error
                <PostsListItem post={post} key={i} />
            ))}
        </>
    );
};
