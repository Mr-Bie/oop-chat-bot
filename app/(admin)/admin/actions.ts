"use server";

import { ACTION_RESPONSE_MESSAGES } from "@/constants/ui";
import { ActionResponse, parseFromFormData } from "@/lib/action";
import prisma from "@/lib/prisma";
import * as yup from "yup";

const deleteEventSchema = yup.object().shape({
  id: yup.string().required(),
});

// export async function deleteUserAction(data: FormData): ActionResponse {
//   let validatedData;
//   try {
//     validatedData = await deleteEventSchema.validate(parseFromFormData(data));
//   } catch (err) {
//     console.log("error in validation", err);
//     return {
//       success: false,
//       message: ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };
//   }

//   try {
//     await prisma.me.deleteMany({
//       where: {
//         eventId: validatedData.id,
//       },
//     });
//     await prisma.event.delete({
//       where: { id: validatedData.id },
//     });
//   } catch (err) {
//     console.log("error in deleting event", err);
//     return { success: false, message: "Internal Error" };
//   }

//   return { success: true, data: "Delete successfully" };
// }
