import { Config } from "./common";

export let errors = {
    unknownError(): Error {
        return { name: "unknown", message: "unknown" }
    },
    responseFormatError(message: string): Error {
        return { name: "responseFormatError", message: `Response message is:\r\n${message}` };
    },
    configFieldNull(field: keyof Config): Error {
        let err: Error = { name: errors.configFieldNull.name, message: `Config ${field} field is null or empty` };
        return err;
    },
    argumentNull(argumentName: string): Error {
        let err: Error = { name: "argumentNull", message: `Argument ${argumentName} can not be null or empty.` };
        return err;
    }
}