import React from 'react';
import PostDTO from '../../model';
import PostsListItem from './PostsListItem';
import { registerView } from '@/service';

interface PostsProps {
    posts: PostDTO[];
}

export const PostsList: React.FC<PostsProps> = ({ posts }) => {
    registerView(posts.map(post => post.id));

    return (
        <>
            {posts.map((post, i) => (
                // @ts-expect-error
                <PostsListItem post={post} key={i} />
            ))}
        </>
    );
};
