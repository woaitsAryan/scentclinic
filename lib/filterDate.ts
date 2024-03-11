export const filterDate = (filterQuery: { [key: string]: any }, startDate: string | null, endDate: string | null): { [key: string]: any } => {
    if (!startDate || !endDate) {}
    else if (!startDate && endDate) {
        filterQuery['createdAt'] = { lte: new Date(endDate) }
    }
    else if (startDate && !endDate) {
        filterQuery['createdAt'] = { gte: new Date(startDate) }
    }
    else {
        if (new Date(startDate) > new Date(endDate)) {
            return filterQuery
        }
        filterQuery['createdAt'] = { gte: new Date(startDate), lte: new Date(endDate) }
    }
    return filterQuery
}