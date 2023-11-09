export default interface ErrorController {
    name: string,
    error: boolean,
    errorType: string,
    control: string,
    message: string,
    stack?: string
}