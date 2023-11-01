import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const plutoRouter = createTRPCRouter({
  // pizzas

  // orders

  createOrder: protectedProcedure
    .input(z.object({
      address: z.object({
        street: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string(),
      }),
      pizzas: z.array(z.object({
        toppings: z.array(z.string()),
        size: z.enum(["SMALL", "MEDIUM", "LARGE"])
      })),
      notes: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const { pizzas } = input;
      return ctx.db.order.create({

        data: {
          orderStatus: "PREPARATION",
          paymentStatus: "PENDING",
          customerId: ctx.session.user.id,
          // pizzas
          pizzas: {
            createMany: {
              data: pizzas
            }
          },
          notes: input.notes,
        },
        include: {
          pizzas: true,
          customer: true,
        }
      });

    }),
  // orders 
  getOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({});
  }),
  getOrder: protectedProcedure.input(z.object({
    orderId: z.number()
  })).query(({ ctx, input }) => {
    const { orderId } = input;
    return ctx.db.order.findFirst({
      where: { id: orderId },
      include: { pizzas: true },
    });
  }),
  getCurrentOrder: protectedProcedure.query(async ({ ctx }) => {
    // returns the current order for the user
    // if there is no current order, it creates one

    return await ctx.db.order.findFirst({
      where: {
        NOT: {
          OR: [
            { orderStatus: "DELIVERED" },
            { orderStatus: "CANCELLED" }
          ]
        },
        customerId: ctx.session.user.id
      },
      include: { pizzas: true },
    });

  }),
  getPastOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({
      where: {
        orderStatus: "DELIVERED",
        customerId: ctx.session.user.id
      },
      include: { pizzas: true },
    });
  })
});
