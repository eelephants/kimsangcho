import React from 'react';
import { css } from '@emotion/react';
import 'normalize.css';

export default function AppLayout({ children }) {
       return <div>{children}</div>;
}

function Side({ children }) {
       return <aside css={sidebarStyle}>{children}</aside>;
}

function Main({ children }) {
       return <main css={mainStyle}>{children}</main>;
}

AppLayout.Side = Side;
AppLayout.Main = Main;

const sidebarStyle = css`
       width: 16.25rem;
       height: 100%;
       position: fixed;
       display: flex;
       padding-top: 3rem;
       padding-bottom: 3rem;
       padding-left: 3rem;
`;

const mainStyle = css`
       padding-left: 2rem;
       margin-left: 16.25rem;
       padding-top: 3rem;
       padding-bottom: 3rem;
`;
