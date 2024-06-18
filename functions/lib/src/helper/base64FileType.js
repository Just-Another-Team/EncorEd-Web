"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileType = void 0;
const fileType = (character) => {
    if (character === "/")
        return ".jpg";
    else if (character === "i")
        return ".png";
    else
        throw Error("Invalid required profile picture format");
};
exports.fileType = fileType;
//# sourceMappingURL=base64FileType.js.map