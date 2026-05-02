import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus, BadRequestException, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { AppResponse } from "../utils/response.util";

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()

        if (exception instanceof BadRequestException) {

            const error: any = exception.getResponse()
            const statusCode = exception.getStatus()

            console.log(exception.name)

            response.status(statusCode).json(new AppResponse(
                "Bad Request",
                "Invalid input. Please check the provided fields.",
                null,
                error?.message,
                statusCode
            ))
        }
        else if (exception instanceof AppResponse) {
            response.status(exception.statusCode).json(exception)
        }

        else if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json(new AppResponse(
                exception.name,
                exception.message,
                null,
                exception.cause ?? null,
                exception.getStatus())
            )
        }
        else {

            response.status(500).json(new AppResponse(
                "Internal Server Error",
                "Something went wrong",
                null,
                null,
                HttpStatus.INTERNAL_SERVER_ERROR
            ))
        }

    }
}