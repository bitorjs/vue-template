import D from '../../vue-inject/decorators';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    this.ctx.render('Hello, boy')
  }

  @D.Get('/bb')
  bb() {
    this.ctx.render('Test, /bb')
  }
}

export default IndexController;