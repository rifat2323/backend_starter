import { Model, Document } from 'mongoose';



/**
 * Finds a single document from a MongoDB collection using the specified query.
 *
 * @template T - The type of the document being queried.
 * @param model - The Mongoose model to query.
 * @param query - An object representing the MongoDB query to perform.
 * @param select - Optional. Specifies which fields to include or exclude in the result.
 *                 Can be a string, an object mapping field names to include/exclude flags, or an array of field names.
 * @returns A promise that resolves to the found document of type T, or null if no document matches the query.
 * @throws Will throw an error if there is an issue executing the query.
 */
export const findOneFn = async <T extends Document>(model: Model<T>, query:Record<string, any>, select?: string | Record<string, string | number | boolean | object> | string[] ) => {
    try {
        if(select){
            const result = await model.findOne(query).select(select).lean().exec();
            return result as T  | null;

        }
        const result = await model.findOne(query).lean().exec();
        return result as T  | null;
    } catch (error:any) {
        throw new Error(`Error finding document: ${error.message}`);
    }
};
