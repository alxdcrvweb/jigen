export enum ErrorEnum {
    ALREADY_APPEALED,
    TWITTER_ALREADY_APPEALED,
    'No authorization token was found',
    'Permission denied'
}

export type ErrorKeys = keyof typeof ErrorEnum;
