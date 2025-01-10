declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { RequestHandler } from 'express'; // Express style middleware types
  
    interface NextConnect<Req = NextApiRequest, Res = NextApiResponse> {
      use(...handlers: Array<RequestHandler<Req, Res>>): this;
      get(handler: RequestHandler<Req, Res>): this;
      post(handler: RequestHandler<Req, Res>): this;
      put(handler: RequestHandler<Req, Res>): this;
      delete(handler: RequestHandler<Req, Res>): this;
      // Add other HTTP methods as needed
    }
  
    export default function nc<Req = NextApiRequest, Res = NextApiResponse>(): NextConnect<Req, Res>;
  }
  