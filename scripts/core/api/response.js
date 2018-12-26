// @flow strict

import type { RawPaginatedResponse } from '../types';
import type { BaseAPI } from './base';

class PageResponse<A, B> {
  count: number

  results: Array<B>

  nextUrl: ?string

  previousUrl: ?string

  api: BaseAPI

  normalize: A => B

  constructor(raw: RawPaginatedResponse<A>, api: BaseAPI, normalize: A=> B) {
    this.api = api;
    this.normalize = normalize;
    // ------
    this.count = raw.count;
    this.results = raw.results.map(normalize);
    this.hasNext = Boolean(raw.next);
    this.hasPrevious = Boolean(raw.previous);
    this.nextUrl = raw.next;
    this.previousUrl = raw.previous;
  }

  hasNext = () => Boolean(this.nextUrl)

  hasPrevious = () => Boolean(this.previousUrl)

  getFromUrl = (url: string) => (
    this.api.get(url)
      .then(resp => resp.data)
      .then((r: RawPaginatedResponse<A>) => new PageResponse(
        r,
        this.api,
        this.normalize,
      )));

  getNext = (): Promise<PageResponse<A, B>> => {
    if (!this.nextUrl) {
      throw new Error('There is no next page');
    } else {
      return this.getFromUrl(this.nextUrl); // .then(resp => resp.data.data);
    }
  }

  getPrevious = (): Promise<PageResponse<A, B>> => {
    if (!this.previousUrl) {
      throw new Error('There is no previous page');
    } else {
      return this.getFromUrl(this.previousUrl);
    }
  }
}

export {
  PageResponse,
};
