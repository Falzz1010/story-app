import { html, LitElement, css } from 'lit';
import { msg } from '@lit/localize';

class DevProfile extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .profile-card {
      background: #ffffff;
      border: 4px solid #000;
      box-shadow: 8px 8px 0px #000;
      border-radius: 0;
      text-align: center;
      padding: 3rem 2rem;
      font-family: 'Space Grotesk', sans-serif;
      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }
    .profile-card:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px #000;
    }

    .profile-img {
      width: 150px;
      height: 150px;
      border-radius: 0;
      object-fit: cover;
      margin: 0 auto 1.5rem auto;
      border: 4px solid #000;
      box-shadow: 4px 4px 0px #000;
    }
    h2 {
      font-weight: 900;
      color: #000;
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      letter-spacing: -1px;
      font-size: clamp(1.25rem, 5vw, 1.75rem);
    }
    .subtitle {
      color: #000;
      font-weight: 700;
      font-size: clamp(0.9rem, 3vw, 1.2rem);
      margin: 0 0 1.5rem 0;
      background: #fff;
      display: inline-block;
      padding: 0.2rem 0.5rem;
      border: 3px solid #000;
    }
    .social-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .social-links a {
      background: #ffffff;
      color: #000;
      padding: 0.5rem 1rem;
      border: 3px solid #000;
      box-shadow: 4px 4px 0px #000;
      font-weight: 800;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .social-links a:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px #000;
      background: #fff;
    }
    .about-section {
      text-align: left;
      margin-top: 2rem;
      background: #fff;
      border: 4px solid #000;
      padding: 1.5rem;
      box-shadow: 4px 4px 0px #000;
    }
    .about-section h5 {
      margin: 0 0 0.5rem 0;
      color: #000;
      font-weight: 900;
      text-transform: uppercase;
    }
    .about-section p {
      color: #000;
      font-family: 'Public Sans', sans-serif;
      font-weight: 600;
      line-height: 1.6;
      margin: 0;
    }

    /* Mobile responsive */
    @media (max-width: 576px) {
      .profile-card {
        padding: 1.5rem 1rem;
        border-width: 3px;
        box-shadow: 4px 4px 0px #000;
      }
      .profile-card:hover {
        transform: none;
        box-shadow: 4px 4px 0px #000;
      }
      .profile-img {
        width: 110px;
        height: 110px;
        border-width: 3px;
        box-shadow: 3px 3px 0px #000;
      }
      .social-links {
        gap: 0.75rem;
      }
      .social-links a {
        padding: 0.4rem 0.75rem;
        font-size: 0.85rem;
        border-width: 2px;
        box-shadow: 3px 3px 0px #000;
      }
      .about-section {
        padding: 1rem;
        border-width: 3px;
        box-shadow: 3px 3px 0px #000;
      }
      .about-section p {
        font-size: 0.9rem;
      }
    }
  `;

  render() {
    return html`
      <div class="profile-card">
        <img
          src="https://source.unsplash.com/random/300x300?portrait,developer"
          alt="Developer Profile"
          class="profile-img"
        />
        <h2>Dicoding Developer</h2>
        <p class="subtitle">${msg('Penggiat Frontend Engineering')}</p>
        <div class="social-links">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
        <div class="about-section">
          <h5>${msg('Tentang')}</h5>
          <p>
            ${msg(
              'Web developer yang antusias dalam membuat aplikasi web modern, responsif, dan dinamis. Proyek Story App ini fokus pada enkapuslasi Web Components (Lit) via Shadow DOM asli.',
            )}
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('dev-profile', DevProfile);
