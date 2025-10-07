export function getSessCounterNumber(): number {
    const sessionNum = Number(sessionStorage.getItem("counter") ?? "0");
    if (!isNaN(sessionNum)) {
        return sessionNum;
    }
    return 0;
}
