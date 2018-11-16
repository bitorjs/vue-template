import D from '../../vue-inject/decorators';
import Index from '../view/index';
import notFount from '../view/404';
import Person from '../view/person';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    this.ctx.render(Index)
  }

  @D.Get('/person/:userid')
  person() {
    this.ctx.render(Person)
  }

  @D.Get('*')
  notFount() {
    this.ctx.render(notFount)
  }
}

export default IndexController;