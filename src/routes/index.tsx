import HomeIcon from '@mui/icons-material/Home';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import MapIcon from '@mui/icons-material/Map';
import BackupTableIcon from '@mui/icons-material/BackupTable';

interface Route {
	path: string;
	title: string;
	icon: () => JSX.Element;
}

const size: string = 'text-3xl';

const ROUTES: Route[] = [
	{
		path: '/',
		title: 'Dashboard',
		icon: () => <HomeIcon className={size} />,
	},
	{
		path: '/history',
		title: 'History',
		icon: () => <SettingsBackupRestoreIcon className={size} />,
	},
	{
		path: '/chartsdefinitions',
		title: 'Charts Definitions',
		icon: () => <MapIcon className={size} />,
	},
	{
		path: '/chartsdata',
		title: 'Charts Data',
		icon: () => <BackupTableIcon className={size} />,
	},
];

export default ROUTES;
