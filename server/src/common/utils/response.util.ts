import { HttpStatus } from "@nestjs/common"

export class AppResponse<T, E> {
    readonly statusCode: HttpStatus;
    readonly title: string;
    readonly description: string;
    readonly body: T
    readonly error: E;
    constructor(title: string, description: string, body: T, error: E, statusCode: HttpStatus) {
        this.title = title
        this.statusCode = statusCode
        this.description = description
        this.body = body
        this.error = error
    }
}

