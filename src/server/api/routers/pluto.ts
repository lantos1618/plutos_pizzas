import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
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
      const { pizzas, address } = input;
      return ctx.db.order.create({
        data: {
          orderStatus: "PREPARATION",
          paymentStatus: "PAYMENT_ON_DELIVERY",
          customer: {
            connect: {
              id: ctx.session.user.id
            }
          },
          address: {
            create: address
          },
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
          address: true,
          customer: true,
        }
      });

    }),
  updateOrder: protectedProcedure.input(z.object({
    orderId: z.string(),
    orderStatus: z.optional(z.enum([
      "PREPARATION", "COOKING", "DELIVERY", "DELIVERED", "CANCELLED"])),
    paymentStatus: z.optional(z.enum([
      "CANCELLED", "PENDING", "PAID", "FAILED", "PAYMENT_ON_DELIVERY", "REFUNDED"])),
  })).mutation(({ ctx, input }) => {
    const { orderId, orderStatus, paymentStatus } = input;
    return ctx.db.order.update({
      where: { id: orderId },
      data: {
        orderStatus: orderStatus,
        paymentStatus: paymentStatus,
      },
      include: {
        pizzas: true,
        address: true,
        customer: true,
      }
    });
  }),
  // orders 
  getOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({
      include: { 
        pizzas: true,
        customer: true,
        address: true,
       },
       orderBy: {
         createdAt: "desc"
      }
    });
  }),
  getOrder: protectedProcedure.input(z.object({
    orderId: z.string()
  })).query(({ ctx, input }) => {
    const { orderId } = input;
    return ctx.db.order.findFirst({
      where: { id: orderId },
      include: { 
        pizzas: true,
       },
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
