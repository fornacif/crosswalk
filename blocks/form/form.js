// block.js
export default async function decorate(block) {
  block.textContent = '';

  // Add CSS
  const styles = document.createElement('style');
  styles.textContent = `
      .form-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
      }

      .form-wrapper {
          background-color: white;
          border-radius: 8px;
          padding: 32px;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .form-title {
          font-size: 24px;
          font-weight: bold;
          color: #000;
          margin-bottom: 24px;
      }

      .form-group {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
      }

      .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          margin-bottom: 8px;
          flex: 0 0 auto;
      }

      .form-input,
      .form-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solidrgb(0, 0, 0);
          border-radius: 4px;
          font-size: 16px;
          color: #000;
          background-color: white;
          flex: 1;
          min-height: 40px;
          box-sizing: border-box;
      }

      .form-input:focus,
      .form-select:focus {
          outline: none;
          border-color: black;
          box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.2);
      }

      .submit-button {
          width: 100%;
          padding: 10px 16px;
          background-color: black
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
      }

      .submit-button:disabled {
          background-color: #d1d5db;
          color: #9ca3af;
          cursor: not-allowed;
      }

      .spinner {
          animation: spin 1s linear infinite;
          margin-right: 8px;
          display: inline-block;
      }

      @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
      }
  `;

  const content = document.createRange().createContextualFragment(`
      <div class="form-container">
          <div class="form-wrapper">
              <h2 class="form-title" data-aue-prop="title" data-aue-type="text" data-aue-label="Title">L'endroit depuis lequel vous rêveriez de déployer AEM !</h2>
              
              <form id="modernForm">
                  <div class="form-group">
                      <label class="form-label" for="name">Prénom</label>
                      <input type="text" id="name" name="name" class="form-input" placeholder="Prénom" required>
                  </div>

                  <div class="form-group">
                      <label class="form-label" for="email">Email</label>
                      <input type="email" id="email" name="email" class="form-input" placeholder="Entrer votre email" required>
                  </div>

                  <div class="form-group">
                      <label class="form-label" for="location">Lieu</label>
                      <select id="location" name="location" class="form-select" required>
                          <option value="">Sélectionner</option>
                          <option value="à la mer">Mer</option>
                          <option value="à la montagne">Montagne</option>
                          <option value="campagne">Campagne</option>
                      </select>
                  </div>

                  <div class="form-group">
                      <label class="form-label" for="house">Type de résidence</label>
                      <select id="house" name="house" class="form-select" required>
                          <option value="">Sélectionner</option>
                          <option value="d une maison">Maison</option>
                          <option value="d un appartement">Appartement</option>
                          <option value="d une tiny house">Tiny House</option>
                          <option value="d un château">Château</option>
                      </select>
                  </div>

                  <div class="form-group">
                      <label class="form-label" for="outdoor">Extérieur</label>
                      <select id="outdoor" name="outdoor" class="form-select" required>
                          <option value="">Sélectionner</option>
                          <option value="avec piscine">Piscine</option>
                          <option value="avec un terrain de tennis">Terrain de tennis</option>
                          <option value="avec un jardin japonais">Jardin japonais</option>
                          <option value="a côté d une forêt">Forêt</option>
                      </select>
                  </div>

                  <button type="submit" id="submitBtn" class="submit-button" data-aue-prop="cta" data-aue-type="text" data-aue-label="CTA">
                      Découvrir
                  </button>
              </form>
          </div>
      </div>
  `);
  
  document.head.appendChild(styles);
  block.append(content);

  document.getElementById('modernForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const responseContainer = document.getElementById('response-container');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
          <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
      `;
    
      try {
          const formData = new FormData(e.target);
          const response = await fetch('https://85792-608blackantelope-stage.adobeioruntime.net/api/v1/web/demo-kit.processing-profiles/genai-automation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Object.fromEntries(formData))
          });
    
          if (response) {
              e.target.reset();
          }
      } catch (error) {
          if (responseContainer) {
              responseContainer.innerHTML = `<p style="color: #ef4444;">Error: ${error.message}</p>`;
          }
      } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit';
      }
  });
}