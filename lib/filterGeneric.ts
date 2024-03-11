export const filterGeneric = (filterQuery: { [key: string]: any }, type: string, value: string | null): { [key: string]: any } => {
    if (!value) {
        return filterQuery
    }
    filterQuery[type] = value
    return filterQuery
}