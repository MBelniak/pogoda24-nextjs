import React from 'react';
import PostDTO from '@/model';
import { getFirestore } from 'firebase-admin/firestore';
import { Divider } from '@/app/(components)/Divider';
import Link from 'next/link';
import { Copyright } from '@/app/admin/(components)/Copyright';
import PostsListItem from '@/app/(components)/PostsListItem';
import { PostsPagingBar } from '@/app/(components)/PostsPagingBar';

const db = getFirestore();
const POSTS_PER_PAGE = 10;

const getData = async (currentPage: number): Promise<{ posts: PostDTO[]; totalCount: number }> => {
    const postsPromise = db
        .collection('posts')
        .orderBy('postDate', 'desc')
        .startAt(currentPage * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE)
        .get()
        .then(docs =>
            Promise.all(
                docs.docs.map(async doc => {
                    const data = (await doc.data()) as PostDTO;
                    return {
                        ...data,
                        id: doc.id
                    };
                })
            )
        );

    const totalCountPromise = (await db.collection('posts').count().get()).data().count;

    const [posts, totalCount] = await Promise.all([postsPromise, totalCountPromise]);

    return { posts, totalCount };
};

interface Params {
    params: {
        filter: string;
        page: string;
    };
}

export default async function PostsListPage({ params }: Params) {
    // const [postToEdit, setPostToEdit] = React.useState(undefined);
    const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? '0' : params.page ?? '0');
    const { posts, totalCount } = await getData(page);

    // const onFinishEditing = React.useCallback(() => {
    //     showModal(<LoadingIndicator />);
    //     setPostToEdit(undefined);
    //     fetchPostsFromApi().finally(closeModal);
    // }, [])

    // private handlePageClick(data) {
    //     const selected = data.selected;
    //     this.setState({ posts: undefined, currentPage: selected }, () => {
    //         showModal(<LoadingIndicator />);
    //         this.fetchPostsFromApi().finally(closeModal);
    //         const pageParams = queryString.parse(location.search);
    //         pageParams.page = `${this.state.currentPage + 1}`;
    //         window.history.replaceState(null, '', `?${queryString.stringify(pageParams)}`);
    //     });
    // }

    // async onFilter(filterValue: string) {
    //     this.setState({ filter: filterValue }, async () => {
    //         showModal(<LoadingIndicator/>);
    //         const pageParams = queryString.parse(location.search);
    //         pageParams.filter = this.state.filter || null;
    //         window.history.replaceState(null, '', `?${queryString.stringify(pageParams)}`);
    //         try {
    //             await this.fetchPosts();
    //         } finally {
    //             closeModal();
    //         }
    //     });
    // }

    // async fetchPosts() {
    //     try {
    //         const url = `api/posts/count${this.state.filter && this.state.filter.length > 0 ? '?filter=' + this.state.filter : ''}`;
    //         const response = await fetchApi(url, { signal: this.abortController.signal });
    //         const data = await response.json();
    //         this.setState({ totalPostsCount: data });
    //         await this.fetchPostsFromApi();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
            {/*{postToEdit ? (*/}
            {/*    this.state.postToEdit.postType === 'FACT' ? (*/}
            {/*        <FactWriter postToEdit={this.state.postToEdit} onFinishEditing={this.onFinishEditing} />*/}
            {/*    ) : (*/}
            {/*        <Writer postToEdit={this.state.postToEdit} onFinishEditing={this.onFinishEditing} />*/}
            {/*    )*/}
            {/*) : (*/}
            <div className="main">
                <section className="container is-fluid">
                    <div className="container">
                        <div className="postsListHeader">
                            <h2 className="title">Lista postów: </h2>
                            {/*<FilterBar onFilter={this.onFilter} />*/}
                        </div>
                        {posts ? (
                            posts.length === 0 ? (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '20px'
                                    }}>
                                    <p>Brak postów.</p>
                                </div>
                            ) : (
                                <div>
                                    {posts.map((post, i) => (
                                        // @ts-expect-error
                                        <PostsListItem key={i} post={post} />
                                        // <PostsListItem key={i} post={post} initiatePostEdit={initiatePostEdit} />
                                    ))}
                                </div>
                            )
                        ) : null}
                    </div>
                    {totalCount <= POSTS_PER_PAGE ? null : (
                        <PostsPagingBar
                            rootHref={'/admin/list'}
                            currentPage={page}
                            postsPerPage={POSTS_PER_PAGE}
                            totalCount={totalCount}
                        />
                    )}{' '}
                    <Divider />
                    <Link href="/admin" className="button">
                        Wróć
                    </Link>
                </section>
                <Copyright fontColor={'white'} />
            </div>
            {/*)}*/}
        </>
    );
}
