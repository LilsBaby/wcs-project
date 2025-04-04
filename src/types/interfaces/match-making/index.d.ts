import { MatchMakingStatus } from "types/enum/error-response";
import { EntityKey, MatchMakingTicketPlayer } from "../api";

export interface CreateMatchmakingTicketRequest {
	Creator: MatchMakingTicketPlayer;
	CustomTags?: Record<string, unknown>;
	GiveUpAfterSeconds: number;
	MembersToMatchWith?: Array<EntityKey>;
	QueueName: string;
}

export interface CreateMatchMakingTicketResult {
	TicketId: string;
}

export interface GetMatchMakingRequest {
	EscapeObject?: boolean,
	QueueName: string,
	TicketId: string,
	CustomTags?: Record<string, unknown>
}

export interface GetMatchMakingTicketResult {
    CancellationReasonString: string,
    ChangeNumber: number,
    Created: string,
    Creator: string,
    GiveUpAfterSeconds: number,
    MatchId: string | undefined, // if match id exists, then the match is found,
    Members: Array<MatchMakingTicketPlayer>,
    MembersToMatchWith: Array<EntityKey>,
    QueueName: string,
    Status: MatchMakingStatus,
    TicketId: string
}

export interface CancellAllMatchMakingTicketRequest {
    QueueName: string,
    Entity: EntityKey
    CustomTags?: Record<string, unknown>
}

export interface CancelAllMatchMakingTicketResult {
    
}


export interface CancelMatchMakingTicketRequest {
    QueueName: string,
    TicketId: string,
    CustomTags?: Record<string, unknown>
}

export interface CancelMatchMakingTicketResult {
    
}
