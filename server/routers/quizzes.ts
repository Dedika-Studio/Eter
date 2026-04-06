import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getAllQuizScores, addQuizScore } from "../db";

export const quizzesRouter = router({
  getLeaderboard: publicProcedure
    .input(z.object({ quizId: z.string().optional() }))
    .query(async ({ input }) => {
      const scores = await getAllQuizScores(input.quizId);
      // Retornar los mejores 10 puntajes ordenados
      return scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }),

  saveScore: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      score: z.number(),
      total: z.number(),
      quizId: z.string(),
      date: z.string()
    }))
    .mutation(async ({ input }) => {
      const id = await addQuizScore(input);
      return { id, success: true };
    }),
});
