import './css/style.css'
import TotalTasks from './model/TotalTasks'
import ListTask from './model/ListTask'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const totalTasks = TotalTasks.instance
  const template = ListTemplate.instance

  const taskEntryForm = document.getElementById("taskEntryForm") as HTMLFormElement
  taskEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newTask") as HTMLInputElement
    const newText: string = input.value.trim()
    if (!newText.length) return

    const taskId: number = totalTasks.list.length
      ? parseInt(totalTasks.list[totalTasks.list.length - 1].id) + 1
      : 1

    const newTask = new ListTask(taskId.toString(), newText)

    totalTasks.addTask(newTask)

    template.render(totalTasks)
  })

  const clearTasks = document.getElementById("clearTasksButton")
  clearTasks?.addEventListener('click', (): void => {
    totalTasks.clearList()
    template.clear()
  })

  totalTasks.load()
  template.render(totalTasks)
}

document.addEventListener("DOMContentLoaded", initApp)
