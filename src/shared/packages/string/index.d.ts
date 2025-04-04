declare namespace JECSUtils {
	type CollectIterator<T extends Callback> = IterableFunction<LuaTuple<[index: number, ...args: Parameters<T>]>>;

	export function Collect<T extends Callback>(event: EventLike<T>): CollectIterator<T>;
}

export = JECSUtils;