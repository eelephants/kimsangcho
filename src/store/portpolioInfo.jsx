import { useReducer, createContext, useContext } from 'react';
import produce from 'immer';
import _ from 'lodash';
import { round, importAll } from '../lib/utils/helper';

import Portpolio1 from '../../src/assets/Portpolio1.jpg';
import Portpolio2 from '../../src/assets/Portpolio2.png';
import Portpolio3 from '../../src/assets/Portpolio3.png';
import Portpolio4 from '../../src/assets/Portpolio4.png';

export const SET_ORIGINAL_PORTPOLIO = 'SET_ORIGINAL_PORTPOLIO';
export const SET_ORIGINAL_HIDE_PORTPOLIO = 'SET_ORIGINAL_HIDE_PORTPOLIO';
export const SET_FLIP_PORTPOLIO = 'SET_FLIP_PORTPOLIO';
export const SET_FLIP_HIDE_PORTPOLIO = 'SET_FLIP_HIDE_PORTPOLIO';
export const ON_MOUSE_ENTER_TO_PORTPOLIO = 'ON_MOUSE_ENTER_TO_PORTPOLIO';
export const ON_MOUSE_LEAVE_FROM_PORTPOLIO = 'ON_MOUSE_LEAVE_FROM_PORTPOLIO';
export const ON_CLICK_GOBACK_ICON = 'ON_CLICK_GOBACK_ICON';
export const ON_CLICK_INIT_ICON = 'ON_CLICK_INIT_ICON';
export const SET_CONTENTS_STYLE = 'SET_CONTENTS_STYLE';

