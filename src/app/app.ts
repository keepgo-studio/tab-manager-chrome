import "./components/Navbar";
import "./components/Footer";
import { Contoller } from "./core/Controller";
import { CurrentWindowView } from "./view/CurrentWindowView";
import { CurrentWindowModel } from "./model/CurrentWindowModel";
import { SaveWindowView } from "./view/SaveWindowView";
import { SaveWindowModel } from "./model/SaveWindowModel";

class App {
    private target: HTMLElement;
    private currentController: Contoller;
    private saveController: Contoller;

    constructor() {
        this.currentController = new Contoller(
            new CurrentWindowView,
            new CurrentWindowModel
        )

        this.saveController = new Contoller(
            new SaveWindowView,
            new SaveWindowModel
        )
        this.target = document.body;
        this.render();
    }

    async createWindow(window: ChromeWindow) {

    }
    
    async createTab() {}

    async removeWindow() {}

    async moveTab() {}

    async removeTab() {}

    async updateTab() {}

    async saveWindow() {}

    async removeSaveWindow() {}

    async searchTab() {}

    render() {
        this.target.innerHTML = `
            <app-navbar></app-navbar>

            <main>
                <current-window-view></current-window-view>
                <save-window-view></save-window-view>
            </main>

            <app-footer></app-footer>
        `;
    }
}

export default App;