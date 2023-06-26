'use client';
import React from 'react';
import PagingBar from '@/shared-components/PagingBar';
import { useRouter } from 'next/navigation';
import styles from '@/app/theme.module.scss';

export interface PostsPagingBarProps {
    rootHref: string;
    totalCount: number;
    currentPage: number;
    postsPerPage: number;
}

export const PostsPagingBar: React.FC<PostsPagingBarProps> = ({ rootHref, totalCount, currentPage, postsPerPage }) => {
    const router = useRouter();

    const handlePageClick = (selectedItem: { selected: number }) => {
        const selected = selectedItem.selected;
        router.replace(`${rootHref}/${selected}`);
    };

    return (
        <PagingBar
            pages={Math.ceil(totalCount / postsPerPage)}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            mainColor={styles.secondaryColor}
            shadowColor={styles.primaryColor}
        />
    );
};
