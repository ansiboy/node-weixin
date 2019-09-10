export let errors = {
    argumentNull(argumentName: string): Error {
        let err: Error = { name: "argumentNull", message: `Argument ${argumentName} can not be null or empty.` };
        return err;
    },
    routeDataFieldNull(fieldName: string) {
        let err: Error = {
            name: errors.routeDataFieldNull.name,
            message: `Route data ${fieldName} field is null or empty.`
        }
        return err;
    }
}