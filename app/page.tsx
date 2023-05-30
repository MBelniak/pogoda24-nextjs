import React from 'react';
import { ExternalApi } from '@/shared-components/ExternalApi';
import { getFirestore } from 'firebase-admin/firestore';
import { PostsList } from '@/app/(components)/PostsList';
import PostDTO from '@/model';
import { CurrentWarnings } from '@/app/(components)/CurrentWarnings';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import sort from 'lodash/sortBy';
const db = getFirestore();
const HOMEPAGE_POSTS_NUMBER = 6;

export interface WarningInfo {
    title: string;
    postId: string;
    dueDate?: Date;
}

const getPosts = async (): Promise<PostDTO[]> => {
    const docs = await db.collection('posts').orderBy('postDate', 'desc').limit(HOMEPAGE_POSTS_NUMBER).get();
    return await Promise.all(
        docs.docs.map(async doc => ({
            ...(doc.data() as PostDTO),
            id: doc.id
        }))
    );
};

const getWarnings = async (): Promise<WarningInfo[]> => {
    const docs = await db
        .collection('posts')
        .where('postType', '==', 'WARNING')
        .where('dueDate', '>=', new Date())
        .get()
        .then(refs => refs.docs);
    return sort(
        await Promise.all(
            docs
                .map(async doc => ({ ...((await doc.data()) as PostDTO), id: doc.id }))
                .map(async data => {
                    const warning = await data;
                    return {
                        title: warning.title,
                        postId: warning.id,
                        dueDate: warning.dueDate ? zonedTimeToUtc(warning.dueDate.toDate(), 'Europe/Warsaw') : undefined
                    };
                })
        ),
        'postDate'
    );
};

export default async function Home() {
    const posts = await getPosts();
    const warnings = await getWarnings();
    return (
        <main className="mainContent">
            <div className="columns">
                <div className="column is-2 warnings pr-4">
                    <CurrentWarnings warningInfo={warnings} />
                </div>
                <div className="column is-8 posts">
                    {posts.length !== 0 ? (
                        <PostsList posts={posts} />
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '20px'
                            }}>
                            <p className="fontSizeLarge">Brak postów.</p>
                        </div>
                    )}
                </div>
                <div className="column is-2 pl-4 fontSizeMedium">
                    <ExternalApi />
                </div>
            </div>
        </main>
    );
}
