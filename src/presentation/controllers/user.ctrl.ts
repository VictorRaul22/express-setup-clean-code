import {
  controller,
  httpGet,
  BaseHttpController,
} from "inversify-express-utils";
@controller("/foo")
export class FooController extends BaseHttpController {
  @httpGet("/")
  public index() {
    return this.json({ hello: "world" }, 200);
  }
}
