export const getFormAction = (formData: FormData) => {
    const action: FormDataEntryValue | null = formData.get("action");
    let actionString: string = "";
    if (action) {
        if (typeof action === "string") {
            actionString = action;
        } else if (action instanceof File) {
            actionString = action.name;
        }
    }
    return actionString;
};
