import { html, LitElement, css } from 'lit';
import { msg } from '@lit/localize';

class FooterBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-top: auto;
    }
    footer {
      background-color: #ffffff;
      border-top: 4px solid #000;
      padding: 2rem 0;
      text-align: center;
      font-family: 'Space Grotesk', sans-serif;
      box-shadow: inset 0 4px 0px rgba(0,0,0,0.1);
    }
    p {
      color: #000;
      margin: 0;
      font-size: 1.1rem;
      font-weight: 900;
    }
    .heart {
      color: #000;
      margin: 0 0.2rem;
      text-shadow: none;
    }
    small {
      color: #000;
      background: #fff;
      display: inline-block;
      padding: 0.2rem 0.5rem;
      border: 3px solid #000;
      box-shadow: 3px 3px 0 #000;
      margin-top: 1rem;
      font-size: 0.9rem;
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <footer>
        <div>
          <p>
            &copy; ${new Date().getFullYear()} StoryApp. ${msg('Dibuat dengan')} <span class="heart">❤</span> ${msg('menggunakan Lit & Bootstrap.')}
          </p>
          <small>${msg('Submission untuk Dicoding Front-End Web Developer')}</small>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
