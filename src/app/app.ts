import { ChromeWindow, CurrentWindows } from "./CurrentWindows";

class App {
    private app: HTMLElement;
    private currentUl: HTMLUListElement;
    private savedUl: HTMLUListElement;
    
    constructor() {
        chrome.storage.local.set({"saved": []});

        this.app = document.getElementById('app') as HTMLElement;

        this.currentUl = document.createElement('ul');
        this.savedUl = document.createElement('ul');
        
        this.app.appendChild(this.currentUl);
        this.app.appendChild(this.savedUl);
        
        this.load(this.currentUl);
    }
    
    async load(ul: HTMLUListElement) {
        const windows: ChromeWindow[] = await CurrentWindows.getAll();

        windows.forEach(w => {
            const li = document.createElement('li');
            li.id = `${new Date().getTime().toString()}`;
            
            li.innerHTML = `
                <h1>${w.id}</h1>
                <p>tab cnt : ${w.tabs.length}</p>
            `;

            li.addEventListener("click", (e) => {
                this.save(li.id, w);
            }, false);

            ul.appendChild(li);
        })
    }

    save(id : string, w: ChromeWindow) {
        chrome.storage.local.get("saved", (local) => {
            const savedWindow = local["saved"];
    
            savedWindow.push(w);
    
            chrome.storage.local.set({
                "saved": savedWindow
            })
            
            const li = document.createElement('li');
            
            li.id = `saved-${savedWindow.length}`
            li.innerHTML = `
                <h1>saved window</h1>
                <p>
                ${w.id}
                </p>
                <p>
                ${w.type}
                </p>
            `;
            
            li.addEventListener("click", () => {
                this.remove(li.id);
            })
            this.savedUl.appendChild(li);
        });
    }

    remove(id: string) {
        chrome.storage.local.get("saved", (local) => {
            const savedWindow: ChromeWindow[] = local["saved"];
            const idx = Number(id.split("-")[1]) - 1;

            savedWindow.splice(idx, 1);

            chrome.storage.local.set({
                "saved": savedWindow
            })

            this.savedUl.children[idx].remove();
        })
    }
}

export default App;