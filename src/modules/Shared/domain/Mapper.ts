export abstract class Mapper<T, C> {
  from(t: T): C {
    return this.map(t);
  }

  fromArray(tArray: T[]): C[] {
    return tArray.map((t: T) => this.from(t));
  }

  abstract map: (t: T) => C;
}
