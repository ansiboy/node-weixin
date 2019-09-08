export let errors = {
    unknownError(): Error {
        return { name: "unknown", message: "unknown" }
    },
    responseFormatError(message: string): Error {
        return { name: "responseFormatError", message: `Response message is:\r\n${message}` };
    },
    partnerKeyIsNull(): Error {
        let err: Error = { name: "partnerKeyIsNull", message: "partnerKeyIsNull" };
        return err;
    },
    partnerIdIsNull(): Error {
        let err: Error = { name: "partnerIdIsNull", message: "partnerIdIsNull" };
        return err;
    },
    AppIdIsNull(): Error {
        let err: Error = { name: "AppIdIsNull", message: "AppIdIsNull" };
        return err;
    },
    AppKeyNull(): Error {
        let err: Error = { name: "AppKeyNull", message: "AppKeyNull" };
        return err;
    }
}