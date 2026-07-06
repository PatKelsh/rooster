export const dateFormat = (dateString: string) => {
    const date = new Date(dateString);
    const dateOneDayAhead = new Date(date.getTime() + 24 * 60 * 60 * 1000); // Add one day in milliseconds
    return dateOneDayAhead.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}