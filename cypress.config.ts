import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    /**
     * defaults to medium screen, check ~/src/styles/base.css for more info 
     */
    viewportWidth: 768
  },
})