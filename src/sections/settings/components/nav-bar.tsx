import { Box, Typography } from '@mui/material'
import { AccountPopover } from '../../../layouts/components/account-popover'
import { Iconify } from '../../../components/iconify'
import { Searchbar } from '../../../layouts/components/searchbar'
import { NotificationsPopover } from '../../../layouts/components/notifications-popover'
import { _notifications } from '../../../_mock'

export default function NavbarSettings() {
    return (
        <>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" padding={2}>
            <Typography variant="h4">
            
            </Typography>
            <Box gap={1} display="flex" alignItems="center">
            <Searchbar />
            <NotificationsPopover data={_notifications} />
            <AccountPopover
                data={[
                {
                    label: 'Home',
                    href: '/',
                    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                },
                {
                    label: 'Perfil',
                    href: '#',
                    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                },
                ]}
            />
            </Box>
        </Box>
        </>
    )
}
