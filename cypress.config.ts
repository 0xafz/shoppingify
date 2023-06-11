import prisma from "./src/lib/prisma";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    /**
     * defaults to medium screen, check ~/src/styles/base.css for more info
     */
    viewportWidth: 768,
    setupNodeEvents(on, config) {
      on("task", {
        /**
         * Deletes user and their entire activity data :)
         */
        async deleteUserByEmail(email: string) {
          try {
            console.log(`info: Deleting User with email: ${email}`);
            const user = await prisma.user.findFirst({
              where: {
                email,
              },
            });
            if (!user || !user.id) {
              console.log(`info: User with email: ${email} does not exists!`);
              return false;
            }
            await prisma.user.delete({
              where: {
                id: user.id,
              },
            });
            await prisma.shoppingItemToList.deleteMany({
              where: {
                assignedBy: user.id,
              },
            });
            console.log(
              `info: Deleted User with email: ${email} and their data.`
            );
            return true;
          } catch (error) {
            console.error(
              `error: Something went wrong while deleting User with email: ${email}`
            );
            return false;
          }
        },
      });
      // on("after:spec", async () => {
      //   try {
      //     console.log("info: Wiping User data...");
      //     await prisma.user.deleteMany();
      //     console.log("info: Wiped User data successfully.");
      //   } catch (error) {
      //     console.error(
      //       "error: Something went wrong while wiping User data."
      //     );
      //   }
      // });
    },
  },
});
