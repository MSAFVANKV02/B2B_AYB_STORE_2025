// BuilderReducer.ts
export type UIState = {
    sidebarOpen: boolean;
    settingsOpen: boolean;
    headerOpen: boolean;
  };
  
  export type UIAction =
  | { type: "TOGGLE_SETTINGS" }
  | { type: "OPEN_SETTINGS" }
  | { type: "CLOSE_SETTINGS" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "OPEN_SIDEBAR" }
  | { type: "CLOSE_SIDEBAR" }
  | { type: "TOGGLE_HEADER" }
  | { type: "CLOSE_ALL" };
  
  export const initialUIState: UIState = {
    sidebarOpen: true,
    settingsOpen: true,
    headerOpen: true,
  };
  
  export function builderReducer(state: UIState, action: UIAction): UIState {
    switch (action.type) {
      case "TOGGLE_SIDEBAR":
        return { ...state, sidebarOpen: !state.sidebarOpen };
      case "TOGGLE_SETTINGS":
        return { ...state, settingsOpen: !state.settingsOpen };
        case "OPEN_SETTINGS":
            return { ...state, settingsOpen: true };
      case "TOGGLE_HEADER":
        return { ...state, headerOpen: !state.headerOpen };
      case "CLOSE_ALL":
        return { sidebarOpen: false, settingsOpen: false, headerOpen: false };
      default:
        return state;
    }
  }
  