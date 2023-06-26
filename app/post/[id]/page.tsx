import React from 'react';

import { Post } from './Post';
import { getFirestore } from 'firebase-admin/firestore';
import PostDTO from '@/model';

interface Props {
    params: {
        id: string;
    };
}

const db = getFirestore();

const getPost = async (id: string): Promise<PostDTO | undefined> => {
    const doc = await db.collection('posts').doc(id).get();
    if (!doc) {
        return undefined;
    }
    return doc.data() as PostDTO;
};

export default async function PostView({ params }: Props) {
    const postId = params.id;
    const post = await getPost(postId);
    return (
        <section className="mainContent">
            <div>
                <div className="posts">
                    {post ? (
                        <Post {...post} />
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '20px'
                            }}>
                            <p className="fontSizeLarge">Nie udało się znaleźć posta.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
