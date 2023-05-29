export const registerView = (ids: string[]) => {
    const body = ids.map(postId => {
        return {
            postId: postId,
            views: 1
        };
    });
    // fetchApi('api/views/registerViews', {
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });
};
