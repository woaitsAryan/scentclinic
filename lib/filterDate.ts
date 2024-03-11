// 
export const filterDate = (filterQuery: { [key: string]: any }, date: Date | null): { [key: string]: any } => {
    if (!date) {}
    else {
        filterQuery['createdAt'] = {
            gte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0), // Start of the day
            lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0), // Start of the next day
          }
    }
    // else if (!startDate && endDate) {
    //     filterQuery['createdAt'] = { lte: new Date(endDate) }
    // }
    // else if (startDate && !endDate) {
    //     filterQuery['createdAt'] = { gte: new Date(startDate) }
    // }
    // else {
    //     if (new Date(startDate) > new Date(endDate)) {
    //         return filterQuery
    //     }
    //     filterQuery['createdAt'] = { gte: new Date(startDate), lte: new Date(endDate) }
    // }
    return filterQuery
}