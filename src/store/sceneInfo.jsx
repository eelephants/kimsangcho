import { useReducer, createContext, useContext } from 'react';
import produce from 'immer';
import _ from 'lodash';
import { round, importAll } from '../lib/utils/helper';

export const SET_EACH_SECTION_HEIGHT = 'SET_EACH_SECTION_HEIGHT';
export const SET_USE_REF = 'SET_USE_REF';
export const SET_PAGE_YOFFSET = 'SET_PAGE_YOFFSET';
export const SET_TOTAL_SCROLL_HEIGHT = 'SET_TOTAL_SCROLL_HEIGHT';
export const SCROLL_LOOP = 'SCROLL_LOOP';
export const PLAY_ANIMATION = 'PLAY_ANIMATION';
export const SET_CANVAS_IMAGE = 'SET_CANVAS_IMAGE';

const initialInfo = {
  currentScene: 0,
  yOffset: window.pageYOffset,
  prevScrollHeight: 0,
  totalScrollHeight: 0,
  enterNewScene: false,
  delayedYOffset: 0,
  sceneInfo: [
    {
      type: 'video',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: '',
      },
      values: {},
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: '',
      },
      values: {},
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: '',
        messageA: '',
        messageB: '',
        messageC: '',
        messageD: '',
        canvas: '',
        context: '',
        videoImages: [],
      },
      values: {
        videoImagesCount: 81,
        imageSequence: [0, 80],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: '',
        messageA: '',
        messageB: '',
        messageC: '',
        messageD: '',
      },
      values: {
        messageA_transform_in: false,
        messageB_transform_in: false,
        messageC_transform_in: false,
        messageD_transform_in: false,
      },
    },
  ],
};

const SceneStateContext = createContext();
const SceneDispatchContext = createContext();

// 스크롤 값에 따라 opacity 계산하는 함수
const calcValues = (values, currentYoffset, draft) => {
  let rv = 0;
  const scrollHeight = draft.sceneInfo[draft.currentScene].scrollHeight;
  const scrollRatio = currentYoffset / scrollHeight;

  if (values.length === 3) {
    // 현재 Scene 안에 해당 구간이 있을 때
    // start ~ end 사이 애니메이션 실행
    const partScrollStart = values[2].start * scrollHeight;
    const partScrollEnd = values[2].end * scrollHeight;
    const parScrollHeight = partScrollEnd - partScrollStart;

    if (currentYoffset >= partScrollStart && currentYoffset <= partScrollEnd) {
      // 현재 Scene 안에 해당 구간이 있고, 구간 안에 들어와 있을 때
      rv =
        ((currentYoffset - partScrollStart) / parScrollHeight) *
          (values[1] - values[0]) +
        values[0];
    } else if (currentYoffset < partScrollStart) {
      // 현재 Scene 안에 해당 구간이 있고, 구간 에 들어오기 전
      rv = values[0];
    } else if (currentYoffset > partScrollEnd) {
      // 현재 Scene 안에 해당 구간이 있고, 구간에 들어온 후
      rv = values[1];
    }
  } else {
    // 현재 Scene 안에 해당 구간이 없을 때
    rv = scrollRatio * (values[1] - values[0]) + values[0];
  }
  return rv;
};

const applyStyle = (id, state, objs, values, currentYoffset, draft) => {
  objs[id].style.opacity = calcValues(
    values[`${id}_opacity_${state}`],
    currentYoffset,
    draft
  );
  objs[id].style.transform = `translate3d(0, ${calcValues(
    values[`${id}_translateY_${state}`],
    currentYoffset,
    draft
  )}%, 0)`;
};

const applyTransform = (id, state, objs, values, currentYoffset, draft) => {
  draft.sceneInfo[draft.currentScene].values.messageA_transform_in = false;
  draft.sceneInfo[draft.currentScene].values.messageB_transform_in = false;
  draft.sceneInfo[draft.currentScene].values.messageC_transform_in = false;
  draft.sceneInfo[draft.currentScene].values.messageD_transform_in = false;

  draft.sceneInfo[draft.currentScene].values[`${id}_transform_${state}`] = true;
};

const convert = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
};

