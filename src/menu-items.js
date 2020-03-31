export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'approval',
                    title: 'Approval',
                    type: 'item',
                    url: '/approval',
                    icon: 'feather icon-user-check',
                },
                {
                    id: 'settings',
                    title: 'Settings',
                    type: 'item',
                    url: '/settings',
                    icon: 'feather icon-settings',
                },
                {
                    id: 'log-out',
                    title: 'Log Out',
                    type: 'item',
                    url: '/logout',
                    icon: 'feather icon-power'
                },
            ]
        },
    ]
            
}