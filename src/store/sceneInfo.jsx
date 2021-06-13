import { useReducer, createContext, useContext } from 'react';
import produce from 'immer';
import _ from 'lodash';

export const SET_EACH_SECTION_HEIGHT = 'SET_EACH_SECTION_HEIGHT';
export const SET_USE_REF = 'SET_USE_REF';
export const SET_PAGE_YOFFSET = 'SET_PAGE_YOFFSET';
export const SET_TOTAL_SCROLL_HEIGHT = 'SET_TOTAL_SCROLL_HEIGHT';
export const SCROLL_LOOP = 'SCROLL_LOOP';
export const PLAY_ANIMATION = 'PLAY_ANIMATION';

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
      },
      values: {},
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: '',
      },
      values: {},
    },
  ],
};

const SceneStateContext = createContext();
const SceneDispatchContext = createContext();

const sceneReducer = (state, action) => {
  switch (action.type) {
    case SET_USE_REF:
      return produce(state, (draft) => {
        _.forEach(action.data, (item, index) => {
          draft.sceneInfo[index].objs.container = item;
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
      });

    case SCROLL_LOOP:
      return produce(state, (draft) => {
        draft.prevScrollHeight = 0;
        for (let i = 0; i < draft.currentScene; i++) {
          draft.prevScrollHeight += draft.sceneInfo[i].scrollHeight;
        }

        if (
          window.pageYOffset >
          draft.prevScrollHeight +
            draft.sceneInfo[draft.currentScene].scrollHeight
        ) {
          draft.currentScene++;
          document.body.setAttribute('id', `show-scene-${draft.currentScene}`);
        }

        if (window.pageYOffset < draft.prevScrollHeight) {
          if (draft.currentScene === 0) {
            draft.currentScene = 0;
            return;
          }
          draft.currentScene--;
          document.body.setAttribute('id', `show-scene-${draft.currentScene}`);
        }

        console.log(state.currentScene);

        // if (
        //   draft.delayedYOffset <
        //   draft.prevScrollHeight +
        //     draft.sceneInfo[draft.currentScene].scrollHeight
        // ) {
        //   document.body.classList.remove('scroll-effect-end');
        // }

        // if (
        //   draft.delayedYOffset >
        //   draft.prevScrollHeight +
        //     draft.sceneInfo[draft.currentScene].scrollHeight
        // ) {
        //   draft.enterNewScene = true;
        //   if (draft.currentScene === draft.sceneInfo.length - 1) {
        //     document.body.classList.add('scroll-effect-end');
        //   }
        //   if (draft.currentScene < draft.sceneInfo.length - 1) {
        //     draft.currentScene++;
        //   }
        //   document.body.setAttribute('id', `show-scene-${draft.currentScene}`);
        // }

        // if (draft.delayedYOffset < draft.prevScrollHeight) {
        //   draft.enterNewScene = true;
        //   // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
        //   if (draft.currentScene === 0) return;
        //   draft.currentScene--;
        //   document.body.setAttribute('id', `show-scene-${draft.currentScene}`);
        // }
      });

    case PLAY_ANIMATION:
      return produce(state, (draft) => {});

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
