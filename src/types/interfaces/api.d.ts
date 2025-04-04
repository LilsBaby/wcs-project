import { ErrorResponse } from "types/enum/error-response"

export interface APIErrorWrapper {
    code: number,
    error: string,
    errorCode: number,
    errorDetails: Record<string, unknown>
    errorMessage: string,
    status: string
}

export interface RequestAPIParameters<T extends object = {}> {
    entityToken?: string // tostring(user.ID)
    request: T
}

export interface APIResponseBody<T = {}> {
    code: ValueOf<typeof ErrorResponse>,
    status: string
    data: T,
    error: APIErrorWrapper
}

export interface MatchMakingTicketPlayer {
	Attributes?: MatchmakingPlayerAttributes;
	Entity: EntityKey;
}

export interface MatchmakingPlayerAttributes {
	DataObject: Record<string, unknown>;
	EscapedDataObject: string;
}

export interface EntityKey {
	Id: string;
	Type: string;
}