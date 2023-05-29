import React from 'react';
import { WarningInfo } from '@/app/page';
import { Divider } from '@/components/Divider';

interface CurrentWarningsProps {
    warningInfo: WarningInfo[];
}

export const CurrentWarnings = (props: CurrentWarningsProps) => {
    return (
        <div className="bg-white rounded-[0.4rem] text-center p-2 current-warnings">
            {props.warningInfo.length > 0 ? (
                <>
                    <p
                        className="postTitle fontSizeMedium"
                        style={{
                            wordWrap: 'break-word'
                        }}>
                        Aktualne ostrzeżenia
                    </p>
                    {props.warningInfo.map((info, key, list) => {
                        const href = 'posts/' + info.postId;
                        return (
                            <div key={key} className="currentWarning fontSizeSmall">
                                <a className="postLink" href={href}>
                                    {info.title}
                                </a>
                                {list.length - 1 === key ? null : <Divider />}
                            </div>
                        );
                    })}
                </>
            ) : (
                <p className="currentWarningsNone fontSizeMedium">Brak ostrzeżeń</p>
            )}
        </div>
    );
};
