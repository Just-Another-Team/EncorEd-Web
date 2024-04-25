import React from 'react'
import { Box, Button, IconButton, Typography } from "@mui/material"
import IUser, { UserRole } from '../../data/IUser'
import { useParams } from 'react-router-dom'
import { KioskParams } from '../../types/Params'
import { useUsers } from '../../hooks/useUsers'
import KioskLogList from './KioskLogList'

const Kiosk = () => {
    const { getKiosks } = useUsers()

    const { kioskId } = useParams<KioskParams>();

    const kiosk = getKiosks().find(kiosk => kiosk.USER_ID === kioskId)

    return (
        <Box
        height={592}>
            <Box
            display={"flex"}
            flexDirection={"row"}
            marginBottom={2}>
                <Typography
                variant="h4"
                flex={1}
                fontWeight={700}>
                    { kiosk?.USER_USERNAME }
                </Typography>


                {/* <Button
                onClick={handleOpenModal}
                size="large"
                variant="contained">
                    Add Kiosk
                </Button> */}
            </Box>

            <Box
            width={'100%'}
            height={580}>
                {/* <KioskList /> */}
                <KioskLogList
                kioskId={kioskId}/>
            </Box>

            {/* <KioskForm
            loading={loading}
            onSubmit={handleAddKiosk}
            title="Add Kiosk"
            openModal={openModal}
            closeModal={handleCloseModal}/> */}
        </Box>
    )
}

export default Kiosk