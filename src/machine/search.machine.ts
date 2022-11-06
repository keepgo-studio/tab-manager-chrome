import { createMachine } from "xstate";
import { crawlTextContent } from "../utils/searching";

export interface ContentMap {
  [tabId: number]: IContent;
}

export const searchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwEMBOBjAFgOgEsIAbMAYgFcAHCNAFzAG0AGAXUVCoHtYC6CuAOw4gAHogCMADgkAaEAE9JAVmZ4AnJq3atAFgC+++aky5CJclmIEsAawAENoS3ZIQ3XvyEjxCCQDZdeSUEACYAZikNHRj1AyMQE2x8JNx7AFsuCEtrO0csZzYRDz4BYTdfUIB2KND1fykq1WYW1v9gySl-aNjteON0ZLwAVRp6MAy0KjIIITBCQQA3Llt51PxR2gZJqgQCJa4sejKXF2KeUu8KyUCOhClwwwTBLLgRdfNSc88yn0RdUJ3UKhZR4XS9PqGAamFKDNKZbLfS7lUC+XTMKp4cJNVq4tpA8LhPD+EmksmkqGJOEbMbbdJTJFeFFif4YrE4vG49qKRDqTHkgUkynrRm-a4IAC03JCUqe+iAA */
  createMachine({
    context: {
      contentPerTab: {},
    },
    tsTypes: {} as import('./search.machine.typegen').Typegen0,
    schema: {
      context: {} as {
        contentPerTab: ContentMap;
      },
      services: {} as {
        'updating contents': {
          data: void;
        };
      },
      events: {} as
        | { type: 'update'; allWindows: IChromeWindowMapping }
        | { type: 'click icon' }
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          update: {
            target: 'Update map',
          },
          'click icon': {
            target: 'Search mode',
          },
        },
      },
      'Search mode': {
        on: {
          'click icon': {
            target: 'idle',
          },
        },
      },
      'Update map': {
        invoke: {
          src: 'updating contents',
          onDone: [
            {
              target: 'idle',
            },
          ],
        },
      },
    },
    id: 'Search',
  }, {
    services: {
      'updating contents': async (context, event) => {
        Object.values(event.allWindows).forEach(win => {
          win.tabs.forEach(async (tab: ChromeTab) => {
            if (tab.id! in context.contentPerTab) return;

            const textContent = await crawlTextContent(tab.url!);
            
            context.contentPerTab[tab.id!] = {
              title: tab.title!,
              url: tab.url!,
              textContent: textContent || ''
            } 
          })
        });
      }
    }
  });