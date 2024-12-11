import EventEmitter from "node:events";

/**
 * Describes the interface that "Event" types must implement.
 *
 * Every key must resolve to a callable that describes the type of the
 * handler for the event.
 */
export type Events = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => void;
};

/**
 * An interface for classes that behave like event emitters.
 *
 * Those typically allow subscription to a very specific set of events but do not export
 * the emitting capabilities.
 */
export interface EmitterLike<E extends Events> {
  /**
   * Subscribes a handler to the specific event type.
   * @param event
   * @param handler
   */
  on<Event extends keyof E>(event: Event, handler: E[Event]): this;
}

/**
 * A generic implementation of {@link EmitterLike}.
 *
 * Classes that want to implement the {@link EmitterLike} interface using a NodeJs
 * event emitter can do so by extending this class.
 *
 * It simply delegates `on` calls to the underlying event emitter. It also provides
 * an homologous implementation for `emit` that subclasses can use to emit events.
 */
export class EmitterLikeBase<E extends Events> implements EmitterLike<E> {
  protected readonly emitter = new EventEmitter();

  on<Event extends keyof E>(event: Event, handler: E[Event]): this {
    this.emitter.on(event.toString(), handler);
    return this;
  }

  /**
   * Emits the event with the given arguments.
   *
   * @param event The event. This needs to be a key of the events type associated with this class.
   * @param args The arguments to pass to the event handler. The types are inferred from the
   * handler associated with the event in the events type associated with this class.
   *
   * @returns Whether the event is being listened to.
   */
  protected emit<Event extends keyof E>(
    event: Event,
    ...args: Parameters<E[Event]>
  ): boolean {
    return this.emitter.emit(event.toString(), ...args);
  }
}
