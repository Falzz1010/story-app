import { html, LitElement, nothing } from 'lit';
import { msg, str } from '@lit/localize';

class StoryCard extends LitElement {
  static properties = {
    storyId: { type: String },
    name: { type: String },
    description: { type: String },
    photoUrl: { type: String },
    createdAt: { type: String }
  };

  createRenderRoot() {
    return this;
  }

  _formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  render() {
    return html`
      <div class="card h-100 story-card-custom">
        ${this.photoUrl 
          ? html`<img src="${this.photoUrl}" class="card-img-top" alt="${msg(str`Story by ${this.name}`)}" loading="lazy">` 
          : nothing}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${msg(str`Cerita dari ${this.name}`)}</h5>
          <p class="card-text flex-grow-1 mt-2">${this.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <small><i class="bi bi-clock me-1"></i>${this._formatDate(this.createdAt)}</small>
          <button class="btn btn-sm btn-outline-primary rounded-pill px-3">${msg('Baca Selengkapnya')}</button>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
