import { firestore } from 'firebase-admin';
import Timestamp = firestore.Timestamp;

export default interface Post {
    id: number;
    postDate: Timestamp;
    dueDate?: Timestamp;
    postType: PostType;
    title: string;
    description: string;
    imagesPublicIds: string[];
}

export enum PostType {
    FORECAST = 'FORECAST',
    WARNING = 'WARNING',
    FACT = 'FACT'
}
