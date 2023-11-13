export default interface ErrorController {
    name: string,
    error: boolean,
    errorType: string,
    control: string,
    code?: string,
    message: string,
    stack?: string
}