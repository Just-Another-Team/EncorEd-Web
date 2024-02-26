export enum NotificationStatusEnum {
    Unread,
    Read,
    Delete
}

export type NotificationType = {
    notfId: string;
    notfDescription: string;
    notfDate: Date | string;
    userId: string;
    notfStatus: NotificationStatusEnum; //Unread, Read, Delete
}

export const Notifications: Array<NotificationType> = [
    {
        notfId: "123",
        notfDescription: "Submitted attendance at Room 101",
        notfDate: "February 25, 2024",
        userId: "user101",
        notfStatus: NotificationStatusEnum.Read,
    },
    {
        notfId: "124",
        notfDescription: "Submitted attendance at Room 201",
        notfDate: "February 25, 2024",
        userId: "user101",
        notfStatus: NotificationStatusEnum.Unread,
    },
    {
        notfId: "125",
        notfDescription: "Submitted attendance at Room 203",
        notfDate: "February 25, 2024",
        userId: "user101",
        notfStatus: NotificationStatusEnum.Unread,
    },
]