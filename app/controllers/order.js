import D from "bitorjs-decorators";
import Order from '../view/order';
import Detail from '../view/detail';
import notFount from '../view/404';

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
    this.ctx.render(Order)
  }

  @D.Get('/detail/:id')
  renderApp() {
    let params = this.ctx.params;
    console.log(params)
    this.ctx.render(Detail, params);
  }

  //get *
  @D.Get('/*')
  notFount() {
    this.ctx.render(notFount)
  }

  debug() {
    return this.bug;
  }

}

export default Controller;