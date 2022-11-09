import { createMachine } from 'xstate';
import {
  checkUrlValid,
  extractTextContentFromHtml,
  fetchTextContent,
} from '../utils/utils';

export const searchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwEMBOBjAFgOgAUMwAHTASwDsoBiAVxIjQBcwBtABgF1FQSB7WOWbl+lXiAAeiAIwB2DnjkA2AKzKAzKpkAWDspkBOAEwAaEAE9ExjQA48hx7duPDM1XI2HbAXx-nUTFw8QOwcAAIAW34IMBosABtyLABrcOSxTh4kEAEhETEJaQRlOWM8bXUFLWUOYx0NcysEGQ0dB1c9Q1LVDg5VPwD0MJDh3CiYuIYmViyJPOFRcRzivQ0HZWdVDQVbHXVjOSbZGRk8HVavVR05T09DHUGQUOCAGX40CCpaCDEwPCoADd+Cl-gAzMDMcZoLDMfgYOY5BYFZagYqlcqVUocGp1BrHFq2ZQdbzeOrGGRE2xyJ4vfDvT7fGhgDAYeF4EgJFhg+GRPAQqERGFwhHceaCRaFFayBRKNSabR6AwmAmU4muIkaGQcOQ6InGWljfAAJXQEAs9EYLHYYqREpRRUQcl6Dn0xm6Ou6FzMlmsdhJtlUvRU1I0GkNQRNZotiWSaQylERfHtS0dCE87Xl7tqm1s9R0BLzJO8XhkxlsujLfn8IEok3gOTphGIZAw33F+VT0oQOh9zSM6zDGmMfRM7j6vhrTbpE1iHclqKkiG09mzzmUym8lK1hcMeCH5c2ZbLtjqEZGDK+1HnDu7Wj3vcpChuckM2hUqtfeFsYYpbR0DTDns57BKanzNMmnZSmiiChko-5aDYeZyDIqp6MWHDUt6mEeCBOA3l2MEIAAtMoBKkXgfRUdRNE0tWQA */
  createMachine(
    {
  context: {
    contentMap: {},
  },
  tsTypes: {} as import('./search.machine.typegen').Typegen0,
  schema: {
    services: {} as {
      'fetch and return': { data: void };
    },
    events: {} as
      | { type: 'update'; allWindows: IChromeWindowMapping }
      | { type: 'complete' }
      | { type: 'error' }
      | { type: 'click icon' },
    context: {} as {
      contentMap: TabContentMap;
    },
  },
  predictableActionArguments: true,
  initial: 'Preparing',
  states: {
    Preparing: {
      on: {
        update: {
          target: 'Loading',
        },
      },
    },
    'Search mode': {
      on: {
        'click icon': {
          target: 'Ready',
        },
        update: {
          target: 'Loading',
        },
      },
    },
    Loading: {
      invoke: {
        src: 'fetch and return',
        id: 'fetch actor',
        onDone: [
          {
            target: 'Ready',
          },
        ],
        onError: [
          {
            target: 'Preparing',
          },
        ],
      },
    },
    Ready: {
      on: {
        update: {
          target: 'Loading',
        },
        'click icon': {
          target: 'Search mode',
        },
      },
    },
  },
  id: 'Search',
},
    {
      services: {
        'fetch and return': async (context, event) => {
          const { contentMap: contentMap } = context;

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
        },
      },
    }
  );
