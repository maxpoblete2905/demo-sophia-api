export abstract class Mapper<I, O> {
    abstract mapFrom(param: I, uid: string): O;
    abstract mapTo(param: O): I;
}
