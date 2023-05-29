'use client';
import React from 'react';
import PostDTO, { PostType } from '../../model/PostDTO';
import { ForecastMapList } from './ForecastMapList';
import { AdvancedImage } from '@cloudinary/react';
import 'suneditor/dist/css/suneditor.min.css';
import { Divider } from '@/components/Divider';
import config from '@/config/config';
import { cloudinary } from '@/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Link from 'next/link';

const { nonExpandedPostLength } = config;

interface ClientSidePost extends Omit<PostDTO, 'postDate' | 'dueDate'> {
    postDate: { _nanoseconds: number; _seconds: number };
    dueDate?: { _nanoseconds: number; _seconds: number };
}

interface PostsItemProps {
    post: ClientSidePost;
}

export const PostsListItem: React.FC<PostsItemProps> = props => {
    const postHref = 'posts/' + props.post.id;

    const isExpandedByDefault = React.useMemo(() => {
        let description;
        if (props.post.postType === 'FACT') {
            return false;
        } else {
            description = props.post.description;
        }
        return description.length <= nonExpandedPostLength && description.split(/[(\r\n)(\n)]/g).length <= 2;
    }, [props.post]);

    const [isExpanded, setExpanded] = React.useState(isExpandedByDefault);

    const processDate = () => {
        console.dir(props.post);
        const date = new Date(props.post.postDate._seconds).toLocaleString('pl-PL');
        return date.replace(', ', ' o ');
    };

    const expandPost = React.useCallback(() => {
        setExpanded(true);
        // props.registerView([props.post.id]);
    }, [props.post]);

    const processDescription = (description: string): string => {
        if (!isExpanded) {
            if (description.length > nonExpandedPostLength) {
                description = description.substr(0, nonExpandedPostLength);
            }
            if (description.split(/(\r\n)|(\n)/g).length > 2) {
                description = description
                    .split(/(\r\n)|(\n)/g)
                    .slice(0, 2)
                    .join('\n');
            }
            const regex = /^.*\s/g;
            const match = description.match(regex);
            if (match && match[0].length > 70) {
                description = match[0] + '... ';
            } else {
                //let's not clip very long words (does a word over 50 characters long even exist? Probably.)
                description = description + '... ';
            }
        }

        description = description.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');

        return description;
    };

    const createDescription = () => {
        const description = processDescription(props.post.description);
        return (
            <>
                <span
                    dangerouslySetInnerHTML={{
                        __html: description
                    }}
                    style={{ wordWrap: 'break-word' }}
                />
                {isExpanded ||
                    (props.post.postType === PostType.FACT ? (
                        <Link href={'/posts/' + props.post.id} className="postLink">
                            więcej
                        </Link>
                    ) : (
                        <a className="postLink" onClick={expandPost}>
                            więcej
                        </a>
                    ))}
            </>
        );
    };

    const cldImg = cloudinary
        .image(props.post.imagesPublicIds.length > 0 ? props.post.imagesPublicIds[0] : 'fb_main_logo_cukiun')
        .format('png')
        .quality('auto')
        .resize(fill().gravity('faces'));

    const DateSection = () => <div className="postDate fontSizeSmall">{processDate()}</div>;

    const TitleSection = () => (
        <div className="postTitle fontSizeLarge">
            {props.post.postType === PostType.FACT ? (
                <p className="basicLink">{props.post.title}</p>
            ) : (
                <Link href={postHref} className="basicLink">
                    {props.post.title}
                </Link>
            )}
        </div>
    );

    const DescriptionSection = () =>
        props.post.postType !== PostType.FACT ? (
            <div className="postDescription fontSizeSmall">{createDescription()}</div>
        ) : null;

    const ImagesSection = () =>
        props.post.postType === PostType.FACT ? (
            <>
                <Divider />
                <div className="factImage">{<AdvancedImage cldImg={cldImg} />}</div>
            </>
        ) : props.post.imagesPublicIds.length > 0 ? (
            <>
                <Divider />
                <ForecastMapList imagesPublicIds={props.post.imagesPublicIds} />
            </>
        ) : null;

    const MainContent = () => {
        return (
            <>
                <DateSection />
                <br />
                <TitleSection />
                <DescriptionSection />
                <ImagesSection />
            </>
        );
    };

    return (
        <div className="post">
            {props.post.postType === PostType.FACT ? (
                <a href={postHref}>
                    <MainContent />
                </a>
            ) : (
                <MainContent />
            )}
        </div>
    );
};

export default PostsListItem;
