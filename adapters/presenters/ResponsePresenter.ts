import {injectable} from 'inversify';

@injectable()
export default class ResponsePresenter {
  static json<T>(data: T, code: number = 200) {
    return {
      statusCode: code,
      data,
    };
  }
}
