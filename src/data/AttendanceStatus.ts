export const AttendanceStatus = (prevStatus: string, currStatus: string) => {
    return prevStatus === "present" && currStatus === "present" ? "Present" :
    prevStatus === "present" && currStatus === "missing" ? "Early Dismissal" :
    prevStatus === "missing" && currStatus === "present" ? "Late" : "Absent"
}