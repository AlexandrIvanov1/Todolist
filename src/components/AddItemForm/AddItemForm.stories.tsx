import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm Example',
    component: AddItemForm
}

const addItemCallback = action('Item added')

export const AddItemFormBaseExample = () => <AddItemForm addItem={addItemCallback}/>