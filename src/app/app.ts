import "./components/Navbar";
import "./components/Search";
import "./components/ChromeWindowMain";
import "./components/CurrentTabContainer";
import "./components/SaveTabContainer";

class App {
  constructor() {

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
          
          <chrome-window-main>

            <current-tab-container></current-tab-container>
            
            <save-tab-container></save-tab-container>
            
          </chrome-window-main>

          <search-component></search-component>
        </main>
      `;
  }
}

export default App;
