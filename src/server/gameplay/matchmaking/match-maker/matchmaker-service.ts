import { Service, OnStart } from "@flamework/core";
import { RequestAPI } from "shared/utils/playfab-utils";
import { RequestAPIParameters } from "types/interfaces/api";
import {
	CancelAllMatchMakingTicketResult,
	CancellAllMatchMakingTicketRequest,
	CancelMatchMakingTicketRequest,
	CancelMatchMakingTicketResult,
	CreateMatchmakingTicketRequest,
	CreateMatchMakingTicketResult,
	GetMatchMakingRequest,
	GetMatchMakingTicketResult,
} from "types/interfaces/match-making";

@Service({})

/**
 *
 */
export class MatchMakerService {
	/** @ignore */
	constructor() {}

	public async CreateMatchMakingTicket({
		entityToken,
		request,
	}: RequestAPIParameters<CreateMatchmakingTicketRequest>): Promise<CreateMatchMakingTicketResult> {
		return RequestAPI<CreateMatchMakingTicketResult>(
			"/Match/CreateMatchMakingTicket",
			request,
			"X-EntityToken",
			entityToken,
		);
	}

	public async GetMatchMakingTicket({
		entityToken,
		request,
	}: RequestAPIParameters<GetMatchMakingRequest>): Promise<GetMatchMakingTicketResult> {
		return RequestAPI<GetMatchMakingTicketResult>(
			"/Match/GetMatchmakingTicket",
			request,
			"X-EntityToken",
			entityToken,
		);
	}

	public async CancellAllMatchMakingTicketForPlayer({
		entityToken,
		request,
	}: RequestAPIParameters<CancellAllMatchMakingTicketRequest>): Promise<CancelAllMatchMakingTicketResult> {
		return RequestAPI<CancelAllMatchMakingTicketResult>(
			"/Match/CancelAllMatchmakingTicketsForPlayer",
			request,
			"X-EntityToken",
			entityToken,
		);
	}

	public async CancelMatchMakingTicket({
		entityToken,
		request,
	}: RequestAPIParameters<CancelMatchMakingTicketRequest>): Promise<CancelMatchMakingTicketResult> {
		return RequestAPI<CancelMatchMakingTicketResult>(
			"/Match/CancelMatchMakingTicket",
			request,
			"X-EntityToken",
			entityToken,
		);
	}
}
