import D from '../../vue-inject/decorators';

@D.namespace('/api')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/default')
  index() {
    return [{
        id: 1,
        name: 'huang'
      },
      {
        id: 2,
        name: 'zheng'
      },
      {
        id: 3,
        name: 'jie'
      },
    ]
  }

  @D.Post('/person/:userid')
  person(params) {
    let userid = params.userid;
    return userid;
  }

  @D.Delete('/detail')
  notFount() {
    return [
      1, 2, 3
    ]
  }
}

export default IndexController;