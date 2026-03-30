import { html, LitElement } from 'lit';
import { msg } from '@lit/localize';
import { register as apiRegister } from '../data/api.js';

class RegisterForm extends LitElement {
  static properties = {
    _loading: { type: Boolean, state: true },
    _errorMessage: { type: String, state: true },
    _successMessage: { type: String, state: true },
    _showPassword: { type: Boolean, state: true },
  };

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this._loading = false;
    this._errorMessage = '';
    this._successMessage = '';
    this._showPassword = false;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    this._errorMessage = '';
    this._successMessage = '';
    this._loading = true;

    const name = form.querySelector('#registerName').value;
    const email = form.querySelector('#registerEmail').value;
    const password = form.querySelector('#registerPassword').value;

    try {
      await apiRegister(name, email, password);
      this._successMessage = msg('Registrasi berhasil! Anda akan dialihkan ke halaman login...');
      form.reset();
      form.classList.remove('was-validated');

      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } catch (error) {
      this._errorMessage = error.message;
    } finally {
      this._loading = false;
    }
  }

  _togglePassword() {
    this._showPassword = !this._showPassword;
  }

  render() {
    return html`
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">${msg('Daftar')}</h2>
          <p class="auth-subtitle">${msg('Buat akun baru untuk mulai berbagi cerita.')}</p>
        </div>

        ${this._errorMessage
          ? html`
              <div class="alert alert-danger alert-custom mb-4" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>${this._errorMessage}
              </div>
            `
          : ''}
        ${this._successMessage
          ? html`
              <div
                class="alert alert-success alert-custom mb-4"
                role="alert"
                style="background:#000;color:#fff;border:3px solid #000;"
              >
                <i class="bi bi-check-circle-fill me-2"></i>${this._successMessage}
              </div>
            `
          : ''}

        <form class="story-form-custom needs-validation" novalidate @submit=${this._handleSubmit}>
          <div class="mb-4">
            <label for="registerName" class="form-label"
              >${msg('Nama')} <span class="text-danger">*</span></label
            >
            <div class="input-group has-validation">
              <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
              <input
                type="text"
                class="form-control"
                id="registerName"
                placeholder="${msg('Nama lengkap Anda')}"
                required
                ?disabled=${this._loading}
              />
              <div class="invalid-feedback">${msg('Silakan masukkan nama Anda.')}</div>
            </div>
          </div>

          <div class="mb-4">
            <label for="registerEmail" class="form-label"
              >${msg('Email')} <span class="text-danger">*</span></label
            >
            <div class="input-group has-validation">
              <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
              <input
                type="email"
                class="form-control"
                id="registerEmail"
                placeholder="${msg('nama@email.com')}"
                required
                ?disabled=${this._loading}
              />
              <div class="invalid-feedback">
                ${msg('Silakan masukkan alamat email yang valid.')}
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label for="registerPassword" class="form-label"
              >${msg('Password')} <span class="text-danger">*</span></label
            >
            <div class="input-group has-validation">
              <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
              <input
                type="${this._showPassword ? 'text' : 'password'}"
                class="form-control"
                id="registerPassword"
                placeholder="${msg('Minimal 8 karakter')}"
                required
                minlength="8"
                ?disabled=${this._loading}
              />
              <button
                class="btn btn-outline-dark password-toggle"
                type="button"
                @click=${this._togglePassword}
                tabindex="-1"
                aria-label="${this._showPassword
                  ? msg('Sembunyikan password')
                  : msg('Lihat password')}"
              >
                <i class="bi ${this._showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}"></i>
              </button>
              <div class="invalid-feedback">${msg('Password minimal 8 karakter.')}</div>
            </div>
          </div>

          <div class="d-grid mt-5">
            <button class="btn btn-submit btn-lg" type="submit" ?disabled=${this._loading}>
              ${this._loading
                ? html`<span
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span
                    >${msg('Memproses...')}`
                : msg('Daftar')}
            </button>
          </div>

          <div class="text-center mt-4">
            <p class="mb-0" style="font-weight:700;">
              ${msg('Sudah punya akun?')}
              <a href="/login.html" class="auth-link">${msg('Masuk di sini')}</a>
            </p>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('register-form', RegisterForm);
