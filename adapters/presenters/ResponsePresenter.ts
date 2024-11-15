import {injectable} from 'inversify';
import "reflect-metadata";

@injectable()
export default class ResponsePresenter {
  static json<T>(data: T, code: number = 200) {
    return {
      statusCode: code,
      data,
    };
  }
}
