import { Controller, action, controller } from "maishu-node-mvc";

@controller()
export class HomeController extends Controller {
    @action("/")
    index() {
        return "Index Page";
    }
}