import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
// import PasswordAuthForm from '../PasswordAuthForm';
// import { verifyPassword } from '../../../app/features/auth/authSlice';
// import { deleteUser } from '../../../app/features/users/usersSlice';

const PasswordAuthHook = ({ title = "Password Verification" }) => {
    // const passwordAuthDispatch = useDispatch();
    // const deleteUserDispatch = useDispatch();
    // const target = useSelector(state => state.targetUser.target)
    // const action = useSelector(state => state.targetUser.action)

    // const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm({
    //     defaultValues: {
    //         password: ""
    //     }
    // });

    // const inputs = [
    //     {key: 'password', label: "Confirm Password", type: "password", error: errors.password},
    // ]
    // //deleteUserDispatch(deleteUser(target))
    // const onSubmit = async (data) => {
    //     reset()
    //     let verify = false;
    //     try{
    //         await passwordAuthDispatch(verifyPassword(data))
    //         .then((res)=>{
    //             console.log(res)
    //             if(res.type ===  "user/verify/fulfilled"){
    //                 verify = true
    //             }
    //             else{
    //                 verify = false
    //             }
    //         })
    //     } catch(e) {
    //         console.log(e)
    //     }

    //     //debugging purposes
    //     console.log("Verify status: " + verify)

    //     if(verify === true && action === "Delete") {
    //         try{
    //             deleteUserDispatch(deleteUser(target))
    //             reset()
    //             window.location.reload()
                
    //         } catch(e) {
    //             console.log(e)
    //         }
    //     }
    //     else{
    //         reset()
    //         alert("Wrong password")
    //     }
    // }

    // return (
    //     <PasswordAuthForm
    //     title={title}
    //     type={"passwordconfirmation"} 
    //     inputs={inputs} 
    //     control={control} 
    //     onSubmit={onSubmit}
    //     handleSubmit={handleSubmit}
    //     />
    // )
}

export { PasswordAuthHook }