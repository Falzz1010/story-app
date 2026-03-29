import { html, LitElement } from 'lit';
import { msg, str } from '@lit/localize';
import { setLocale, getLocale } from '../localization.js';

class NavBar extends LitElement {
  createRenderRoot() {
    return this; 
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-light sticky-top app-navbar-custom">
        <div class="container">
          <a class="navbar-brand fs-3" href="/">StoryApp</a>
          
          <button
            class="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header border-bottom">
              <h5 class="offcanvas-title fw-bold" id="offcanvasNavbarLabel">${msg('Menu')}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link px-3" href="/">${msg('Dashboard')}</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-3" href="/add-story.html">${msg('Tambah Story')}</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-3" href="/profile.html">${msg('Profil Developer')}</a>
                </li>
                <li class="nav-item dropdown px-3">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${msg('Bahasa')} (${getLocale()})
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#" @click=${() => this._localeChanged('id')}>Indonesia (ID)</a></li>
                    <li><a class="dropdown-item" href="#" @click=${() => this._localeChanged('en')}>English (EN)</a></li>
                    <li><a class="dropdown-item" href="#" @click=${() => this._localeChanged('es')}>Español (ES)</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
  
  async _localeChanged(newLocale) {
    if (newLocale !== getLocale()) {
      try {
        await setLocale(newLocale);
      } catch (e) {
        console.error('Error changing locale', e);
      }
    }
  }
}

customElements.define('nav-bar', NavBar);
