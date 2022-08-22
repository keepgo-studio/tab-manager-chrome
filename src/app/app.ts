import "./components/Navbar";
import "./components/Search";
import "./components/ChromeWindowList";
import { Contoller } from "./core/Controller";
import { CurrentWindowView } from "./view/CurrentWindowView";
import { CurrentWindowModel } from "./model/CurrentWindowModel";
import { SaveWindowView } from "./view/SaveWindowView";
import { SaveWindowModel } from "./model/SaveWindowModel";

class App {
  private currentController: Contoller;
  private saveController: Contoller;

  constructor() {
    this.currentController = new Contoller(
      new CurrentWindowView(),
      new CurrentWindowModel()
    );

    this.saveController = new Contoller(
      new SaveWindowView(),
      new SaveWindowModel()
    );

    this.render();
  }

  async createWindow(window: ChromeWindow) {}

  async createTab() {}

  async removeWindow() {}

  async moveTab() {}

  async removeTab() {}

  async updateTab() {}

  async saveWindow() {}

  async removeSaveWindow() {}

  async searchTab() {}

  render() {
     document.body.innerHTML = `
        <app-navbar></app-navbar>
        
        <main>
          <chrome-window-list>
            <current-window-view></current-window-view>
            
            <save-window-view></save-window-view>
            
            <search-component></search-component>
          </chrome-window-list>
        </main>
      `;
  }
}

export default App;
