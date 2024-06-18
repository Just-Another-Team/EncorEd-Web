
export const fileType = (character: string) => {
    if (character === "/") return ".jpg";
    else if (character === "i") return ".png"
    else throw Error("Invalid required profile picture format")
}