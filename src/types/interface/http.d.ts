import { NextFunction, Request, Response, Router } from 'express';

export type HttpRouter = Router;
export type HttpRequest = Request;
export type HttpResponse = Response;
export type HttpNext = NextFunction;

export interface IHttpRoute {
  register(r: HttpRouter): void;
}

export interface IHttpInterface {
  serve(): void;
}
