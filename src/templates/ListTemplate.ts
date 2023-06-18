import TotalTasks from "../model/TotalTasks"

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(totalTasks: TotalTasks): void,
}

export default class ListTemplate implements DOMList {

  ul: HTMLUListElement

  static instance: ListTemplate = new ListTemplate()

  private constructor() {
    this.ul = document.getElementById("totalTasks") as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(totalTasks: TotalTasks): void {
    this.clear()

    totalTasks.list.forEach(task => {
      const li = document.createElement("li") as HTMLLIElement
      li.className = "task"

      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"
      check.id = task.id
      check.tabIndex = 0
      check.checked = task.done
      li.append(check)

      check.addEventListener('change', () => {
        task.done = !task.done
        totalTasks.save()
      })

      const label = document.createElement("label") as HTMLLabelElement
      label.htmlFor = task.id;
      label.textContent = task.task
      li.append(label)

      const button = document.createElement("button") as HTMLButtonElement
      button.className = 'button'
      button.textContent = 'X'
      li.append(button)

      button.addEventListener('click', () => {
        totalTasks.removeTask(task.id)
        this.render(totalTasks)
      })

      this.ul.append(li)
    })
  }
}