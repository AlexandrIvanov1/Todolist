import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    title: 'Task',
    component: Task
} as ComponentMeta<typeof Task>

const changeTaskStatus = action('Status of task was change')
const changeTaskTitle = action('Title of task was change')
const deleteTask = action('Task deleted')

const baseArgs = {
    changeTaskStatus,
    changeTaskTitle,
    deleteTask
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'React', isDone: true},
    todolistId: 'todolistId1'
}
export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'React', isDone: false},
    todolistId: 'todolistId1'
}