const initialInfo = {
  portPolioData: [
    {
      id: 'portpolioA',
      imageThumnail: Portpolio1,
      images: [
        { src: Portpolio1, name: 'portpolio1' },
        { src: Portpolio2, name: 'portpolio1' },
        { src: Portpolio3, name: 'portpolio1' },
        { src: Portpolio4, name: 'portpolio1' },
      ],
      className: 'sticky-elem main-message a',
      title: 'body-class',
      duration: 'January.2021',
      type: 'Website',
      detailUrl: '/bodyClass',
      url: 'https://www.bodyclass.net/adultwarning',
      desc: 'Body Class, an online lecture on real sex techniques for tonight, proposes a new lifestyle for more enjoyable and healthy sex culture.',
      role: 'Front-end',
      language: ['react', 'mysql', 'redux', 'scss'],
      etc: ['git', 'trello', 'slack', 'notion'],
      isShow: false,
      isSideShow: false,
    },
    {
      id: 'portpolioB',
      imageThumnail: Portpolio2,
      images: [
        { src: Portpolio2, name: 'portpolio2' },
        { src: Portpolio1, name: 'portpolio2' },
        { src: Portpolio3, name: 'portpolio2' },
        { src: Portpolio4, name: 'portpolio2' },
      ],
      className: 'sticky-elem main-message b',
      title: 'MERRAC',
      duration: 'September.2020',
      type: 'Website',
      detailUrl: '/merrac',
      url: 'http://merrac.nowpap.org/merrac/',
      desc: 'Northwest Pacific Action Plan Marine Environmental Emergency Preparedness and ResponseRegional Activity Centre',
      role: 'Front-end',
      language: ['js', 'html5', 'css3', 'jQuery', 'mysql'],
      etc: ['git', 'trello', 'slack', 'notion'],
      isShow: false,
      isSideShow: false,
    },
    {
      id: 'portpolioC',
      imageThumnail: Portpolio3,
      images: [
        { src: Portpolio3, name: 'portpolio3' },
        { src: Portpolio1, name: 'portpolio3' },
        { src: Portpolio2, name: 'portpolio3' },
        { src: Portpolio3, name: 'portpolio3' },
      ],
      className: 'sticky-elem main-message c',
      title: 'Air Force',
      duration: 'September.2020',
      type: 'Website',
      detailUrl: '/airForce',
      url: '',
      desc: 'Air Force Meteorological Groups ultra-short-term forecasting and warning system construction project',
      role: 'Front-end',
      language: ['js', 'html5', 'css3', 'jQuery', 'mysql', 'java'],
      etc: ['git', 'trello', 'slack', 'notion'],
      isShow: false,
      isSideShow: false,
    },
    {
      id: 'portpolioD',
      imageThumnail: Portpolio4,
      images: [
        { src: Portpolio4, name: 'portpolio4' },
        { src: Portpolio1, name: 'portpolio4' },
        { src: Portpolio2, name: 'portpolio4' },
        { src: Portpolio3, name: 'portpolio4' },
      ],
      className: 'sticky-elem main-message d',
      title: 'HDC',
      duration: 'February.2020 ',
      type: 'Mobile',
      detailUrl: '/hdc',
      url: 'https://apps.apple.com/us/app/ipark-%EB%AA%A8%EB%B0%94%EC%9D%BC/id1516767886',
      desc: 'This is the official IPARK app. You can search a variety of related information such as sales, contracts, move-in, and AS.',
      role: 'Front-end',
      language: ['rn', 'redux', 'redux-saga', 'mysql', 'java'],
      etc: ['git', 'trello', 'slack', 'notion'],
      isShow: false,
      isSideShow: false,
    },
  ],
  subPortPolioData: [
    {
      id: 'portpolioA',
      imageThumnail: Portpolio1,
      images: [
        { src: Portpolio1, name: 'portpolio1' },
        { src: Portpolio2, name: 'portpolio1' },
        { src: Portpolio3, name: 'portpolio1' },
        { src: Portpolio4, name: 'portpolio1' },
      ],
      className: 'sticky-elem main-message a',
      animate: 'messageA_transform_in',
      title: 'Remind-feedback',
      duration: 'November.2019 ',
      type: 'Website',
      url: 'https://github.com/avon-dev',
      desc: 'Feedback management service to share feedback with each other',
      role: 'Front-end',
      language: ['react', 'next.js', 'redux', 'redux-saga'],
      etc: ['git', 'trello', 'slack'],
      isShow: false,
      isSideShow: false,
    },
    {
      id: 'portpolioB',
      imageThumnail: Portpolio2,
      images: [
        { src: Portpolio2, name: 'portpolio2' },
        { src: Portpolio1, name: 'portpolio2' },
        { src: Portpolio3, name: 'portpolio2' },
        { src: Portpolio4, name: 'portpolio2' },
      ],
      className: 'sticky-elem main-message b',
      animate: 'messageB_transform_in',
      title: 'You & ME',
      duration: 'August.2019 ',
      type: 'Website',
      url: 'https://github.com/SangchoKim/younme',
      desc: 'A website that captures the memories of couples – Between Benchmarking',
      role: 'Front-end, Back-end',
      language: ['react', 'node', 'redux', 'redux-saga'],
      etc: ['git', 'trello', 'slack'],
      isShow: false,
      isSideShow: false,
    },
    {
      id: 'portpolioC',
      imageThumnail: Portpolio3,
      images: [
        { src: Portpolio3, name: 'portpolio3' },
        { src: Portpolio1, name: 'portpolio3' },
        { src: Portpolio2, name: 'portpolio3' },
        { src: Portpolio3, name: 'portpolio3' },
      ],
      className: 'sticky-elem main-message c',
      animate: 'messageC_transform_in',
      title: 'Lionel Messi fan-page',
      duration: 'Jun.2019 ',
      type: 'Website',
      url: 'https://github.com/SangchoKim/lionelmessi',
      desc: 'Fan page including Lionel Messi career, news (insta-style) and shop (uniform, stockings, boots)',
      role: 'Front-end, Back-end',
      language: ['js', 'html5', 'css3', 'jQuery', 'mysql', 'php'],
      etc: ['git', 'trello', 'slack'],
      isShow: false,
      isSideShow: false,
    },
    {
      id: 'portpolioD',
      imageThumnail: Portpolio4,
      images: [
        { src: Portpolio4, name: 'portpolio4' },
        { src: Portpolio1, name: 'portpolio4' },
        { src: Portpolio2, name: 'portpolio4' },
        { src: Portpolio3, name: 'portpolio4' },
      ],
      className: 'sticky-elem main-message d',
      animate: 'messageD_transform_in',
      title: 'Together',
      duration: 'March.2019 ',
      type: 'Mobile',
      url: 'https://github.com/SangchoKim/together',
      desc: 'A calendar application that can share important events with loved ones and prevent accidents (?) by writing down appointments that might otherwise be forgotten in each others calendars.',
      role: 'Front-end',
      language: ['android', 'java', 'firebase'],
      etc: ['git', 'trello', 'slack'],
      isShow: false,
      isSideShow: false,
    },
  ],
};

