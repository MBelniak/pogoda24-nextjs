import { firestore } from 'firebase-admin';
import Timestamp = firestore.Timestamp;

export default interface PostDTO {
    id: string;
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

export const HrefToPostType: Record<string, PostType> = {
    forecasts: PostType.FORECAST,
    warnings: PostType.WARNING,
    facts: PostType.FACT
};
