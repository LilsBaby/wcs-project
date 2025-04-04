import { Service, OnStart, OnTick, OnInit } from "@flamework/core";
import { MatchMakerService } from "./match-maker/matchmaker-service";
import { AuthService } from "./auth/auth-service";
import { MATCH_MAKING_TIMEOUT, TITLE_ID } from "shared/constants";
import { MatchMakingTicketPlayer } from "types/interfaces/api";
import { Players } from "@rbxts/services";
import { serverState } from "server/store";
import { selectQueueTicket } from "shared/store/selectors/queue-selector";
import { Message } from "shared/message";
import { selectAllPlayerData, selectPlayerSession } from "shared/store/selectors/player-data-selector";
import { GetMatchMakingTicketResult } from "types/interfaces/match-making";
import { OnMessage } from "server/decorators";
import { OnPlayerJoin } from "server/player/player-hooks";

@Service({})
export class MatchMakingService implements OnTick, OnPlayerJoin {
	/** Queue name */
	private readonly QUEUE_GLOBAL_NAME = "Match_Queue";

	// How long it takes before requeuing
	private readonly MAX_QUEUE_TIME = 10 * 60;

	/** @hidden */
	constructor(private readonly MatchMakerService: MatchMakerService, private readonly authService: AuthService) {}

	/** @ignore */
	async onPlayerJoin({ Name, UserId }: Player): Promise<void> {
		const response = await this.authService.LoginWithCustomId({
			request: { CustomId: tostring(UserId), CreateAccount: true },
		});

		if (response.EntityToken && response.EntityToken.Entity) {
			serverState.setSession(Name, response);
		}

		Promise.fromEvent(Players.PlayerRemoving, (plrLeft) => plrLeft.Name === Name)
			.then(() => serverState.getState(selectQueueTicket(Name)))
			.then(
				async (ticket) =>
					await this.MatchMakerService.CancellAllMatchMakingTicketForPlayer({
						entityToken: response.EntityToken.EntityToken,
						request: {
							QueueName: this.QUEUE_GLOBAL_NAME,
							Entity: { Id: response.EntityToken.Entity.Id, Type: response.EntityToken.Entity.Type },
						},
					}),
			);
	}

	/** @ignore */
	async onTick(dt: number): Promise<void> {
		for (const [player, data] of serverState.getState(selectAllPlayerData)) {
			const match = serverState.getState(selectQueueTicket(player));

			if (!match) continue;
			if (!match.TicketId) continue;
			if (!data.session) continue;

			const ticket = await this.MatchMakerService.GetMatchMakingTicket({
				entityToken: data.session.EntityToken.EntityToken,
				request: { TicketId: match.TicketId, QueueName: this.QUEUE_GLOBAL_NAME, EscapeObject: false },
			});

			if (ticket.Status !== "Matched") continue;
			if (!ticket.MatchId) continue;

			const queueDuration = this.GetQueueDuration(ticket);
			print(`Found Match for ${player}
				\n MatchId: ${ticket.MatchId}
				\n MatchedPlayers: ${ticket.MembersToMatchWith}
				\n Took: ${queueDuration}`);
			// teleport players to private server
		}
	}

	/** @hidden */
	@OnMessage(Message.JoinQueue)
	private async joinQueue({ Name }: Player) {
		const session = serverState.getState(selectPlayerSession(Name));
		const ticket = await this.MatchMakerService.CreateMatchMakingTicket({
			entityToken: session.EntityToken.EntityToken,
			request: {
				Creator: {
					Entity: {
						Id: session.EntityToken.Entity.Id,
						Type: session.EntityToken.Entity.Type,
					},
				},
				GiveUpAfterSeconds: MATCH_MAKING_TIMEOUT,
				QueueName: this.QUEUE_GLOBAL_NAME,
			},
		});

		serverState.loadQueueTicket(Name, ticket);
	}

	/**
	 * `GetQueueDuration`
	 * Getting the time difference between when it started and the time currently.
	 *
	 * @param ticket - The ticket returned from MatchMakingTicket
	 * @returns
	 */
	private GetQueueDuration(ticket: GetMatchMakingTicketResult): number {
		return DateTime.now().UnixTimestamp - DateTime.fromIsoDate(ticket.Created)!.UnixTimestamp;
	}
}
