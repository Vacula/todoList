export interface Task {
  id: string,
  task: string,
  done: boolean,
}

export default class ListTask implements Task {

  constructor(
    private _id: string = '',
    private _task: string = '',
    private _done: boolean = false,
  ){}

  get id(): string {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }

  get task(): string {
    return this._task
  }

  set task(task: string) {
    this._task = task
  }

  get done(): boolean {
    return this._done
  }

  set done(done: boolean) {
    this._done = done
  }
}