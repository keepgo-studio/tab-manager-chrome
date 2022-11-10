import { createMachine } from 'xstate';
import {
  checkUrlValid,
  extractTextContentFromHtml,
  fetchTextContent,
} from '../utils/utils';
import { TabContentMap } from '../views/search/search.shared';

export const searchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwEMBOBjAFgOgBkB7NCASwDsoBiCIisPSgNyIGtGAzMAF1wAI0WHkQwBtAAwBdRKAAORWGR5l6skAA9EANgBMARgA0IAJ6J9E7XgAsATnu3dAZgDsliQFZrLgL4-jqJi4hCTkVNRgGBiieHIANmg8nKIAtnjcfDiCwqKSMkggCkoqagVaCB4WeAAc2k5Ottra1k4SunXaxmYI+rV4Lq36tvraQy7VltZ+AejY+IFz-ClEEIzIPJg81FhxZFhs-Hv0eepFyqoU6uWtVgbVLh5diNYtNfVOvRIu1l7Wuh7TEALYLArLLVZ4ABK6AgJm2u32hywx2kp0U51KoHK2gkEjwdweTwq1Wqb3qn2+v10gNB1AArnIIIkwCcCmcSpcys9dESLFYAYCKCs4OpQSFSJQoGjihcruYPFZqrpqvp-rznDTZiCtWDhXh1ptpRjOVidPV8Y17o9TIhKh4bA5qt5rKqLLZNUF5jqlnroaRuvJ0Ry5QhWi58doFWqbRVnHgHLYnd9XRJ3f4gTr9d7wYw5BgwMwjcGuQhmvp8b1CTGnCr447nSnbFN02LQT7VkXZSX-qSCdburpbE48LjR20fnomh65p3MZpEABaTox-ThuwOF58pyR6zaPx+IA */
  createMachine(
    {
  context: {
    contentMap: {},
    allWindows: {},
  },
  tsTypes: {} as import('./search.machine.typegen').Typegen0,
  schema: {
    services: {} as {
      'fetch and return': {
        data: void;
      };
    },
    events: {} as
      | { type: 'init'; allWindows: IChromeWindowMapping }
      | { type: 'update'; allWindows: IChromeWindowMapping }
      | { type: 'click icon' },
    context: {} as {
      contentMap: TabContentMap;
      allWindows: IChromeWindowMapping;
    },
  },
  predictableActionArguments: true,
  on: {
    update: {
      target: '.Loading',
    },
  },
  initial: 'Search mode',
  states: {
    Loading: {
      invoke: {
        src: 'fetch and return',
        id: 'fetch actor',
        onDone: [
          {
            target: '#Search.Search mode.prev',
          },
        ],
        onError: [
          {
            target: '#Search.Search mode.prev',
          },
        ],
      },
    },
    'Search mode': {
      initial: 'Ready',
      states: {
        Start: {
          on: {
            'click icon': {
              target: 'Ready',
            },
          },
        },
        Ready: {
          on: {
            'click icon': {
              target: 'Start',
            },
          },
        },
        prev: {
          history: 'shallow',
          type: 'history',
        },
      },
    },
  },
  id: 'Search',
},
    {
      services: {
        'fetch and return': async (context, event) => {
          const { contentMap } = context;

          const allTabs = Object.values(event.allWindows)
            .map((win) => win.tabs)
            .flat();

          const newContentMap: TabContentMap = {};

          const promises = allTabs.map(async (tab) => {
            // won't fetch data if url of tab is duplicated
            if (
              tab.id in contentMap &&
              tab.url === contentMap[tab.id].url
            ) {
              newContentMap[tab.id] = contentMap[tab.id];
              return;
            }

            let textContent = '';

            if (checkUrlValid(tab.url)) {
              try {
                textContent = (await fetchTextContent(tab)) || '';
                textContent = extractTextContentFromHtml(textContent);
              } catch (err) {
                console.error(err);
              }
            }

            newContentMap[tab.id] = {
              tabId: tab.id,
              textContent,
              title: tab.title,
              url: tab.url,
              windowId: tab.windowId,
            };
          });

          await Promise.all(promises);

          context.contentMap = newContentMap;
          context.allWindows = event.allWindows;
        },
      },
    }
  );
