import React from 'react';
import { getFirestore } from 'firebase-admin/firestore';
import PostDTO, { HrefToPostType, PostType } from '@/model';
import { PostsList } from '@/app/(components)/PostsList';
import { PostsPagingBar } from '@/app/(components)/PostsPagingBar';

const db = getFirestore();

const POSTS_PER_PAGE = 6;
interface Params {
    params: {
        postType: string;
        page: string;
    };
}

const fetchPosts = async (postType: string, page: string): Promise<PostDTO[]> => {
    const docs = await db
        .collection('posts')
        .where('postType', '==', HrefToPostType[postType])
        .orderBy('postDate')
        .startAt(parseInt(page) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE)
        .get();
    return await Promise.all(
        docs.docs.map(async doc => ({
            ...(doc.data() as PostDTO),
            id: doc.id
        }))
    );
};

const fetchTotalCount = async (postType: string): Promise<number> => {
    const result = await db.collection('posts').where('postType', '==', HrefToPostType[postType]).count().get();
    return result.data().count;
};
export default async function Posts({ params }: Params) {
    const posts = await fetchPosts(params.postType, params.page);
    const totalCount = await fetchTotalCount(params.postType);

    const postTypeToText = (): string => {
        return params.postType == PostType.FACT
            ? 'ciekawostek'
            : params.postType == PostType.WARNING
            ? 'ostrzeżeń'
            : 'prognoz';
    };

    return (
        <section className="mainContent">
            <div className="columns">
                <div className="column is-1" />
                <div className="column is-10 flex-col justify-between p-2">
                    {posts.length !== 0 ? (
                        <div>
                            <PostsList posts={posts} />
                            {totalCount <= POSTS_PER_PAGE ? null : (
                                <PostsPagingBar
                                    totalCount={totalCount}
                                    currentPage={parseInt(params.page)}
                                    rootHref={`/${params.postType}`}
                                    postsPerPage={POSTS_PER_PAGE}
                                />
                            )}
                        </div>
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '20px'
                            }}>
                            <p className="fontSizeLarge">Brak {postTypeToText()}.</p>
                        </div>
                    )}
                </div>
                <div className="column is-1" />
            </div>
        </section>
    );
}
