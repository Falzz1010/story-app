import { html, LitElement } from 'lit';
import { msg } from '@lit/localize';

class StoryForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Bootstrap validation check
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Success Simulation
    form.classList.remove('was-validated');
    form.reset();
    
    // Create custom event to notify parent
    this.dispatchEvent(new CustomEvent('story-submitted', {
      bubbles: true,
      composed: true,
      detail: { success: true }
    }));
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
      previewImage.src = "";
    }
  }

  render() {
    return html`
      <form class="story-form-custom needs-validation" id="addStoryForm" novalidate @submit=${this._handleSubmit}>
        <div class="mb-4">
          <label for="validationCustom01" class="form-label">${msg('Unggah Foto')} <span class="text-danger">*</span></label>
          <div class="input-group has-validation">
            <input 
              type="file" 
              class="form-control" 
              id="validationCustom01" 
              accept="image/*" 
              required
              @change=${this._handleImageChange}
            >
            <div class="invalid-feedback">
              ${msg('Silakan pilih file gambar yang valid.')}
            </div>
          </div>
        </div>

        <div class="mb-4 d-none" id="imagePreviewContainer">
          <label class="form-label d-block text-secondary">${msg('Pratinjau')}</label>
          <img id="imagePreview" src="" alt="${msg('Pratinjau Cerita')}" class="img-thumbnail" style="max-height: 250px; object-fit: contain;">
        </div>

        <div class="mb-4">
          <label for="validationTextarea" class="form-label">${msg('Deskripsi Cerita')} <span class="text-danger">*</span></label>
          <textarea 
            class="form-control" 
            id="validationTextarea" 
            placeholder="${msg('Ceritakan apa yang ada di pikiran Anda...')}" 
            rows="5" 
            required
          ></textarea>
          <div class="invalid-feedback">
            ${msg('Silakan masukkan deskripsi untuk cerita Anda.')}
          </div>
        </div>
        
        <div class="d-grid mt-5">
          <button class="btn btn-submit btn-lg" type="submit">${msg('Publikasikan Cerita')}</button>
        </div>
      </form>
    `;
  }
}

customElements.define('story-form', StoryForm);
