import { html, LitElement } from 'lit';
import { msg } from '@lit/localize';
import { addStory } from '../data/api.js';

class StoryForm extends LitElement {
  static properties = {
    _loading: { type: Boolean, state: true },
    _errorMessage: { type: String, state: true },
  };

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this._loading = false;
    this._errorMessage = '';
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // Bootstrap validation check
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    this._errorMessage = '';
    this._loading = true;

    const photoInput = form.querySelector('#validationCustom01');
    const descriptionInput = form.querySelector('#validationTextarea');
    const rawPhoto = photoInput.files[0];
    const description = descriptionInput.value;

    // Compress image if larger than 900KB
    const photo = rawPhoto.size > 900000 ? await this._compressImage(rawPhoto) : rawPhoto;

    try {
      await addStory(description, photo);

      // Success
      form.classList.remove('was-validated');
      form.reset();

      // Hide image preview
      const previewContainer = this.querySelector('#imagePreviewContainer');
      if (previewContainer) {previewContainer.classList.add('d-none');}

      // Create custom event to notify parent
      this.dispatchEvent(
        new CustomEvent('story-submitted', {
          bubbles: true,
          composed: true,
          detail: { success: true },
        }),
      );
    } catch (error) {
      this._errorMessage = error.message;
    } finally {
      this._loading = false;
    }
  }

  // To preview image when selected
  _handleImageChange(e) {
    const file = e.target.files[0];
    const previewContainer = this.querySelector('#imagePreviewContainer');
    const previewImage = this.querySelector('#imagePreview');

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewContainer.classList.remove('d-none');
      };
      reader.readAsDataURL(file);
    } else {
      previewContainer.classList.add('d-none');
      previewImage.src = '';
    }
  }

  // Compress image to fit under 1MB API limit
  _compressImage(file, maxWidth = 1024, quality = 0.7) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            },
            'image/jpeg',
            quality,
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    return html`
      ${this._errorMessage
        ? html`
            <div class="alert alert-danger alert-custom mb-4" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>${this._errorMessage}
            </div>
          `
        : ''}

      <form
        class="story-form-custom needs-validation"
        id="addStoryForm"
        novalidate
        @submit=${this._handleSubmit}
      >
        <div class="mb-4">
          <label for="validationCustom01" class="form-label"
            >${msg('Unggah Foto')} <span class="text-danger">*</span></label
          >
          <div class="input-group has-validation">
            <input
              type="file"
              class="form-control"
              id="validationCustom01"
              accept="image/*"
              required
              ?disabled=${this._loading}
              @change=${this._handleImageChange}
            />
            <div class="invalid-feedback">${msg('Silakan pilih file gambar yang valid.')}</div>
          </div>
        </div>

        <div class="mb-4 d-none" id="imagePreviewContainer">
          <label class="form-label d-block text-secondary">${msg('Pratinjau')}</label>
          <img
            id="imagePreview"
            src=""
            alt="${msg('Pratinjau Cerita')}"
            class="img-thumbnail"
            style="max-height: 250px; object-fit: contain;"
          />
        </div>

        <div class="mb-4">
          <label for="validationTextarea" class="form-label"
            >${msg('Deskripsi Cerita')} <span class="text-danger">*</span></label
          >
          <textarea
            class="form-control"
            id="validationTextarea"
            placeholder="${msg('Ceritakan apa yang ada di pikiran Anda...')}"
            rows="5"
            required
            ?disabled=${this._loading}
          ></textarea>
          <div class="invalid-feedback">
            ${msg('Silakan masukkan deskripsi untuk cerita Anda.')}
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
                  >${msg('Mengunggah...')}`
              : msg('Publikasikan Cerita')}
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define('story-form', StoryForm);
