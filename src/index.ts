import { Hono } from "hono";
import { createIntorHandler, getTranslator } from "intor/hono";
import { intorConfig } from "./intor-config";

const app = new Hono();

app.use(createIntorHandler(intorConfig));

app.get("/", async (c) => {
  const { t, tRich } = await getTranslator(intorConfig, c);

  return c.json({
    hello: t("hello", { name: "Intor" }),
    rich: tRich("rich", { tag: (children) => `<b>${children}</b>` }),
  });
});

export default app;
