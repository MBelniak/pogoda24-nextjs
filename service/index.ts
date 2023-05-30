import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const db = getFirestore();
export const registerView = (ids: string[]) => {
    ids.forEach(id => {
        db.collection('posts')
            .doc(id)
            .update({
                views: FieldValue.increment(1)
            });
    });
};
