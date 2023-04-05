import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan',
    component: EditableSpan,
    argTypes: {
        callback: {description: 'Button clicked'}
    }
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanBaseExample = Template.bind({})
EditableSpanBaseExample.args = {
    title: 'React',
    callback: action('Editable span changed')
}