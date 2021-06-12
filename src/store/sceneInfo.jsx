import { useReducer, createContext, useContext } from 'react';
import produce from 'immer';
import _ from 'lodash';

export const SET_EACH_SECTION_HEIGHT = 'SET_EACH_SECTION_HEIGHT';
export const SET_USE_REF = 'SET_USE_REF';
export const SET_PAGE_OFFSET = 'SET_PAGE_OFFSET';
export const SET_PAGE_YOFFSET = 'SET_PAGE_YOFFSET';
export const SET_TOTAL_SCROLL_HEIGHT = 'SET_TOTAL_SCROLL_HEIGHT';

const initialInfo = {
  currentScene: 0,
  yOffset: window.pageYOffset,
  prevScrollHeight: 0,
  totalScrollHeight: 0,
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
        draft.yOffset = action.data;
      });

    case SET_TOTAL_SCROLL_HEIGHT:
      return produce(state, (draft) => {
        let totalScrollHeight = 0;

        for (let i = 0; i < draft.sceneInfo.length; i++) {
          totalScrollHeight += draft.sceneInfo[i].scrollHeight;

          if (totalScrollHeight >= draft.yOffset) {
            draft.currentScene = i;
            break;
          }
        }
        draft.totalScrollHeight = totalScrollHeight;
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
