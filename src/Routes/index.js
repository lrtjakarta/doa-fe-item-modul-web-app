import { useRoutes } from 'react-router-dom';
import mainRoutes from './routes';

export default function Routes() {
	const routing = useRoutes(mainRoutes);
	return <>{routing}</>;
}
