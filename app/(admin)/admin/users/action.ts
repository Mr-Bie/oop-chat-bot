// 'use server';
// import * as yup from 'yup';

// import prisma from '@/lib/prisma';
// import { uploadFile } from '@/lib/uploadFile';
// import { ActionResponse, parseFromFormData } from '@/lib/action';
// import { constants } from '@/utils/constants';

// const addEventSchema = yup.object().shape({
//   title: yup.string().required(),
//   description: yup.string().required(),
//   expireDate: yup
//     .date()
//     .required()
//     .test((value: any) => value instanceof Date && !isNaN(value.getTime())),
//   audiences: yup
//     .array()
//     .of(yup.string().required())
//     .transform((value) => {
//       // Transform to a flat array of 'key' values
//       if (Array.isArray(value)) {
//         return value.map((item) => item.audience); // Here, 'key' is a string.
//       }
//       return value;
//     })
//     .test(
//       (value) =>
//         !value ||
//         (Array.isArray(value) &&
//           value.every((item) => typeof item === 'string'))
//     ),
//   location: yup.string(),
//   cost: yup.string(),
//   extraFields: yup.array().of(
//     yup.object({
//       key: yup.string().required(),
//       value: yup.string().required(),
//     })
//   ),
//   userInputs: yup.array().of(
//     yup.object({
//       name: yup.string().required(),
//       type: yup.string().required(),
//     })
//   ),
//   files: yup.array(),
// });

// const editEventSchema = yup.object().shape({
//   id: yup.string().required(),
//   title: yup.string().required(),
//   description: yup.string().required(),
//   expireDate: yup
//     .date()
//     .required()
//     .test((value: any) => value instanceof Date && !isNaN(value.getTime())),
//   audiences: yup
//     .array()
//     .of(yup.string().required())
//     .transform((value) => {
//       // Transform to a flat array of 'key' values
//       if (Array.isArray(value)) {
//         return value.map((item) => item.audience); // Here, 'key' is a string.
//       }
//       return value;
//     })
//     .test(
//       (value) =>
//         !value ||
//         (Array.isArray(value) &&
//           value.every((item) => typeof item === 'string'))
//     ),
//   location: yup.string(),
//   cost: yup.string(),
//   extraFields: yup.array().of(
//     yup.object({
//       key: yup.string().required(),
//       value: yup.string().required(),
//     })
//   ),
//   userInputs: yup.array().of(
//     yup.object({
//       name: yup.string().required(),
//       type: yup.string().required(),
//     })
//   ),
//   files: yup.array(),
// });

// export async function uploadEventAction(data: FormData): ActionResponse {
//   let validatedData;
//   try {
//     validatedData = await addEventSchema.validate(parseFromFormData(data));
//   } catch (err) {
//     console.log('error in validation create event', err);
//     return {
//       success: false,
//       message: constants.ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };
//   }

//   const poster = data.get('poster') as File;
//   let posterPath;
//   try {
//     posterPath = await uploadFile(poster, 'event_poster', ['Image'], true, 5);
//   } catch (err) {
//     console.log('error in uploading event ', err);
//   }

//   if (!posterPath) {
//     console.log('poster path is not defined in create event');
//     return {
//       success: false,
//       message: constants.ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };
//   }

//   console.log('add event files ', data.getAll('files'));
//   let downloadableFiles: { name: string; path: string }[] = [];
//   try {
//     let formFiles = validatedData.files;
//     if (formFiles && formFiles instanceof Array) {
//       downloadableFiles = await Promise.all(
//         formFiles.map(async (v) => {
//           console.log('uploading file', v);
//           const path = await uploadFile(
//             v['file'] as File,
//             'event_files',
//             ['Image', 'PDF'],
//             true
//           );

//           return { name: v.name, path };
//         })
//       );
//     }
//   } catch (err) {
//     console.log('error in uploading event and saving files', err);
//     return {
//       success: false,
//       message: constants.ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };
//   }

//   const { userInputs, extraFields, ...eventData } = validatedData;
//   await prisma.event.create({
//     data: {
//       ...eventData,
//       signUpFields: { create: userInputs },
//       extraFields: { create: extraFields },
//       files: { create: downloadableFiles },
//       poster: posterPath,
//     },
//   });

//   return { success: true, data: constants.ACTION_RESPONSE_MESSAGES.SUCCESS };
// }

// export async function editEventAction(data: FormData): ActionResponse {
//   let validatedData;
//   try {
//     validatedData = await editEventSchema.validate(parseFromFormData(data));
//   } catch (err) {
//     console.log('error in validation create event', err);
//     return {
//       success: false,
//       message: constants.ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };
//   }

//   const poster = data.get('poster') as File;
//   let posterPath;
//   try {
//     posterPath = await uploadFile(poster, 'event_poster', ['Image'], true, 5);
//   } catch (err) {
//     console.log('error in uploading event ', err);
//   }

//   if (!posterPath) {
//     console.log('poster path is not defined in create event');
//     return {
//       success: false,
//       message: constants.ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };
//   }

//   console.log('add event files ', data.getAll('files'));
//   let downloadableFiles: { name: string; path: string }[] = [];
//   try {
//     let formFiles = validatedData.files;
//     if (formFiles && formFiles instanceof Array) {
//       downloadableFiles = await Promise.all(
//         formFiles.map(async (v) => {
//           console.log('uploading file', v);
//           const path = await uploadFile(
//             v['file'] as File,
//             'event_files',
//             ['Image', 'PDF'],
//             true
//           );

//           return { name: v.name, path };
//         })
//       );
//     }
//   } catch (err) {
//     console.log('error in uploading event and saving files', err);
//     return {
//       success: false,
//       message: constants.ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };
//   }

//   await prisma.eventDownloadableFiles.deleteMany({
//     where: { eventId: validatedData.id },
//   });
//   await prisma.eventExtraField.deleteMany({
//     where: { eventId: validatedData.id },
//   });
//   await prisma.eventSignUpField.deleteMany({
//     where: { eventId: validatedData.id },
//   });

//   const { userInputs, extraFields, id, ...eventData } = validatedData;

//   console.log('event update data ', {
//     ...eventData,
//     signUpFields: {
//       create: userInputs?.map((v) => ({ name: v.name, type: v.type })),
//     },
//     extraFields: {
//       create: extraFields?.map((v) => ({ key: v.key, value: v.value })),
//     },
//     files: {
//       create: downloadableFiles?.map((v) => ({ name: v.name, path: v.path })),
//     },
//     poster: posterPath,
//   });

//   await prisma.event.update({
//     where: {
//       id,
//     },
//     data: {
//       ...eventData,
//       signUpFields: {
//         create: userInputs?.map((v) => ({ name: v.name, type: v.type })),
//       },
//       extraFields: {
//         create: extraFields?.map((v) => ({ key: v.key, value: v.value })),
//       },
//       files: { create: downloadableFiles },
//       poster: posterPath,
//     },
//   });

//   return { success: true, data: constants.ACTION_RESPONSE_MESSAGES.SUCCESS };
// }

// export async function deleteEventSubAction(data: FormData): ActionResponse {
//   console.log(data);
//   const eventSubId = data.get('eventSubId');

//   if (!eventSubId)
//     return {
//       success: false,
//       message: constants.ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
//     };

//   await prisma.eventSub.delete({
//     where: {
//       id: eventSubId as string,
//     },
//   });

//   return { success: true, data: constants.ACTION_RESPONSE_MESSAGES.SUCCESS };
// }
