import D from "../../vue-inject/decorators";
import App from '../view/index';
import Empty from '../view/empty';
import root from '../view/root';

const {
  Get
} = D;
// console.log(Get)

@D.namespace('/order')
class Controller {
  constructor(ctx) {
    this.ctx = ctx;
    this.bug = false;
  }

  @D.Get('/')
  index() {
    this.ctx.render(root)
  }

  //get /a11/:id/:age
  @D.Get('/a11/:id/:age')
  renderApp() {
    this.ctx.render(App);
  }

  //get *
  @D.Get('/a21/:id/:age')
  renderEmpty() {
    this.ctx.render(Empty)
  }

  @D.Get('(.*)')
  test() {
    this.ctx.render("Empty")
    console.log(this.debug())
  }

  debug() {
    return this.bug;
  }

}

export default Controller;