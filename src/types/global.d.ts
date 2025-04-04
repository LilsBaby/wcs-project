type EventLike<T extends Callback = Callback> =
		| { Connect(callback: T): ConnectionLike }
		| { connect(callback: T): ConnectionLike }
		| { subscribe(callback: T): ConnectionLike };
        type ConnectionLike = { Disconnect(): void } | { disconnect(): void } | (() => void) | undefined | void;