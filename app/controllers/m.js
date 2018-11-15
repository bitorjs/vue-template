import D from '../../vue-inject/decorators';

@D.namespace('/m')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    this.ctx.render('Hello, mm and boy')
  }

  @D.Get('/bb')
  bb() {
    this.ctx.render('Test, /bb m')
  }
}

export default IndexController;