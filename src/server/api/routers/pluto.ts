import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const plutoRouter = createTRPCRouter({
  // pizzas

  // admin_toppings 
  // I could collapse this into 
  // getToppings - gets all toppings
  // curdTopping = toppings[] =>
  //  - id != null, name=null, category=null - delete
  //  - id != null, name !=null, category !=null - update
  //  - id == null, name !=null, category !=null - create
  getToppings: publicProcedure.query(({ ctx }) => {
    return ctx.db.topping.findMany();
  }),
  createTopping: protectedProcedure
    .input(
      z.object({
        category: z.string().min(1),
        name: z.string().min(1),
      }))
    .mutation(({ ctx, input }) => {
      return ctx.db.topping.create({
        data: {
          name: input.name,
          category: input.category
        }
      })
    }),
  updateTopping: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        category: z.string().min(1),
        name: z.string().min(1),
      }))
    .mutation(({ ctx, input }) => {
      return ctx.db.topping.update({
        where: { id: input.id },
        data: {
          name: input.name,
          category: input.category
        }
      })
    }),
  deleteTopping: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.topping.delete({
        where: { id: input.id },
      })
    }),

  // orders
  createOrder: protectedProcedure
    .input(z.object({
      pizzas: z.array(z.object({
        toppings: z.array(z.number()),
        size: z.enum(["SMALL", "MEDIUM", "LARGE"])
      }))
    }))
    .mutation(async ({ ctx, input }) => {

      const toppings = await ctx.db.topping.findMany({}); // we could cache this

      const pizzas = input.pizzas.map(pizza => {
        return {
          size: pizza.size,
          toppings: pizza.toppings.map(toppingId => {
            return toppings.find(topping => topping.id === toppingId)
          })
        }
      })
      return ctx.db.order.create({
        data: {
          orderStatus: "PREPARATION",
          paymentStatus: "PENDING",
          customerId: ctx.session.user.id,
          // pizzas
          pizzas: {
            createMany: {
              data: [
                {
                  name: "pizza",
                  size: "SMALL",
                }
              ]
            }
          }
        },
        include: {
          pizzas: {
            include: {
              toppings: true
            }
          }
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

    const order = await ctx.db.order.findFirst({
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

    if (order) {
      return order;
    }

    return ctx.db.order.create({
      data: {
        orderStatus: "PREPARATION",
        paymentStatus: "PENDING",
        customerId: ctx.session.user.id,
        // pizzas
      },
      include: {
        pizzas: {
          include: {
            toppings: true
          }
        }
      }
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
