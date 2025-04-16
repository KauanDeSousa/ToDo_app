export type LogDebugAndError = ({ message, type }: { message: string; type: number }) => boolean | string;
export type OpenApp = (localhost: string) => boolean;
