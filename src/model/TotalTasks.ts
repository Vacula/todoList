import ListTask from './ListTask'

interface Tasks {
  list: ListTask[],
  load(): void,
  save(): void,
  clearList(): void,
  addTask(taskObj: ListTask): void,
  removeTask(id: string): void,
}

export default class TotalTasks implements Tasks {
  //only one instance
  static instance: TotalTasks = new TotalTasks()

  private constructor(private _list: ListTask[] = []){}

  get list(): ListTask[] {
    return this._list
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("totalTasks")
    if (typeof storedList !== "string") return

    const parsedList: {_id: string, _task: string, _done: boolean}[] = JSON.parse(storedList)

    parsedList.forEach(taskObj => {
      const newTask = new ListTask(taskObj._id, taskObj._task, taskObj._done)
      //static method
      TotalTasks.instance.addTask(newTask)
    })
  }

  save(): void {
    localStorage.setItem("totalTasks", JSON.stringify(this._list))
  }

  clearList(): void {
    this._list = []
    this.save()
  }

  addTask(taskObj: ListTask): void {
    this._list.push(taskObj)
    this.save()
  }

  removeTask(id: string): void {
    this._list = this._list.filter(item => item.id !== id)
    this.save()
  }
}