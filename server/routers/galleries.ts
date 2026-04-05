import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getAllGalleries, addGalleryPhoto, deleteGalleryPhoto } from "../db";

export const galleriesRouter = router({
  /**
   * Get all gallery photos for a specific group
   */
  list: publicProcedure
    .input(z.object({ group: z.string() }))
    .query(async ({ input }) => {
      try {
        return await getAllGalleries(input.group);
      } catch (error) {
        console.error("[Galleries Router] Error fetching galleries:", error);
        return [];
      }
    }),

  /**
   * Add a new photo to a gallery
   */
  add: publicProcedure
    .input(z.object({ 
      group: z.string().min(1, "Group is required"),
      url: z.string().url("Must be a valid URL")
    }))
    .mutation(async ({ input }) => {
      try {
        const id = await addGalleryPhoto(input.group, input.url);
        return { success: true, id, message: "Foto agregada exitosamente" };
      } catch (error) {
        console.error("[Galleries Router] Error adding photo:", error);
        throw new Error("Failed to add photo to gallery");
      }
    }),

  /**
   * Delete a photo from a gallery
   */
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await deleteGalleryPhoto(input.id);
        return { success: true, message: "Foto eliminada exitosamente" };
      } catch (error) {
        console.error("[Galleries Router] Error deleting photo:", error);
        throw new Error("Failed to delete photo from gallery");
      }
    }),
});
