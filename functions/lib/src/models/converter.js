"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converter = void 0;
const converter = () => ({
    toFirestore: (data) => data,
    fromFirestore: (snapshot) => snapshot.data()
});
exports.converter = converter;
//# sourceMappingURL=converter.js.map