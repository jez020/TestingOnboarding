import { RequestHandler } from "express";
import TaskModel from "src/models/task";

/**
 * Get a list of all the tasks listed in chronological order.
 *
 * @param req The Request object from Express. This contains all the data from
 * the API request. (https://expressjs.com/en/4x/api.html#req)
 * @param res The Response object from Express. We use this to generate the API
 * response for Express to send back. (https://expressjs.com/en/4x/api.html#res)
 * @param next The next function in the chain of middleware. If there's no more
 * processing we can do in this handler, but we're not completely done handling
 * the request, then we can pass it along by calling next(). For all of the
 * handlers defined in `src/controllers`, the next function is the global error
 * handler in `src/app.ts`.
 */
export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const result = await TaskModel.find().sort({ dateCreated: "asc" });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
