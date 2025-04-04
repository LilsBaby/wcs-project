import { Service, OnStart } from "@flamework/core";
import { RequestAPI } from "shared/utils/playfab-utils";
import { RequestAPIParameters } from "types/interfaces/api";
import { LoginResult, LoginWithCustomIdRequest } from "types/interfaces/match-making/client";

@Service({})
export class AuthService {
	/** @ignore */
	constructor() {}

	/**
	 * `LoginWithCustomId`
	 * Generates a new token for logged in players to the API.
	 * 
	 * @param rquest - Request Body to be sent to the API
	 * @returns 
	 */
	public async LoginWithCustomId({ request }: RequestAPIParameters<LoginWithCustomIdRequest>): Promise<LoginResult> {
		return RequestAPI<LoginResult>("/Match/CreateMatchMakingTicket", request);
	}
}