const sceneReducer = (state, action) => {
  switch (action.type) {
    case SET_USE_REF:
      return produce(state, (draft) => {
        _.forEach(action.data, (item, index) => {
          draft.sceneInfo[index].objs.container = item;
        });

        _.forEach(draft.sceneInfo, (item, index) => {
          if (index === 0 || index === 1) {
            return;
          }

          if (index === 2) {
            item.objs.canvas =
              item.objs.container.current.querySelector('#video-canvas-0');
            item.objs.context = item.objs.container.current
              .querySelector('#video-canvas-0')
              .getContext('2d');
          }

          _.forEach(
            item.objs.container.current.querySelectorAll('.sticky-elem'),
            (element, index) => {
              item.objs[`message${convert[String(index)]}`] = element;
            }
          );
        });
      });

    case SET_EACH_SECTION_HEIGHT:
      return produce(state, (draft) => {
        _.forEach(draft.sceneInfo, (item) => {
          if (item.type === 'sticky') {
            item.scrollHeight = item.heightNum * window.innerHeight;
          } else if (item.type === 'normal') {
            item.scrollHeight = window.innerHeight;
          } else if (item.type === 'video') {
            item.scrollHeight = window.innerHeight * 0.7;
          }
          item.objs.container.current.style.height = `${item.scrollHeight}px`;
        });
      });

    case SET_PAGE_YOFFSET:
      return produce(state, (draft) => {
        draft.yOffset = window.pageYOffset;
      });

    case SET_TOTAL_SCROLL_HEIGHT:
      return produce(state, (draft) => {
        let totalScrollHeight = 0;

        for (let i = 0; i < draft.sceneInfo.length; i++) {
          totalScrollHeight += draft.sceneInfo[i].scrollHeight;

          if (totalScrollHeight >= window.pageYOffset) {
            draft.currentScene = i;
            break;
          }
        }
        draft.totalScrollHeight = totalScrollHeight;

        document.body.setAttribute('id', `show-scene-${draft.currentScene}`);

        const heightRatio = window.innerHeight / 1080;
        draft.sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
      });

    case SCROLL_LOOP:
      return produce(state, (draft) => {
        draft.prevScrollHeight = 0;
        draft.enterNewScene = false;

        for (let i = 0; i < draft.currentScene; i++) {
          draft.prevScrollHeight += draft.sceneInfo[i].scrollHeight;
        }

        if (
          window.pageYOffset >
          draft.prevScrollHeight +
            draft.sceneInfo[draft.currentScene].scrollHeight
        ) {
          draft.enterNewScene = true;
          draft.currentScene++;
          document.body.setAttribute('id', `show-scene-${draft.currentScene}`);
        }

        if (window.pageYOffset < draft.prevScrollHeight) {
          draft.enterNewScene = true;
          // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
          if (draft.currentScene === 0) {
            draft.currentScene = 0;
            return;
          }
          draft.currentScene--;
          document.body.setAttribute('id', `show-scene-${draft.currentScene}`);
        }

        // console.log(state);
      });

    case PLAY_ANIMATION:
      return produce(state, (draft) => {
        if (draft.enterNewScene) {
          return;
        }

        const objs = draft.sceneInfo[draft.currentScene].objs;
        const values = draft.sceneInfo[draft.currentScene].values;
        const currentYoffset = round(
          window.pageYOffset - draft.prevScrollHeight
        );
        const scrollHeight = draft.sceneInfo[draft.currentScene].scrollHeight;
        const scrollRatio = currentYoffset / scrollHeight;

        switch (draft.currentScene) {
          case 0:
            console.log('0 play');
            break;

          case 1:
            console.log('1 play');
            break;

          case 2:
            objs.context.drawImage(
              objs.videoImages[
                round(calcValues(values.imageSequence, currentYoffset, draft))
              ],
              0,
              0
            );

            objs.canvas.style.opacity = calcValues(
              values.canvas_opacity,
              currentYoffset,
              draft
            );
            if (scrollRatio <= 0.22) {
              // in
              applyStyle('messageA', 'in', objs, values, currentYoffset, draft);
            } else {
              // out
              applyStyle(
                'messageA',
                'out',
                objs,
                values,
                currentYoffset,
                draft
              );
            }

            if (scrollRatio <= 0.42) {
              // in
              applyStyle('messageB', 'in', objs, values, currentYoffset, draft);
            } else {
              // out
              applyStyle(
                'messageB',
                'out',
                objs,
                values,
                currentYoffset,
                draft
              );
            }

            if (scrollRatio <= 0.62) {
              // in
              applyStyle('messageC', 'in', objs, values, currentYoffset, draft);
            } else {
              // out
              applyStyle(
                'messageC',
                'out',
                objs,
                values,
                currentYoffset,
                draft
              );
            }

            if (scrollRatio <= 0.82) {
              // in
              applyStyle('messageD', 'in', objs, values, currentYoffset, draft);
            } else {
              // out
              applyStyle(
                'messageD',
                'out',
                objs,
                values,
                currentYoffset,
                draft
              );
            }

            break;

          case 3:
            console.log(state, 'state');
            if (scrollRatio <= 0.3) {
              applyTransform(
                'messageA',
                'in',
                objs,
                values,
                currentYoffset,
                draft
              );
            } else if (scrollRatio >= 0.3 && scrollRatio <= 0.5) {
              applyTransform(
                'messageB',
                'in',
                objs,
                values,
                currentYoffset,
                draft
              );
            } else if (scrollRatio >= 0.5 && scrollRatio <= 0.7) {
              applyTransform(
                'messageC',
                'in',
                objs,
                values,
                currentYoffset,
                draft
              );
            } else if (scrollRatio >= 0.7 && scrollRatio <= 0.9) {
              applyTransform(
                'messageD',
                'in',
                objs,
                values,
                currentYoffset,
                draft
              );
            }
            break;

          default:
            break;
        }
      });

    case SET_CANVAS_IMAGE:
      return produce(state, (draft) => {
        draft.sceneInfo[2].objs.videoImages = [];
        let imageElement;

        const images = importAll(
          require.context('../assets/background', false, /\.(png|jpe?g|svg)$/)
        );

        for (let i = 0; i < draft.sceneInfo[2].values.videoImagesCount; i++) {
          imageElement = new Image();

          imageElement.src = images[`ezgif-frame-0${i + 1}.jpg`].default;
          draft.sceneInfo[2].objs.videoImages.push(imageElement);
        }
      });

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function SceneProvider({ children }) {
  const [state, dispatch] = useReducer(sceneReducer, initialInfo);

  return (
    <SceneStateContext.Provider value={state}>
      <SceneDispatchContext.Provider value={dispatch}>
        {children}
      </SceneDispatchContext.Provider>
    </SceneStateContext.Provider>
  );
}

export function useSceneState() {
  const context = useContext(SceneStateContext);

  if (!context) {
    throw new Error('Cannot find SceneProvider');
  }
  return context;
}

export function useSceneDispatch() {
  const context = useContext(SceneDispatchContext);
  if (!context) {
    throw new Error('Cannot find SceneProvider');
  }
  return context;
}
