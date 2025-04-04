export enum MonsterStates {
    IDLE = "Idle",
    CHASE = "Chase"
}

export type MonsterState = ValueOf<typeof MonsterStates>