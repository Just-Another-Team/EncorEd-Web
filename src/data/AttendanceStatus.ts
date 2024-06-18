export const AttendanceStatus = (prevStatus: string, currStatus: string) => {
    return prevStatus === "present" && currStatus === "present" ? "Present" :
    prevStatus === "present" && currStatus === "not-in-room" ? "Early Dismissal" :
    prevStatus === "not-in-room" && currStatus === "present" ? "Late" : "Absent"
}