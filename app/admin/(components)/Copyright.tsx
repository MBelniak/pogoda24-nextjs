'use client';
import React from 'react';
import styled from 'styled-components';

interface CopyrightProps {
    children?: React.ReactNode;
}

interface CopyrightStyles {
    fontColor: string;
}

const DefaultCopyright: React.FC<{ className?: string } & CopyrightProps & CopyrightStyles> = ({
    className,
    children
}) => {
    return (
        <footer className={`${className} footer`}>
            <div className="content has-text-centered">
                <p className="fontSizeSmall copyright">Copyright &copy; 2020 by Pogoda24/7</p>
                {children}
            </div>
        </footer>
    );
};

export const Copyright = styled(DefaultCopyright)<CopyrightStyles>`
    color: ${props => props.fontColor};
`;
