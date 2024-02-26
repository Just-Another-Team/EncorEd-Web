import { ListItemButton, ListItemButtonProps } from "@mui/material"


// NOTE: This is not an Item of a Linked List
// This is an item that appends in a sidebar and 
// provides links to different pages of the app.


const LinkListItem = <C extends React.ElementType>(props: ListItemButtonProps<C, { component?: C }>) => {
    return <ListItemButton {...props}>{props.children}</ListItemButton>
}

export default LinkListItem