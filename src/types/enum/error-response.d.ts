export  const enum ErrorResponse {
    Bad = 400,
    Ok = 200
}

export  const enum MatchMakingTicketStatus {
    WaitingForPlayers = "WaitingForPlayers",
    WaitingForMatch = "WaitingForMatch",
    WaitingForServer = "WaitingForServer",
    Canceled = "Canceled",
    Matched = "Matched"
}

export type MatchMakingStatus = ValueOf<typeof MatchMakingTicketStatus>