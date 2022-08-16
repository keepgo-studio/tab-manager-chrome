enum WindowType {
    "normal",
    "popup",
    "panel",
    "app",
    "devtools"
}

interface Tab {
    favIconUrl: string,
    id: number,
    index: number,
    title: string,
    windowId: number
}

export interface ChromeWindow {
    id: number,
    tabs: Tab[],
    type: WindowType
}

export class CurrentWindows {
    static async getAll(): Promise<ChromeWindow[]> {
        const windows = await chrome.windows.getAll(
            {
                populate: true,
                windowTypes: ["normal"]
            }
        )

        const WindowList : ChromeWindow[] = [];
        
        windows.forEach((w)=>{
            if (typeof w.id === "number" && w.type === "normal") {
                const tabs:Tab[] = [];

                w.tabs?.forEach(t => {
                    tabs.push(t as Tab)
                })

                WindowList.push({
                    id: w.id,
                    tabs,
                    type: WindowType[w.type]
                })
            }
        });

        return WindowList;
    }
}