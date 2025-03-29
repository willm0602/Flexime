import type { NextApiRequest, NextApiResponse } from "next";

type Handler = (req: NextApiRequest, res: NextApiResponse) => unknown;

type Middleware = (handler: Handler) => unknown;

export default Middleware;