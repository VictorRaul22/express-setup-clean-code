import { type Request, type Response, Router } from "express";
export function routeApp(app: Router) {
  const router = Router();
  app.use("/api/v1", router);
  router.get("/user", (_req: Request, res: Response) => {
    res.json({ hello: "world" });
  });
}
