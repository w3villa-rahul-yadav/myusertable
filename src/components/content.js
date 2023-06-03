import React, { useEffect, useState } from 'react'
import { _getUserDetails, _addUser, _updateUser } from './api/userdata';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Content = () => {

    const [userDetails, setUserDetails] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userfName, setUserfName] = useState("")
    const [userlName, setUserlName] = useState("")
    const [openEditUserModal, setOpenEditUserModal] =
    useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [editUserFirstName, setEditUserFirstName] = useState();
    const [editUserLastName, setEditUserLastName] = useState();

    const closeEditUserModal = () => {
        setOpenEditUserModal(false);
      };

    const handleEditUserModal =(e)=> {
        setOpenEditUserModal(true);
        setSelectedUser(e)
        console.log(e)
    }


    const getUserProfile = () => {
        try {
            _getUserDetails().then(async (res) => {
                if (res) {
                    setUserDetails(res.data.users)
                    console.log(res)
                } else {
                    console.log("Something went wrong");
                }
            });
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const addUserProfile = () => {
        try {
            let requestData = {
                firstName: userfName,
                lastName: userlName,

            };
            _addUser(requestData).then(async (res) => {
                if (res) {
                    console.log(res)
                } else {
                    console.log("Something went wrong");
                }
            });
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const updateUser = () => {
        try {
          let requestData = {
            firstName: editUserFirstName,
            lastName: editUserLastName,
            userId: selectedUser,
          };
          _updateUser(requestData).then(async (res) => {
            console.log(res, "user updated successfully");
          });
        } catch (error) {
          console.log("Error:", error);
        }
      };

    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <div className='main-content'>
            <div className='top-button'><Button onClick={handleOpen} variant="contained" >Add a new user</Button></div>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userDetails?.reverse().map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.firstName} &nbsp; {val.lastName}</td>
                                    <td>{val.address.address}</td>
                                    <td>{val.birthDate}</td>
                                    <td>{val.email}</td>
                                    <td>{val.gender}</td>
                                    <td> <Button onClick={()=>handleEditUserModal(val.id)}>Edit</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className='add-user-modal'>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Add a user
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <div className='common-form'>
                                    <div className='form-group'>
                                        <TextField id="standard-basic" label="First Name" variant="standard" onChange={(e) => setUserfName(e.target.value)} />
                                    </div>
                                    <div className='form-group'>
                                        <TextField id="standard-basic" label="Last Name" variant="standard" onChange={(e) => setUserlName(e.target.value)} />

                                    </div>
                                    <div className='top-button'>
                                        <Button onClick={addUserProfile} variant="contained">Add user</Button>
                                    </div>
                                </div>

                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <div className="edit-user-modal">
                <Modal
                    open={openEditUserModal}
                    onClose={closeEditUserModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="send-money-modal"
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openEditUserModal}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Edit this user
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <div className='common-form'>
                                    <div className='form-group'>
                                        <TextField id="standard-basic" label="First Name" variant="standard" onChange={(e) => setEditUserFirstName(e.target.value)} />
                                    </div>
                                    <div className='form-group'>
                                        <TextField id="standard-basic" label="Last Name" variant="standard" onChange={(e) => setEditUserLastName(e.target.value)} />

                                    </div>
                                    <div className='top-button'>
                                        <Button onClick={updateUser} variant="contained">Save</Button>
                                    </div>
                                </div>

                            </Typography>
                        </Box>
                    </Fade>

                </Modal>
            </div>

        </div>
    );
}


export default Content;