export class HttpError extends Error {
    constructor(message, status){
        super(message);
        this.status = status;
    }

    getMessage() {
        return this.message;
    }

    getStatus() {
        return this.status;
    }

}