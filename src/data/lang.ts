const ko = {
  Setting: {
    themeHeader: '테마',
    sizeHeader: '사이즈 설정',
    langHeader: '언어 설정',
    themeAlert: '현재 사용자가 사용하고 있는 테마로 변경되었습니다.',
  },

  Search: {
    placeholder: '탭 검색하기',
    errorMessage: '를 탭들에서 찾을 수 없습니다',
  },

  Message: {
    SUCCESS: '성공하였습니다',
    FAILED: '실패하였습니다',
    DELETE_SAVED_TAB: '저장된 탭을 삭제하는데에',
    DELETE_SAVED_WINDOW: '저장된 창을 삭제하는데에',
    OPEN_SAVED_WINDOW: '저장된 창을 여는데에',
    SAVE_WINDOW: '창을 저장하는데에',
  },
};

const en = {
  Setting: {
    themeHeader: 'theme',
    sizeHeader: 'sizes',
    langHeader: 'language',
    themeAlert: 'The theme has changed automatically based on if the user is in dark mode',
  },

  Search: {
    placeholder: 'Searching tabs',
    errorMessage: "isn't exist in current tabs",
  },

  Message: {
    SUCCESS: 'succeeded',
    FAILED: 'failed',
    DELETE_SAVED_TAB: 'Removing the saved tab has',
    DELETE_SAVED_WINDOW: 'Removing the saved window has',
    OPEN_SAVED_WINDOW: 'Opening the saved window has',
    SAVE_WINDOW: 'Saving the selected window has',
  },
};

const ja = {
  Setting: {
    themeHeader: 'テーマ',
    sizeHeader: 'サイズ設定',
    langHeader: '言語設定',
    themeAlert: '現在ユーザーが使用しているテーマに変更されました',
  },

  Search: {
    placeholder: '検索タブ',
    errorMessage: 'は現在のタブに存在しません',
  },

  Message: {
    SUCCESS: '成功しました',
    FAILED: '失敗しました',
    DELETE_SAVED_TAB: '保存されたウィンドウの削除に',
    DELETE_SAVED_WINDOW: '保存されたウィンドウを削除すると',
    OPEN_SAVED_WINDOW: '保存されたウィンドウを開くと',
    SAVE_WINDOW: '選択したウィンドウを保存すると',
  },
};

const zh = {
  Setting: {
    themeHeader: '主题',
    sizeHeader: '尺寸设置',
    langHeader: '语言设置',
    themeAlert: '更改为用户当前使用的主题',
  },

  Search: {
    placeholder: '搜索选项卡',
    errorMessage: '当前选项卡中不存在',
  },

  Message: {
    SUCCESS: '成功',
    FAILED: '失败',
    DELETE_SAVED_TAB: '删除已保存的选项卡',
    DELETE_SAVED_WINDOW: '删除已保存的窗口',
    OPEN_SAVED_WINDOW: '打开保存的窗口',
    SAVE_WINDOW: '保存所选窗口',
  },
};
const GlobalLangMap = {
  ko,
  en,
  ja,
  zh,
};
export default GlobalLangMap;
