'use client';
import React from 'react';
import PagingBar from '@/shared-components/PagingBar';
import { useRouter } from 'next/navigation';
import styles from '@/app/theme.module.scss';

const POSTS_PER_PAGE = 6;

export const PostsPagingBar: React.FC<{ postTypeHref: string; totalCount: number; currentPage: number }> = ({
    postTypeHref,
    totalCount,
    currentPage
}) => {
    const router = useRouter();

    const handlePageClick = (selectedItem: { selected: number }) => {
        const selected = selectedItem.selected;
        router.push(`/${postTypeHref}/${selected}`);
    };

    return (
        <PagingBar
            pages={Math.ceil(totalCount / POSTS_PER_PAGE)}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            mainColor={styles.secondaryColor}
            shadowColor={styles.primaryColor}
        />
    );
};
