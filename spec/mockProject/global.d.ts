declare var global : any;
declare interface Array<T> {
    flatten(options?: { depth: number } | { deep: true }): Array<T>;
}