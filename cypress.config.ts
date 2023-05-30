import prisma from './src/lib/prisma'
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    /**
     * defaults to medium screen, check ~/src/styles/base.css for more info 
     */
    viewportWidth: 768,
    setupNodeEvents(on, config) {
      on('task', {
        async deleteUserByEmail(email: string) {
          try {
            console.log(`info: Deleting User with email: ${email}`)
          await prisma.user.delete({
            where: {
              email
            }
          })
          } catch (error) {
            console.error(`error: Something went wrong while deleting User with email: ${email}`)
          }
        },
      }),
        on('after:spec', async () => {
          try {
            console.log('info: Wiping User data...')
            await prisma.user.deleteMany()
            console.log('info: Wiped User data successfully.')
          } catch (error) {
            console.error('error: Something went wrong while wiping User data.')
          }
        })
    },
  },
})