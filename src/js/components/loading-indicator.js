import { html, LitElement, css } from 'lit';
// removed unused lit/localize msg

class LoadingIndicator extends LitElement {
  static properties = {
    size: { type: String }, // 'sm' or 'lg'
    message: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 1rem;
      width: 100%;
    }
    .spinner {
      border: 0.4rem solid #000;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
    }
    .spinner.sm {
      width: 2rem;
      height: 2rem;
      border-width: 0.25rem;
    }
    .spinner.lg {
      width: 4rem;
      height: 4rem;
      border-width: 0.5rem;
    }
    .loading-text {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      color: #000;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  constructor() {
    super();
    this.size = 'lg';
    this.message = '';
  }

  render() {
    return html`
      <div class="spinner ${this.size}"></div>
      ${this.message ? html`<span class="loading-text">${this.message}</span>` : ''}
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
