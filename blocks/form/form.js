import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);
    block.textContent = '';

    const content = document.createRange().createContextualFragment(`
        <div class="bg-black flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-8 w-full max-w-md border border-neutral-700">
                <h2 class="text-2xl font-bold text-black mb-6">Votre projet de déménagement</h2>
                
                <form id="modernForm" class="space-y-6">
                    <div>
                        <label for="name" class="block text-sm font-medium text-black mb-2">Prénom</label>
                        <input type="text" id="name" name="name" class="w-full bg-white text-black border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Prénom" required>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-black mb-2">Email</label>
                        <input type="email" id="email" name="email" class="w-full bg-white text-black border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter your email" required>
                    </div>

                    <div>
                        <label for="location" class="block text-sm font-medium text-black mb-2">Lieu</label>
                        <select id="location" name="location" class="w-full bg-white text-black border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required>
                            <option value="">Sélectionner</option>
                            <option value="à la mer">Mer</option>
                            <option value="à la montagne">Montagne</option>
                            <option value="campagne">Campagne</option>
                        </select>
                    </div>

                    <div>
                        <label for="house" class="block text-sm font-medium text-black mb-2">Type de résidence</label>
                        <select id="house" name="house" class="w-full bg-white text-black border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required>
                            <option value="">Sélectionner</option>
                            <option value="d une aison">Maison</option>
                            <option value="d un appartement">Appartement</option>
                            <option value="d une tiny house">Tiny House</option>
                            <option value="d un château">Château</option>
                        </select>
                    </div>

                    <div>
                        <label for="outdoor" class="block text-sm font-medium text-black mb-2">Extérieur</label>
                        <select id="outdoor" name="outdoor" class="w-full bg-white text-black border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required>
                            <option value="">Sélectionner</option>
                            <option value="avec piscine">Piscine</option>
                            <option value="aevc un terrain de tennis">Terrain de tennis</option>
                            <option value="avec un jardin japonais">Jardin japonais</option>
                            <option value="a côté d une forêt">Forêt</option>
                        </select>
                    </div>

                    <button type="submit" id="submitBtn" class="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-150 disabled:bg-neutral-600 disabled:text-neutral-400 flex items-center justify-center">
                        Découvrir
                    </button>
                </form>
            </div>
        </div>
    `);
    
    block.append(content);

    document.getElementById('modernForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        const responseContainer = document.getElementById('response-container');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
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
          responseContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit';
        }
      });
}