const PortpolioStateContext = createContext();
const PortpolioDispatchContext = createContext();

const portpoioReducer = (state, action) => {
  switch (action.type) {
    case SET_ORIGINAL_PORTPOLIO:
      return produce(state, (draft) => {
        const original = document.querySelectorAll('.original');
        const description = document.querySelectorAll('.description');
        Array.from(original).forEach((item, index) => {
          const ctx = item.getContext('2d');
          var cw = item.width;
          var ch = item.height;

          if (cw < 500) {
            description[index].style.right = `${0}px`;
            description[index].style.top = `${0}px`;
            description[index].style.maxWidth = 'none';
            description[index].style.maxHeight = 'none';
            description[index].style.width = '100%';
          } else {
            description[index].style.right = `${cw * 0.4}px`;
            // description[index].style.top = `${65}px`;
            description[index].style.maxWidth = `${cw * 0.55}px`;
            description[index].style.maxHeight = `${ch * 0.75}px`;
          }

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(cw, 0);
          ctx.lineTo(cw, cw);
          ctx.lineTo(0, cw);
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'rgba(51, 51, 51, 1) 47%';
          ctx.stroke();
          ctx.clip();

          const imgElem = new Image();
          imgElem.src = draft.portPolioData.map((item) => item.imageThumnail)[
            index
          ];
          imgElem.addEventListener('load', () => {
            ctx.moveTo(0, 0);
            ctx.drawImage(imgElem, 0, 0, cw, ch);
          });

          ctx.closePath();
        });
      });

    case SET_ORIGINAL_HIDE_PORTPOLIO:
      return produce(state, (draft) => {
        const originalHide = document.querySelectorAll('.original-hide');
        Array.from(originalHide).forEach((item, index) => {
          const ctx = item.getContext('2d');
          var cw = item.width;
          var ch = item.height;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(cw, 0);
          ctx.lineTo(cw, cw);
          ctx.lineTo(0, cw);
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'rgba(51, 51, 51, 1) 47%';
          ctx.stroke();
          ctx.clip();

          const imgElem = new Image();
          imgElem.src = draft.portPolioData.map((item) => item.imageThumnail)[
            index
          ];
          imgElem.addEventListener('load', () => {
            ctx.moveTo(0, 0);
            ctx.drawImage(imgElem, 0, 0, cw, ch);
          });

          ctx.closePath();
        });
      });

    case SET_FLIP_PORTPOLIO:
      return produce(state, (draft) => {
        const flip = document.querySelectorAll('.flip');
        const original = document.querySelector('.original');
        Array.from(flip).forEach((item, index) => {
          const ctx = item.getContext('2d');
          var cw = item.width;
          var ch = item.height;

          item.style.top = `${original.height * 0.8}px`;

          // ctx.beginPath();
          // ctx.moveTo(0, 0);
          // ctx.lineTo(cw, 0);
          // ctx.lineTo(cw, ch - 85);
          // ctx.lineTo(0, ch);

          // ctx.clip();

          const imgElem = new Image();
          imgElem.src = draft.portPolioData.map((item) => item.imageThumnail)[
            index
          ];
          imgElem.addEventListener('load', () => {
            ctx.setTransform(1, 0, 0, -1, 0, ch);
            ctx.globalAlpha = 0.2;
            ctx.drawImage(
              imgElem,
              0,
              ch * 0.4,
              imgElem.width,
              imgElem.height,
              0,
              0,
              cw,
              ch
            );
          });

          ctx.closePath();
        });
      });
    case SET_FLIP_HIDE_PORTPOLIO:
      return produce(state, (draft) => {
        const flipHide = document.querySelectorAll('.flip-hide');
        const original = document.querySelector('.original');
        Array.from(flipHide).forEach((item, index) => {
          const ctx = item.getContext('2d');
          var cw = item.width;
          var ch = item.height;

          item.style.top = `${original.height * 0.8}px`;

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(cw, 0);
          ctx.lineTo(cw, ch);
          ctx.lineTo(0, ch);

          ctx.clip();

          const imgElem = new Image();
          imgElem.src = draft.portPolioData.map((item) => item.image)[index];
          imgElem.addEventListener('load', () => {
            ctx.setTransform(1, 0, 0, -1, 0, ch);
            ctx.globalAlpha = 0.2;
            ctx.drawImage(
              imgElem,
              0,
              ch * 0.4,
              imgElem.width,
              imgElem.height,
              0,
              0,
              cw,
              ch
            );
          });

          ctx.closePath();
        });
      });

    case ON_MOUSE_ENTER_TO_PORTPOLIO:
      return produce(state, (draft) => {
        const index = draft.portPolioData.findIndex(
          (item) => item.id === action.data
        );
        draft.portPolioData[index].isShow = true;
      });

    case ON_MOUSE_LEAVE_FROM_PORTPOLIO:
      return produce(state, (draft) => {
        const index = draft.portPolioData.findIndex(
          (item) => item.id === action.data
        );
        draft.portPolioData[index].isShow = false;
      });

    case ON_CLICK_GOBACK_ICON:
      return produce(state, (draft) => {
        const index = draft.portPolioData.findIndex(
          (item) => item.id === action.data
        );
        draft.portPolioData[index].isShow = false;
        draft.portPolioData[index].isSideShow = true;
      });

    case ON_CLICK_INIT_ICON:
      return produce(state, (draft) => {
        const index = draft.portPolioData.findIndex(
          (item) => item.id === action.data
        );
        draft.portPolioData[index].isShow = true;
        draft.portPolioData[index].isSideShow = false;
      });

    case SET_CONTENTS_STYLE:
      return produce(state, (draft) => {
        const {
          id,
          itemOriginalStyle,
          itemFlipStyle,
          itemFrontStyle,
          itemFlipHideStyle,
          itemWrapperStyle,
        } = action.data;

        const itemWrapper = document.querySelector(`#${id}`);
        const itemOriginal = document.querySelector(`#${id} .original`);
        const itemFlip = document.querySelector(`#${id} .flip`);
        const itemFronts = document.querySelectorAll(`#${id} .original-hide`);
        const itemFlipHides = document.querySelectorAll(`#${id} .flip-hide`);

        itemOriginal.style.display = itemOriginalStyle;
        // itemFlip.style.display = itemFlipStyle;
        // itemFlip.style.padding = itemWrapperStyle;
        itemWrapper.style.padding = itemWrapperStyle;

        Array.from(itemFronts).forEach(
          (item) => (item.style.display = itemFrontStyle)
        );
        Array.from(itemFlipHides).forEach(
          (item) => (item.style.display = itemFlipHideStyle)
        );
      });

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function PortpolioProvider({ children }) {
  const [state, dispatch] = useReducer(portpoioReducer, initialInfo);

  return (
    <PortpolioStateContext.Provider value={state}>
      <PortpolioDispatchContext.Provider value={dispatch}>
        {children}
      </PortpolioDispatchContext.Provider>
    </PortpolioStateContext.Provider>
  );
}

export function usePortpolioState() {
  const context = useContext(PortpolioStateContext);

  if (!context) {
    throw new Error('Cannot find PortpolioProvider');
  }
  return context;
}

export function usePortpolioDispatch() {
  const context = useContext(PortpolioDispatchContext);
  if (!context) {
    throw new Error('Cannot find PortpolioProvider');
  }
  return context;
}
