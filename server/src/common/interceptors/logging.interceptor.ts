import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Request, Response } from "express";

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const start = Date.now()
        return next.handle().pipe(
            tap(() => {
                const end = Date.now()
                console.log("[", request.url, "]", "Took", end - start, "ms")
            })
        ).pipe(
            catchError(err => throwError(() => {
                const end = Date.now()
                console.log("[", request.url, "]", "Took", end - start, "ms")
                // Rethrow error for exception filter
                throw err
            })),
        )
    }
}